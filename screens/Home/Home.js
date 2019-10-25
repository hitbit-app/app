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
import { PropTypes } from 'prop-types';
import { removeAccessToken } from '../../auth';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';

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

export function Home({ navigation }) {
  const { loading, error, data, refetch } = useQuery(GET_HOME_DATA);

  const [refreshing, setRefreshing] = useState(false);

  const _onRefresh = () => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  };

  return (
    <View style={universalStyle.container}>
      <View style={universalStyle.header}>
        <Logo style={universalStyle.login} height={50} width={50} />
        <TouchableOpacity
          style={universalStyle.logOutButton}
          onPress={() => {
            removeAccessToken();
            navigation.navigate('Login');
          }}
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
          {data.latestPosts.map((post, index) => {
            return (
              <View key={post.id} style={styles.post}>
                <AudioPlayer
                  source={post.audioUrl}
                  author={post.author.username}
                />
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
