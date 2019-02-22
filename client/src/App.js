import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo"
import client from "./apolloClient";
import SnackList from "./SnackList";

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <SnackList />
        </ApolloProvider>
    );
  }
}

export default App;
