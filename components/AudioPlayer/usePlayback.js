import { useState, useRef } from 'react';
import { Audio } from 'expo-av';

/* global Promise */

export default function usePlayback(source) {
  const componentId = useRef();
  const [status, setStatus] = useState({});
  const [sound] = useState({
    playAsync: () => claimSoundAndSetAction({
      componentId,
      source,
      setStatus,
      action: sound => sound.playAsync(),
    }),
    pauseAsync: () => setSoundAction({
      componentId,
      action: sound => sound.pauseAsync(),
    }),
    stopAsync: () => setSoundAction({
      componentId,
      action: sound => sound.stopAsync(),
    }),
  });

  return { sound, status };
}

/*
 * TODO: set audio mode on play or within a react context
 */
Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  allowsRecordingIOS: false,
  staysActiveInBackground: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  shouldDuckAndroid: false,
  playThroughEarpieceAndroid: false,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
});

let soundOwnerId = {};
let pending = Promise.resolve(null);
let sound = new Audio.Sound();

function setSoundAction({ componentId, action }) {
  if (componentId === soundOwnerId) {
    pending = pending.then(() => action(sound));
  }

  /*
   * Some actions like pause or stop on an
   * unloaded sound is a noop
   */
  return pending;
}

async function claimSound() {
  await pending;
  await sound.unloadAsync();
  sound.setOnPlaybackStatusUpdate(null);
  sound = new Audio.Sound();
}

async function loadSource({ source, setStatus }) {
  await claimSound();
  sound.setOnPlaybackStatusUpdate(setStatus);
  await sound.loadAsync(source);
}

function claimSoundAndSetAction({ componentId, source, setStatus, action }) {
  if (componentId !== soundOwnerId) {
    soundOwnerId = componentId;
    pending = loadSource({ source, setStatus });
  }

  return setSoundAction({ componentId, action });
}
