import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({ uri: "/api/v1", endpoints: { v1: "/api/v1" } });

export const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
});
