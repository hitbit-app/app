import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { Home } from './screens/Home'

const client = new ApolloClient({
  uri: "https://yarc-app.herokuapp.com"
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}
