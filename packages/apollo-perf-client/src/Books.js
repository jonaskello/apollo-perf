import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { BookList } from "./BookList";

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

      return <BookList data={data} olle={olle} updateOlle={updateOlle} />;
    }}
  </Query>
);
