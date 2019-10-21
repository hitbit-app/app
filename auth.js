import { AsyncStorage } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password)
  }
`;

const noop = () => undefined;

export function useLoginMutation({ variables, onError, onCompleted }) {
  return useMutation(LOGIN, {
    variables,
    onError,
    onCompleted: ({ login: token }) =>
      setAccessToken(token).then(onCompleted || noop),
  });
}

export function getAccessToken() {
  return AsyncStorage.getItem('accessToken');
}

export function setAccessToken(token) {
  return AsyncStorage.setItem('accessToken', token);
}

export function removeAccessToken() {
  return AsyncStorage.removeItem('accessToken');
}
