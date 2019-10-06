import React from 'react';
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

import Logo from '../../assets/Logo.svg';
import styles from '../../styles/homeStyle';
import universalStyle from '../../styles/styles';


const GET_HOME_DATA = gql`
  query LatestPosts {
    latestPosts {
      id
      audioUrl
      author {
        username
      }
    }
}
`;

export function Home() {
  const { loading, error, data, refetch } = useQuery(GET_HOME_DATA);

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
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.scrollViewStyle}>

          {data.latestPosts.map((post, index) => {
            return (
              <View>
                <Text>{post.author.username}</Text>
                <Text>{post.audioUrl}</Text>
              </View>
            );
          })}

          <TouchableOpacity style={universalStyle.button} onPress={removeToken}>
            <Text style={universalStyle.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}
