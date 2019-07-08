import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { StyleSheet, View, Text, Image } from 'react-native';

const GET_LATEST_POSTS = gql`
  query LatestPosts {
    latestPosts {
      id
    }
  }
`;

export function Home() {
  const { loading, error, data } = useQuery(GET_LATEST_POSTS)
  return (
    <View style={styles.container}>
      {error}
      {loading && <Text>Loading...</Text>}
      {!loading && (
        <>
          <Image
            style={styles.image}
            source={{uri: 'https://images-na.ssl-images-amazon.com/images/I/61hhqctNtJL._SY450_.jpg'}}
          />
          <Text>{JSON.stringify(data)}</Text>
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
