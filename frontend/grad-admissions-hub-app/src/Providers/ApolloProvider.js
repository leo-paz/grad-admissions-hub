import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import GetBook1 from '../Components/GetBook1';


/**
 * Detects errors. This will be optimized to better catch errors in the future.
 */
const errorLink = onError(({graphqlErrors, networkError}) => {
    if(graphqlErrors) {
        graphqlErrors.map(({message, location, path}) => {
            alert(`Graphql error ${message}`);
        });
    }
});

/**
 * Links our database
 */
const dbLink = from([
    errorLink,
    new HttpLink({ uri:"https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/dev/graphql"})
])

/**
 * Initalizes out Client for the provider
 */
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: dbLink
})

function Provider(){
    return <ApolloProvider client={client}></ApolloProvider>;
}

export default Provider;