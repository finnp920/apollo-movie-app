import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://movieql2.vercel.app",
  cache: new InMemoryCache({
    typePolicies: {
      Movies: {
        fields: {
          isLiked: {
            merge(existing, incoming, { variables }) {
              if (variables.isCachedYet && existing) return true;
              return incoming;
            },
          },
        },
      },
    },
  }),
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        const myMovie = {
          __typename: "Movie",
          id: `${id}`,
          isLiked: `${isLiked}`,
        };
        cache.modify({
          id: cache.identify(myMovie),
          fields: {
            isLiked(cachedName) {
              return !isLiked;
            },
          },
        });
      },
    },
  },
});

export default client;
