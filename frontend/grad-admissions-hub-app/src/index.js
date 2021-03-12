import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { gql } from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error';



const errorLink = onError(({graphqlErrors, networkError}) => {
  if(graphqlErrors) {
      graphqlErrors.map(({message, location, path}) => {
          alert(`Graphql error ${message}`);
      });

      
  }
  // if(networkError){
  //   networkError.map(({message, location, path}) => {
  //     alert(`network error ${message}`);
  // });
  // }
});

/**
* Links our database
*/
const dbLink = from([
  errorLink,
  new HttpLink({ uri:"https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/dev/graphql"})
])

 const client = new ApolloClient({
    uri: "https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/dev/graphql",
    cache: new InMemoryCache(),
    link: dbLink,
    headers: {
    },
    
 });

//  client
//   .query({
//     query: gql`
//      {
//       bookById(id: "book-2"){
//         id
//         name
//         pageCount
//         author {
//           firstName
//           lastName
//         }
//       }
//     }
//     `
//   })
//   .then(result => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
