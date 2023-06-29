import { provideApolloClient } from '@vue/apollo-composable';
import type { ApolloClient } from '@apollo/client/core';
import { ApolloLink, from } from '@apollo/client/core';
import { alertStore } from '@/store/alert';

export default defineNuxtPlugin(({ hook }) => {
  const { clients } = useApollo();
  const defaultClient: ApolloClient<any> = (clients as any).default;

  const alertLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((data) => {
      const alert = alertStore();
      data.data = data.data[Object.keys(data.data)[0]];
      if (
        data.data.hasOwnProperty('code') &&
        data.data.code &&
        data.data.code !== 'none' &&
        data.data.hasOwnProperty('response') &&
        data.data.response
      )
        alert.show(data.data.response, data.data.code);
      return data;
    });
  });

  defaultClient.setLink(from([alertLink, defaultClient.link]));
  provideApolloClient(defaultClient);

  hook('apollo:error', (error) => {
    console.error('error: ', error);
  });
});
