import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

/**
 * Detects errors. This will be optimized to better catch errors in the future.
 */
const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
      alert(`Graphql error location: ${location}`);
      alert(`Graphql error path: ${path}`);
      return message;
    });
  }
});

/**
 * Links our database
 */
const dbLink = from([
  errorLink,
  new HttpLink({
    uri: "https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/main/graphql",
  }),
]);

/**
 * Initalizes out Client for the provider
 */
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: dbLink,
  headers: {},
});

test('Make sure landing page is home', () => {
  const root = document.createElement("div");
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
      </ApolloProvider>
      ,root);
  expect(root.querySelector("h1").textContent).toBe("Home");
});

//test to make sure nvbar is there
//test to make sure icons are displayed
//test to make sure the different tabs on navbar exist
//HARD?: test to make sure routing is working properly.
