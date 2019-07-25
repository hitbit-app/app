import React, { useEffect } from 'react';
import { AsyncStorage, StyleSheet, View, Text } from 'react-native';

export function AuthLoading({ navigation }) {
  useEffect(() => {
    const authenticate = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken')
        navigation.navigate(userToken ? 'App' : 'Auth');
      } catch(e) {
        navigation.navigate('Auth');
      }
    }

    authenticate()
  }, [])

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
  }
});
