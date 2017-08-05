import { GRAPHQL_ENDPOINT } from './config'
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime'

const source = new RecordSource();
const store = new Store(source);

function fetchQuery(
  operation: any,
  variables: any,
  cacheConfig: any,
  uploadables: any,
) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
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
