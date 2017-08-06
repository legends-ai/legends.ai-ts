import { GRAPHQL_ENDPOINT } from './config'
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime'
import * as fetch from 'isomorphic-fetch'

const source = new RecordSource();
const store = new Store(source);

function fetchQuery(
  operation: any,
  variables: any,
  cacheConfig: any,
  uploadables: any,
) {
  return fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then((response: any) => {
    return response.json();
  });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);

// Create an environment using this network:
const environment = new Environment({
  network,
  store,
});

export default environment