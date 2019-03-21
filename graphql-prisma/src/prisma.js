import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

// prisma.query.comments(null, '{ id text author {id name}}').then(data => console.log(JSON.stringify(data, null, 2)));

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

prisma.mutation
  .updatePost(
    {
      where: {
        id: "cjtd8p53f008c0723ynodwue5"
      },
      data: {
        body: "The million faces of all"
      }
    },
    "{ id }"
  )
  .then(data => {
    return prisma.query.posts(null, "{ id title body published}");
  })
  .then(data => console.log(data));
