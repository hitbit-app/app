import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { removeToken } from '../../AuthManager';
import AudioPlayer from '../../elements/AudioPlayer/AudioPlayer.js';

import Logo from '../../assets/Logo.svg';
import styles from '../../styles/homeStyle';
import universalStyle from '../../styles/styles';

const GET_HOME_DATA = gql`
  query HomeData {
    userInfo {
      id
      username
    }
    latestPosts {
      id
      audioUrl
      author {
        id
        username
      }
    }
  }
`;

export function Home() {
  const { loading, error, data, refetch } = useQuery(GET_HOME_DATA);

  const currentUser = loading ? 'Who are you?' : data.userInfo.id;

  const [refreshing, setRefreshing] = useState(false);

  const _onRefresh = () => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false)).catch();
  };

  return (
    <View style={universalStyle.container}>
      <View style={universalStyle.header}>
        <Logo style={universalStyle.login} height={50} width={50} fill="#002F49" />
        <TouchableOpacity
          style={universalStyle.logOutButton}
          onPress={removeToken}
        >
          <Text style={universalStyle.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      {!!error && <Text>{error.message}</Text>}
      {loading && <Text>Loading...</Text>}
      {!loading && (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollViewStyle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
        >

          {data.latestPosts.map((post) => {

            return (
              <View key={post.id} style={styles.post}>
                <AudioPlayer
                  source={post.audioUrl}
                  author={post.author.username}
                  isMine= {currentUser === post.author.id ? 'true' : 'false'}
                />
              </View>
            );


          })}
        </ScrollView>
      )}
    </View>
  );
}
