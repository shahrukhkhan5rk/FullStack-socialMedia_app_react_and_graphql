import React from 'react';
import App from './App';
//import ApolloClient from 'apollo-client';
//import { InMemoryCache } from 'apollo-cache-inmemory'; 
import { HttpLink } from '@apollo/client';
//import { ApolloProvider } from '@apollo/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// const httpLink = new HttpLink({
//     uri: 'http://localhost:5000/'
// });
const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:5000'
    }),
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);