import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
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
    uri: "https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/dev/graphql",
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

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
