const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

let books = [];
const authors = [
  { name: "J.K. Rowling", age: 100, prices: [{ name: "asdf", year: 2017 }] },
  { name: "J.K. Rowling", age: 100, prices: [{ name: "asdf", year: 2017 }] },
  { name: "J.K. Rowling", age: 100, prices: [{ name: "asdf", year: 2017 }] },
  { name: "J.K. Rowling", age: 100, prices: [{ name: "asdf", year: 2017 }] },
  { name: "J.K. Rowling", age: 100, prices: [{ name: "asdf", year: 2017 }] },
  { name: "J.K. Rowling", age: 100, prices: [{ name: "asdf", year: 2017 }] },
  { name: "J.K. Rowling", age: 100, prices: [{ name: "asdf", year: 2017 }] },
];
// Some fake data
for (let i = 0; i < 1000; i++) {
  books.push({
    title: "Harry Potter and the Sorcerer's stone",
    authors: authors
  });
}

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, authors: [Author] }
  type Author { name: String, age: Int, prices: [Price]}
  type Price { name: String, year: Int}
`;

// The resolvers
const resolvers = {
  Query: { books: () => books }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Start the server
app.listen(3001, () => {
  console.log("Go to http://localhost:3000/graphiql to run queries!");
});
