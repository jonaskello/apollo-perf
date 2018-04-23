import React from "react";
import { request } from "graphql-request";
import { GraphQLNormalizr } from "./graphql-normalizr";
import { normalize, denormalize } from "./my-normalizer";

export class Query extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: true,
      entities: undefined,
      result: undefined
    };
  }

  componentDidMount() {
    const { query, variables } = this.props;

    const normalizer = new GraphQLNormalizr({});
    const queryWithRequiredFields = normalizer.addRequiredFields(query);

    request("/graphql", queryWithRequiredFields, variables)
      .then(data => {
        // Normalize each root field
        const result = {};
        let entities = {};
        for (const [key, value] of Object.entries(data)) {
          const normalized = normalize(
            value,
            obj =>
              obj === value ? "RootField;" + key : obj.__typename + ";" + obj.id
          );
          result[key] = normalized.result;
          entities = Object.assign(entities, normalized.entities);
        }
        // console.log("entities", entities);
        // console.log("result", result);
        this.setState({
          data,
          loading: false,
          entities,
          result
        });
      })
      .catch(e => {
        console.error("GRAPHQL ERROR: ", e);
        this.setState({ error: e, loading: false });
      });
  }

  render() {
    const response = {};
    if (this.state.result) {
      for (const [key, value] of Object.entries(this.state.result)) {
        const denormalized = denormalize(
          value,
          this.state.entities,
          undefined,
          isId
        );
        response[key] = denormalized;
        // console.log("denormalized", denormalized);
      }
      // console.log("response", response);
    }

    return this.props.children({
      loading: this.state.loading,
      // data: this.state.data,
      data: response,
      error: this.state.error
    });
  }
}

function isId(value, entities) {
  // console.log("isId value", value);
  // console.log("isId entities", entities);
  if (typeof value === "string") {
    // If we find a object in the cache let's assume it is an ID
    if (entities[value]) {
      return true;
    }
  }
  return false;
}
