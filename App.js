import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import { Login } from './screens/Login';
import { SignUp } from './screens/SignUp';
import { Home } from './screens/Home';
import { AuthLoading } from './screens/AuthLoading';
import { getAccessToken, removeAccessToken } from './AuthManager';
import './Reactotron';

const client = new ApolloClient({
  uri: 'https://hitbit-app.herokuapp.com',
  credentials: 'include',
  request: async operation => {
    const accessToken = await getAccessToken();
    operation.setContext({
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    });
  },
  onError: ({ graphQLErrors }) => {
    /*
     * When accessToken is expired or not longer valid for some reason
     * the BE gives the 'unauthorized' message
     */
    if (graphQLErrors.some(e => e.message === 'unauthorized')) {
      removeAccessToken();
    }
  },
});

const AppStack = createStackNavigator(
  { Home: Home },
  {
    headerMode: 'none',
  }
);

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
}
);

const SignUpStack = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
    },
  },
}
);

const AppWrapper = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack,
    SignUp: SignUpStack,
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
