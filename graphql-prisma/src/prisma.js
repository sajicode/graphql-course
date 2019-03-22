import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

// prisma.query.comments(null, '{ id text author {id name}}').then(data => console.log(JSON.stringify(data, null, 2)));

// async await method

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({
    id: authorId
  });

  if (!userExists) {
    throw new Error("User not found");
  }

  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    },
    "{ author { id name email posts { id title published } } }"
  );

  return post.author;
};

// createPostForUser("cjtd81lq700460723bpjakjxb", {
//   title: "Great books to read",
//   body: "War and Peace",
//   published: true
// })
//   .then(user => console.log(JSON.stringify(user, undefined, 2)))
//   .catch(error => console.log(error.message));

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "Latest GraphQL post",
//         body: "Hey Hey Hey. Graphs",
//         published: true,
//         author: {
//           connect: {
//             id: "cjtd81lq700460723bpjakjxb"
//           }
//         }
//       }
//     },
//     "{id title body published}"
//   )
//   .then(data => {
//     console.log(data);
//     return prisma.query.users(null, "{ id name posts { id title } }");
//   })
//   .then(data => console.log(JSON.stringify(data, null, 2)));

// async await method for below
const updatePostForUser = async (postId, data) => {
  const postExists = await prisma.exists.Post({
    id: postId
  });

  if (!postExists) throw new Error("Post not found");

  const post = await prisma.mutation.updatePost(
    {
      where: {
        id: postId
      },
      data
    },
    "{ author {id name email posts {id title published}} }"
  );

  return post.author;
};

updatePostForUser("cjtkis4vy00040784okx19ipb", {
  published: true
})
  .then(user => console.log(JSON.stringify(user, null, 2)))
  .catch(error => console.log(error.message));

// prisma.mutation
//   .updatePost(
//     {
//       where: {
//         id: "cjtd8p53f008c0723ynodwue5"
//       },
//       data: {
//         body: "The million faces of all"
//       }
//     },
//     "{ id }"
//   )
//   .then(data => {
//     return prisma.query.posts(null, "{ id title body published}");
//   })
//   .then(data => console.log(data));
