import React, { useState, useRef } from 'react';
import gql from 'graphql-tag';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { PropTypes } from 'prop-types';
import { useLoginMutation } from 'auth';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from 'assets/Logo.svg';
import styles from 'styles/styles.js';

const SIGNUP = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password)
  }
`;

export function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, loginState] = useLoginMutation({
    variables: {
      email,
      password,
    },
    onCompleted: () => navigation.navigate('Home'),
  });
  const [signUp, signUpState] = useMutation(SIGNUP, {
    variables: {
      username,
      email,
      password,
    },
    onCompleted: login,
  });
  const loading = signUpState.loading || loginState.loading;

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  return (
    <LinearGradient
      colors={['#002F49', '#0054D8', '#0076F1', '#00ECF6']}
      start={[1, 0]}
      end={[0, 1]}
      locations={[0, 0.44, 0.73, 1]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer} style={styles.scrollViewStyle}>
        <KeyboardAvoidingView
          behavior="padding" style={styles.container}>
          <StatusBar backgroundColor="transparent" barStyle="light-content" />

          <View style={styles.form}>

            <Logo width={100} height={100} style={styles.logo} fill="#ffffff"/>

            <TextInput
              placeholder="Username"
              placeholderTextColor="#848484"
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current.focus();
              }}
            />

            <TextInput
              ref={emailInputRef}
              placeholder="Email"
              placeholderTextColor="#848484"
              style={styles.input}
              onChangeText={text => setEmail(text)}
              value={email}
              autoCompleteType="email"
              textContentType="emailAddress"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current.focus();
              }}
            />

            <TextInput
              ref={passwordInputRef}
              placeholder="Password"
              placeholderTextColor="#848484"
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
              returnKeyType="go"
              onSubmitEditing={signUp}
            />

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={signUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>

              <View style={styles.alternative}>
                <Text style={styles.text}>Already have an account?</Text>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.buttonTextLight}>Log In</Text>
                </TouchableOpacity>
                <Text style={styles.text}>here!</Text>
              </View>
            </View>

          </View>
          {signUpState.error && <Text>{signUpState.error.message}</Text>}
          {loginState.error && <Text>{loginState.error.message}</Text>}
          {loading && <Text>Loading...</Text>}
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
