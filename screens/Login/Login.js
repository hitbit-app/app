import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { error, loading }] = useMutation(LOGIN, {
    variables: {
      email,
      password
    },
    onError: () => {},
    onCompleted: () => console.log('success')
  })

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <Button
        onPress={login}
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
    marginBottom: 20
  }
});
