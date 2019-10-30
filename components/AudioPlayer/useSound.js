import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

/* global Promise */

/*
 * TODO: set audio mode on play or within a react context
 */
Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  allowsRecordingIOS: false,
  staysActiveInBackground: false,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  shouldDuckAndroid: false,
  playThroughEarpieceAndroid: false,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
});

const uniqid = (() => {
  let id = 0;

  return () => id++;
})();

const soundUsers = {};

function registerSoundUser(source, status, setStatus) {
  const id = uniqid();

  soundUsers[id] = { source, status, setStatus };
  return id;
}

async function removeSoundUser(id) {
  await unloadAsync(id);
  delete soundUsers[id];
}

export default function useSound(source) {
  const [status, setStatus] = useState({ isLoaded: false });
  const [id] = useState(() => registerSoundUser(source, status, setStatus));
  const loadStatusAsync = status => loadStatusForUser(id, status);

  useEffect(() => {
    // cleanup
    return () => removeSoundUser(id);
  }, [id]);

  return [status, loadStatusAsync];
}

function getSoundUserData(id) {
  const soundUserData = soundUsers[id];

  if (soundUserData == null) {
    throw new Error(`Unknown sound user ${id}`);
  }

  return soundUserData;
}

let sound;
let soundOwnerId;
let pending = Promise.resolve(undefined);

function setStatusForUser(id, status) {
  soundUsers[id].status = status;
  soundUsers[id].setStatus(status);

  return status;
}

function updateStatusForUser(id, update) {
  const { status } = getSoundUserData(id);
  const updatedStatus = { ...status, ...update };

  return setStatusForUser(id, updatedStatus);
}

async function unloadSoundForUser(id) {
  if (soundOwnerId == null || id !== soundOwnerId) {
    return Promise.resolve(undefined);
  }

  await pending;
  sound.setOnPlaybackStatusUpdate(null);
  await sound.unloadAsync();

  updateStatusForUser(id, {
    isLoaded: false,
    shouldPlay: false,
    isPlaying: false,
    isBuffering: false,
  });
}

async function loadSoundForUser(id) {
  await unloadSoundForUser(soundOwnerId);

  const { source } = getSoundUserData(id);
  soundOwnerId = id;
  sound = new Audio.Sound();
  await sound.loadAsync(source);
  sound.setOnPlaybackStatusUpdate(status =>
    setStatusForUser(id, status)
  );
}

function loadStatusForUser(id, update) {
  if (id !== soundOwnerId) {
    pending = loadSoundForUser(id);
  }

  update.isLoaded = true;
  pending = pending.then(() => {
    const updatedStatus = updateStatusForUser(id, update);
    return sound.setStatusAsync(updatedStatus);
  });

  return pending;
}
