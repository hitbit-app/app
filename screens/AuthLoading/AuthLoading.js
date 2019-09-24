import React, { useEffect } from 'react';
import { AsyncStorage, StyleSheet, View, Text } from 'react-native';
import { PropTypes } from 'prop-types';

export function AuthLoading({ navigation }) {
  useEffect(() => {
    const authenticate = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        navigation.navigate(userToken ? 'App' : 'Auth');
      } catch(e) {
        navigation.navigate('Auth');
      }
    };

    authenticate();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
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
});

AuthLoading.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
