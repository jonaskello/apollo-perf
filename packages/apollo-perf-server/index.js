const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

let books = [];
const authors = [
  {
    id: 1,
    name: "J.K. Rowling",
    age: 100,
    prices: [{ id: 1, name: "asdf", year: 2017 }]
  },
  {
    id: 2,
    name: "J.K. Rowling",
    age: 100,
    prices: [{ id: 2, name: "asdf", year: 2017 }]
  },
  {
    id: 3,
    name: "J.K. Rowling",
    age: 100,
    prices: [{ id: 3, name: "asdf", year: 2017 }]
  },
  {
    id: 4,
    name: "J.K. Rowling",
    age: 100,
    prices: [{ id: 4, name: "asdf", year: 2017 }]
  },
  {
    id: 5,
    name: "J.K. Rowling",
    age: 100,
    prices: [{ id: 5, name: "asdf", year: 2017 }]
  },
  {
    id: 6,
    name: "J.K. Rowling",
    age: 100,
    prices: [{ id: 6, name: "asdf", year: 2017 }]
  },
  {
    id: 7,
    name: "J.K. Rowling",
    age: 100,
    prices: [{ id: 7, name: "asdf", year: 2017 }]
  }
];

// Some fake data
for (let i = 0; i < 1000; i++) {
  books.push({
    id: i,
    title: "Harry Potter and the Sorcerer's stone",
    authors: authors
  });
}

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { id: Int, title: String, authors: [Author] }
  type Author { id: Int, name: String, age: Int, prices: [Price]}
  type Price { id: Int, name: String, year: Int}
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
