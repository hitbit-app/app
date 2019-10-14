import React, { useState, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { useLoginMutation } from '../../AuthManager';
import styles from '../../styles/styles';

import Logo from '../../assets/Logo.svg';

export function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { error, loading }] = useLoginMutation({
    variables: {
      email,
      password,
    },
    onCompleted: () => navigation.navigate('Home'),
  });

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
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <StatusBar backgroundColor="transparent" barStyle="light-content" />

          <Logo width={100} height={100} style={styles.logo} fill="#ffffff"/>

          <View style={styles.form}>
            <TextInput
              placeholder="Email or Username"
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
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={true}
              returnKeyType="go"
              onSubmitEditing={login}
            />

            <View style={styles.buttons}>

              <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>

              <View style={styles.alternative}>

                <Text style={styles.text}>Don&apos;t have an account yet?</Text>

                <TouchableOpacity
                  styles={styles.secondaryButton}
                  onPress={() => navigation.navigate('SignUp')}
                >

                  <Text style={styles.buttonTextLight}>Sign Up</Text>

                </TouchableOpacity>
                <Text style={styles.text}>now!</Text>

              </View>

            </View>

            {error && <Text>{error.message}</Text>}
            {loading && <Text>Loading...</Text>}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
