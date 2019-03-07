import {
  GraphQLServer
} from "graphql-yoga";

// Type definitions (Schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "This is the first query. Perfect!";
    },
    name() {
      return 'Maximus Meridius';
    },
    location() {
      return 'Lagos, Nigeria'
    },
    bio() {
      return 'Curious late bloomer'
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log("The server is up and running"));