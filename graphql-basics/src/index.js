import uuidv4 from 'uuid/v4';
import {
  GraphQLServer
} from "graphql-yoga";

// Remove later
const users = [{
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

const posts = [{
    id: "01",
    title: "Lofty Heights",
    body: "O the escapades of man, for they are but mini-gods",
    published: "02-25-1992",
    author: '1'
  },
  {
    id: "02",
    title: "Lowly Plains",
    body: "But bring down yourselves o lowly man, for you are but servants in the garden of the most high",
    published: "02-28-1992",
    author: '1'
  },
  {
    id: "03",
    title: "Tender Hills",
    body: "Little actions, thoughtful thoughts",
    published: "02-29-1992",
    author: '2'
  }
];

const comments = [{
    id: "001",
    text: "What are you even saying?",
    author: '3',
    post: '02'
  },
  {
    id: "002",
    text: "Do you even think before you talk?",
    author: '2',
    post: '01'
  },
  {
    id: "003",
    text: "I can now say I have seen it all",
    author: '2',
    post: '03'
  },
  {
    id: "004",
    text: "I can't help but laugh. You surely don't mean this",
    author: '1',
    post: '03'
  }
];

// Type definitions (Schema)
const typeDefs = `
  type Query {
    posts(query: String): [Post!]!
    users(query: String): [User!]!
    comments: [Comment]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    createComment(text: String!, author: ID!, post: ID!): Comment!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: String!
    author: User!,
    comments: [Comment]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
    },
    comments(parent, args, ctx, info) {
      return comments;
    }
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.email);
      if (emailTaken) throw new Error("Email taken")

      const user = {
        id: uuidv4(),
        ...args
      };

      users.push(user);
      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author)

      if (!userExists) throw new Error("User not found");

      const post = {
        id: uuidv4(),
        ...args
      };

      posts.push(post);

      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author);
      const postExists = posts.some(post => post.id === args.post && post.published)

      if (!userExists) throw new Error("User not found");
      if (!postExists) throw new Error("Post not found");

      const comment = {
        id: uuidv4(),
        ...args
      };

      comments.push(comment);

      return comment;
    }
  },
  // return the author and comments of a particular post
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id)
    }
  },
  // return all posts and comments of a user
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id)
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id)
    }
  },
  // return the author and post of a particular comment
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post)
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log("The server is up and running"));