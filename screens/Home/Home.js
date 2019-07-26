import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { StyleSheet, View, Text, Image } from 'react-native';

const GET_HOME_DATA = gql`
  query LatestPosts {
    latestPosts {
      id
    }
    userInfo {
      email
      username
    }
  }
`;

export function Home() {
  const { loading, error, data } = useQuery(GET_HOME_DATA)
  return (
    <View style={styles.container}>
      {!!error && error.message}
      {loading && <Text>Loading...</Text>}
      {!loading && (
        <>
          <Image
            style={styles.image}
            source={{uri: 'https://images-na.ssl-images-amazon.com/images/I/61hhqctNtJL._SY450_.jpg'}}
          />
          <Text style={{ width: '60%' }}>
            {JSON.stringify(data)}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 220
  }
});
