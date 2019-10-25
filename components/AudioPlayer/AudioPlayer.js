import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import usePlayback from './usePlayback';

import PauseIcon from '../../assets/icons/pauseIcon.svg';
import PlayIcon from '../../assets/icons/playIcon.svg';
import BufferingIcon from '../../assets/icons/bufferingIcon.svg';

import styles from '../../styles/audioPlayerStyle';

export default function AudioPlayer(props) {
  const { sound, status } = usePlayback({ uri: props.source });
  const { isPlaying, shouldPlay } = status;

  let stateIcon;

  if (isPlaying) {
    stateIcon = <PauseIcon height={20} width={20} />;
  } else if (shouldPlay) {
    stateIcon = <BufferingIcon height={20} width={20} />;
  } else {
    stateIcon = <PlayIcon height={20} width={20} />;
  }

  return (
    <View style={styles.container}>
      <Text>{props.author}</Text>
      <TouchableOpacity
        onPress={() => isPlaying ? sound.pauseAsync() : sound.playAsync()}
      >
        {stateIcon}
      </TouchableOpacity>
    </View>
  );
}

AudioPlayer.propTypes = {
  source: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
