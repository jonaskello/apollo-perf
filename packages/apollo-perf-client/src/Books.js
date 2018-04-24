import React from "react";
import { Query } from "./Query";
import gql from "graphql-tag";
import { BookList } from "./BookList";
import { connect } from "react-redux";

export const BooksInternal = ({ olle, dispatch }) => (
  <Query
    query={gql`
      {
        books {
          title
          authors {
            name
            age
            prices {
              name
              year
            }
          }
        }

        books2: books {
          title
          authors {
            name
            age
            prices {
              name
              year
            }
          }
        }

        books3: books {
          title
          authors {
            name
            age
            prices {
              name
              year
            }
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return <BookList data={data} olle={olle} dispatch={dispatch} />;
    }}
  </Query>
);

const mapStateToProps = state => {
  return {
    olle: state.olle
  };
};

export const Books = connect(mapStateToProps)(BooksInternal);
