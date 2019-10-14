import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

import PauseIcon from '../../assets/icons/pauseIcon.svg';
import PlayIcon from '../../assets/icons/playIcon.svg';
import BufferingIcon from '../../assets/icons/bufferingIcon.svg';

import styles from '../../styles/audioPlayerStyle';

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  allowsRecordingIOS: false,
  staysActiveInBackground: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  shouldDuckAndroid: false,
  playThroughEarpieceAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
});

export default function AudioPlayer(props) {
  const [sound, setSound] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    Audio.Sound.createAsync({ uri: props.source }).then(({ sound, status }) => {
      setSound(sound);
      setStatus(status);
    });
  }, [props.source]);

  if (sound) {
    sound.setOnPlaybackStatusUpdate(setStatus);
  }

  const playAudio = () => sound && sound.playAsync();
  const pauseAudio = () => sound && sound.pauseAsync();
  const isPlaying = () => status && status.isPlaying;
  const isBuffering = () => status && status.isBuffering;

  return (
    <View style={styles.container}>
      <Text>{props.author}</Text>
      <TouchableOpacity
        onPress={() => (isPlaying() ? pauseAudio() : playAudio())}
      >
        {isBuffering() && !isPlaying() && <BufferingIcon height={20} width={20} />}
        {isPlaying()
          ? <PauseIcon height={20} width={20} />
          : <PlayIcon height={20} width={20} />
        }

      </TouchableOpacity>
    </View>
  );
}
