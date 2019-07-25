import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { Login } from './screens/Login'

const client = new ApolloClient({
  uri: "https://yarc-app.herokuapp.com"
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Login />
    </ApolloProvider>
  );
}
