import React from "react";
import { request } from "graphql-request";

export class Query extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: undefined, loading: true };
  }

  componentDidMount() {
    request("/graphql", this.props.query, this.props.variables).then(data =>
      this.setState({ data, loading: false })
    );
  }

  render() {
    return this.props.children({
      loading: this.state.loading,
      data: this.state.data
    });
  }
}
