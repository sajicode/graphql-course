import uuidv4 from 'uuid/v4';

const Mutation = {
  async createUser(parent, args, {
    prisma
  }, info) {
    // const emailTaken = await prisma.exists.User({
    //   email: args.data.email
    // });

    // if (emailTaken) throw new Error("Email taken");

    // code above not necessary, left for reference sake

    // info ensures that whatever selection set was asked for comes back
    const user = await prisma.mutation.createUser({
      data: args.data
    }, info)

    return user;
  },

  async deleteUser(parent, args, {
    prisma
  }, info) {
    // const userExists = await prisma.exists.User({
    //   id: args.id
    // });

    // if (!userExists) throw new Error("User not found");

    // code above not necessary, left for reference sake

    return await prisma.mutation.deleteUser({
      where: {
        id: args.id
      }
    }, info);
  },

  updateUser(parent, args, {
    prisma
  }, info) {
    return prisma.mutation.updateUser({
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  },

  createPost(parent, args, {
    prisma,
  }, info) {

    return prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: args.data.author
          }
        }
      }
    }, info)

  },

  async deletePost(parent, args, {
    prisma
  }, info) {
    return await prisma.mutation.deletePost({
      where: {
        id: args.id
      }
    }, info)
  },

  updatePost(parent, {
    id,
    data
  }, {
    prisma
  }, info) {
    return prisma.mutation.updatePost({
      where: {
        id: id
      },
      data: data
    }, info)
  },

  createComment(parent, args, {
    prisma
  }, info) {
    return prisma.createComment({
      data: {
        text: args.data.text,
        author: {
          connect: {
            id: args.data.author
          }
        },
        post: {
          connect: {
            id: args.data.post
          }
        }
      }
    }, info)
  },

  deleteComment(parent, args, {
    prisma
  }, info) {
    return prisma.mutation.deleteComment({
      where: {
        id: args.id
      }
    }, info)
  },

  updateComment(parent, {
    id,
    data
  }, {
    prisma
  }, info) {
    return prisma.mutation.updateComment({
      where: {
        id: id
      },
      data: data
    }, info)
  }
};

export {
  Mutation as
  default
};