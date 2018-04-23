import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import { Books } from "./Books";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      olle: 0
    };
  }
  render() {
    return (
      <div>
        <h2>My first Apollo app</h2>
        <Books
          olle={this.state.olle}
          updateOlle={() => {
            this.setState(prevState => ({
              olle: prevState.olle + 1
            }));
          }}
        />
      </div>
    );
  }
}

export default App;
