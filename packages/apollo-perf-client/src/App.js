import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import { ApolloProvider } from "react-apollo";
import { Books } from "./Books";

import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  // uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h2>My first Apollo app</h2>
          <Books />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
