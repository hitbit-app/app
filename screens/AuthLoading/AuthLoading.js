import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { getAccessToken, onTokenChange } from '../../AuthManager';

export function AuthLoading({ navigation }) {
  useEffect(() => {
    const authenticate = async () => {
      try {
        const accessToken = await getAccessToken();
        navigation.navigate(accessToken ? 'App' : 'Auth');
      } catch(e) {
        navigation.navigate('Auth');
      }
    };

    authenticate();

    /*
     * TODO
     * Well, it seems to work, but I bet we can find
     * a better place for this!
     */
    onTokenChange(newToken => {
      if (!newToken) {
        navigation.navigate('Auth');
      }
    });
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
