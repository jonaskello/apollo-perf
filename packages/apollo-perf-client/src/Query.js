import React from "react";
import { request } from "graphql-request";
import { GraphQLNormalizr } from "./graphql-normalizr";

export class Query extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: undefined, loading: true };
  }

  componentDidMount() {
    const { query, variables } = this.props;

    const normalizer = new GraphQLNormalizr({});
    const queryWithRequiredFields = normalizer.addRequiredFields(query);

    request("/graphql", queryWithRequiredFields, variables)
      .then(data => {
        console.log("data", data);
        const normalized = normalizer.normalize({ data });
        console.log("normalized", normalized);
        this.setState({ data, loading: false });
      })
      .catch(e => {
        console.error("GRAPHQL ERROR: ", e);
        this.setState({ error: e, loading: false });
      });
  }

  render() {
    return this.props.children({
      loading: this.state.loading,
      data: this.state.data,
      error: this.state.error
    });
  }
}
