import { GraphQLServer } from "graphql-yoga";

// Type definitions (Schema)
const typeDefs = `
  type Query {
    add(x: Int!, y: Int!): Int!
    greeting(name: String): String!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    add(parent, { x, y }, ctx, info) {
      return x + y;
    },
    greeting(parent, args, ctx, info) {
      if (args.name) return `Hello ${args.name}`;
      else return "Hello";
    },
    me() {
      return {
        id: "12ee6",
        name: "Micah",
        email: "micah@hero.com",
        age: 45
      };
    },
    post() {
      return {
        id: "3dh8o",
        title: "A Rude Awakening",
        body: "Que sera sera, whatever will be will be",
        published: "03-06-2019"
      };
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log("The server is up and running"));
