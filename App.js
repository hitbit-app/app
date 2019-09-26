import React from 'react';
import ApolloClient from 'apollo-boost';
import { AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import { Login } from './screens/Login';
import { Home } from './screens/Home';
import { AuthLoading } from './screens/AuthLoading';
import './Reactotron';

const client = new ApolloClient({
  uri: 'https://yarc-app.herokuapp.com',
  credentials: 'include',
  request: async operation => {
    const userToken = await AsyncStorage.getItem('userToken');
    operation.setContext({
      headers: {
        authorization: userToken ? `Bearer ${userToken}` : '',
      },
    });
  },
  onError: ({ graphQLErrors }) => {
    /*
     * When userToken is expired or not longer valid for some reason
     * the BE gives the 'unauthorized' message.
     * We may want to show an error or redirect to the login screen,
     * but for now we'll just remove stale token.
     */
    const unauthorized = graphQLErrors
      .some(error => error.message === 'unauthorized');

    if (unauthorized) {
      AsyncStorage.removeItem('userToken');
    }
  },
});

const AppStack = createStackNavigator(
  { Home: Home }
);

const AuthStack = createStackNavigator(
  { Login: Login }
);

const AppWrapper = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppWrapper />
    </ApolloProvider>
  );
}
