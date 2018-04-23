import React from "react";
import { request } from "graphql-request";
import { GraphQLNormalizr } from "./graphql-normalizr";
import { normalize, denormalize } from "./my-normalizer";
import { connect } from "react-redux";
import * as Actions from "./Actions";

export class QueryInternal extends React.Component {
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
    const { query, variables, dispatch } = this.props;

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
        dispatch(Actions.mergeEntities(entities));
      })
      .catch(e => {
        console.error("GRAPHQL ERROR: ", e);
        this.setState({ error: e, loading: false });
      });
  }

  render() {
    const { entities, result, loading, error } = this.state;
    const response = {};
    if (result) {
      for (const [key, value] of Object.entries(result)) {
        const denormalized = denormalize(value, entities);
        response[key] = denormalized;
        // console.log("denormalized", denormalized);
      }
      // console.log("response", response);
    }

    return this.props.children({
      loading: loading,
      // data: this.state.data,
      data: response,
      error: error
    });
  }
}

const mapStateToProps = state => {
  return {
    entities: state.entities
  };
};

export const Query = connect(mapStateToProps)(QueryInternal);
