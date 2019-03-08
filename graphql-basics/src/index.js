import {
  GraphQLServer
} from "graphql-yoga";

// Type definitions (Schema)
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`;

// Resolvers
const resolvers = {
  Query: {
    id() {
      return "abc123"
    },
    name() {
      return "I am a string"
    },
    age() {
      return 24
    },
    employed() {
      return true;
    },
    gpa() {
      return 4.30
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log("The server is up and running"));