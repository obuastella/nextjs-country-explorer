import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/", // Public GraphQL API for testing
  cache: new InMemoryCache(),
});

export default client;
