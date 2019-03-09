import { GraphQLServer } from "graphql-yoga";

// Remove later
const users = [
  {
    id: "1",
    name: "Rex",
    email: "rex@hex.com",
    age: 56
  },
  {
    id: "2",
    name: "Tex",
    email: "tex@hex.com",
    age: 36
  },
  {
    id: "3",
    name: "Jex",
    email: "Jex@hex.com",
    age: 16
  }
];

const posts = [
  {
    id: "01",
    title: "Lofty Heights",
    body: "O the escapades of man, for they are but mini-gods",
    published: "02-25-1992"
  },
  {
    id: "02",
    title: "Lowly Plains",
    body:
      "But bring down yourselves o lowly man, for you are but servants in the garden of the most high",
    published: "02-28-1992"
  },
  {
    id: "03",
    title: "Tender Hills",
    body: "Little actions, thoughtful thoughts",
    published: "02-29-1992"
  }
];

// Type definitions (Schema)
const typeDefs = `
  type Query {
    posts(query: String): [Post!]!
    users(query: String): [User!]!
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
    posts(parent, args, ctx, info) {
      if (!args.query) return posts;
      return posts.filter(
        post =>
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    users(parent, args, ctx, info) {
      if (!args.query) return users;
      return users.filter(user =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
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
