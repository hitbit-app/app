import React, { useState } from 'react';
import gql from 'graphql-tag';
import { AsyncStorage, StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { useLoginMutation } from '../Login';
import { PropTypes } from 'prop-types';

const SIGNUP = gql`
  mutation SignUp ($username: String!, $email: String!, $password: String!) {
    signUp(
      username: $username,
      email: $email,
      password: $password
    )
    login(
      email: $email,
      password: $password
    )
  }
`;

export function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, { error, loading }] = useMutation(SIGNUP, {
    variables: {
      username,
      email,
      password,
    },
    onCompleted: async ({ login: token }) => {
      await AsyncStorage.setItem('userToken', token);
      navigation.navigate('Home');
    },
  });

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={email}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />

      <Button
        onPress={signUp}
        title="Log in"
        color="#002ade"
        disabled={loading}
      />
      {error && <Text>{error.message}</Text>}
      {loading && <Text>Loading...</Text>}
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
  input: {
    width: '70%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
