import React from "react";
import { request } from "graphql-request";
import * as Reselect from "reselect";
import { connect } from "react-redux";
import { normalize, denormalize, addRequiredFields } from "./my-normalizer";
import * as Actions from "./Actions";

class QueryInternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: true,
      // entities: undefined,
      result: undefined
    };
  }

  componentDidMount() {
    console.log("123123123");
    const { query, variables, dispatch } = this.props;

    const queryWithRequiredFields = addRequiredFields(query);

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
        dispatch(Actions.mergeEntities(entities));
        this.setState({
          data,
          loading: false,
          // entities,
          result
        });
      })
      .catch(e => {
        console.error("GRAPHQL ERROR: ", e);
        this.setState({ error: e, loading: false });
      });
  }

  render() {
    const { result, loading, error } = this.state;
    return (
      <InnerComponentConnected result={result} loading={loading} error={error}>
        {this.props.children}
      </InnerComponentConnected>
    );
  }
}

export const Query = connect()(QueryInternal);

function InnerComponent({ children, error, loading, response }) {
  return children({
    loading: loading,
    // data: this.state.data,
    data: response,
    error: error
  });
}

function buildResponse(result, entities) {
  const response = {};
  if (result) {
    for (const [key, value] of Object.entries(result)) {
      const denormalized = denormalize(value, entities);
      response[key] = denormalized;
    }
  }

  return response;
}

const mapStateToProps = Reselect.createSelector(
  state => {
    return state.entities;
  },
  (_, props) => props.result,
  (entities, result) => {
    return {
      response: buildResponse(result, entities)
    };
  }
);

const InnerComponentConnected = connect(mapStateToProps)(InnerComponent);
