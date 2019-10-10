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
import { getToken, removeToken } from './AuthManager';
import './Reactotron';

const client = new ApolloClient({
  uri: 'https://hitbit-app.herokuapp.com',
  credentials: 'include',
  request: async operation => {
    const userToken = await getToken();
    operation.setContext({
      headers: {
        authorization: userToken ? `Bearer ${userToken}` : '',
      },
    });
  },
  onError: ({ graphQLErrors }) => {
    /*
     * When userToken is expired or not longer valid for some reason
     * the BE gives the 'unauthorized' message
     */
    if (graphQLErrors.some(e => e.message === 'unauthorized')) {
      removeToken();
    }
  },
});

const AppStack = createStackNavigator(
  { Home: Home }
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
