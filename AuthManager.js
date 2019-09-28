import { AsyncStorage } from 'react-native';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

/* global Promise */

const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;

export function useLoginMutation({ variables, onError, onCompleted }) {
  return useMutation(LOGIN, {
    variables,
    onError,
    onCompleted: data => {
      const { login: token } = data;
      setToken(token);

      if (typeof onCompleted === 'function') {
        onCompleted(data);
      }
    },
  });
}

const tokenObservers = [];

function notifyObservers(token) {
  tokenObservers.forEach(obs => obs(token));
}

export function onTokenChange(obs) {
  tokenObservers.push(obs);
}

let tokenPromise = AsyncStorage.getItem('userToken');

export function getToken() {
  return tokenPromise;
}

export function setToken(token) {
  tokenPromise = Promise.resolve(token);
  AsyncStorage.setItem('userToken', token);
  notifyObservers(token);
}

export function removeToken() {
  tokenPromise = Promise.resolve();
  AsyncStorage.removeItem('userToken');
  notifyObservers();
}
