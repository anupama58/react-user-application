import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { HttpLink } from "apollo-link-http";

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

const restLink = new RestLink({
    endpoints: {
      openExchangeRate: "http://localhost:3000/",
    },
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});