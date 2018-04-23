import React, { Component } from "react";
import { Books } from "./Books";
import { Provider } from "react-redux";
import { store } from "./Store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <h2>My first Apollo app</h2>
          <Books />
        </div>
      </Provider>
    );
  }
}

export default App;
