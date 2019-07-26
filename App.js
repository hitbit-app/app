import React from 'react';
import ApolloClient from 'apollo-boost';
import { AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import { Login } from './screens/Login'
import { Home } from './screens/Home'
import { AuthLoading } from './screens/AuthLoading'
import Reactotron from 'reactotron-react-native'

const client = new ApolloClient({
  uri: 'https://yarc-app.herokuapp.com',
  credentials: 'include',
  request: async operation => {
    const userToken = await AsyncStorage.getItem('userToken');
    operation.setContext({
      headers: {
        authorization: userToken ? `Bearer ${userToken}` : ''
      }
    });
  }
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
  if (__DEV__) {
    // Reactotron is a RN inspector for
    // easier debugging. Change the `host` key
    // with your Expo IP.
    // https://github.com/infinitered/reactotron/
    Reactotron
      .configure({ host: '192.168.1.4' })
      .useReactNative()
      .connect()
  }

  return (
    <ApolloProvider client={client}>
      <AppWrapper />
    </ApolloProvider>
  );
}
