import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import * as R from "ramda";

export const Books = ({ olle, updateOlle }) => (
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

      return (
        <div>
          <h2 onClick={updateOlle}>olle: {olle}</h2>
          {R.take(
            10,
            data.books.map(({ title, author }) => (
              <div key={title}>
                <p>{`${title}: ${author}`}</p>
              </div>
            ))
          )}
        </div>
      );
    }}
  </Query>
);
