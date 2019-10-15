import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Slider } from 'react-native';
import { Audio } from 'expo-av';
import PropTypes from 'prop-types';
import Reactotron from 'reactotron-react-native';

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
  const [sliding, setSliding] = useState(null);

  // const duration = Audio.Sound.playbackStatus.durationMillis;
  //
  // _onPlaybackStatusUpdate = (playbackStatus) => {
  //
  // };

  useEffect(() => {
    Audio.Sound.createAsync({ uri: props.source }).then(({ sound, status }) => {
      setSound(sound);
      setStatus(status);
    });
    // Audio.Sound.setStatusAsync(status);
  }, [props.source]);

  if (sound) {
    sound.setOnPlaybackStatusUpdate(setStatus);
    sound.setOnPlaybackStatusUpdate(status => {
      setStatus(status);
    });
  }
  // if (sound) {
  //   sound.setOnPlaybackStatusUpdate(status => {
  //     Reactotron.log('new status:', status);
  //     setStatus(status);
  //   });
  // }

  const playAudio = () => sound && sound.playAsync();
  const pauseAudio = () => sound && sound.pauseAsync();
  const isPlaying = () => status && status.isPlaying;
  const isBuffering = () => status && status.isBuffering;

  return (
    <View style={[styles.post, props.myPost ? styles.myPost : '']}>

      <View style={[styles.track, props.myPost ? styles.myTrack : '']}>

        <Image source={{uri: `${ props.avatar }`}} style={styles.avatar}/>

        <TouchableOpacity
          style={styles.iconWrap}
          onPress={() => (isPlaying() ? pauseAudio() : playAudio())}
        >
          {isBuffering() && !isPlaying() && <BufferingIcon height={20} width={20} />}
          {isPlaying()
            ? <PauseIcon height={20} width={20} />
            : <PlayIcon height={20} width={20} />
          }
        </TouchableOpacity>

        <Slider
          style={styles.slider}
          minimumValue= "0"
          maximumValue= {status && status.durationMillis !== 0 ? status.durationMillis : '0'}
          onValueChange=""
          value={status && status.positionMillis !== 0 ? status.positionMillis : '0'}

        />
      </View>

      <Text style={styles.authorName}>{props.author}</Text>

    </View>
  );
}


AudioPlayer.propTypes = {
  author: PropTypes.string,
  myPost: PropTypes.bool,
  source: PropTypes.string,
  avatar: PropTypes.string,
};
