import React from "react";
import { request } from "graphql-request";
import { GraphQLNormalizr } from "./graphql-normalizr";
import { normalize } from "./my-normalizer";

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
        // Normalize each root field
        const normalizedQuery = {};
        let normalizedResponse = {};
        for (const [key, value] of Object.entries(data)) {
          const normalized = normalize(
            { id: key, __typename: "RootField", result: value },
            obj => obj.id + ";" + obj.__typename
          );
          normalizedQuery[key] = normalized.result;
          normalizedResponse = Object.assign(
            normalizedResponse,
            normalized.entities
          );
        }
        console.log("normalizedResponse", normalizedResponse);
        console.log("normalizedQuery", normalizedQuery);

        // data.id = "FAKEID";
        // data.__typename = "Query";
        // const normalized = normalize(
        //   data,
        //   obj => obj.id + ";" + obj.__typename
        // );
        // console.log("normalized", normalized);
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
