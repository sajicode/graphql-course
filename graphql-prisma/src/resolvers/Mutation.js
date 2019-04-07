import bcrypt from "bcryptjs";
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';

// Take in password => validate password => Hash password => Generate auth token(JWT)

const Mutation = {
  async login(parent, args, {
    prisma
  }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    });

    if (!user) throw new Error("Invalid Email Address");

    const isMatch = await bcrypt.compare(args.data.password, user.password);

    if (!isMatch) throw new Error("Invalid Password");

    const token = generateToken(user.id);

    return {
      user,
      token
    };
  },

  async createUser(parent, args, {
    prisma
  }, info) {
    if (args.data.password.length < 8) {
      throw new Error("Password must be 8 characters or longer");
    }

    const password = await bcrypt.hash(args.data.password, 10);

    // info ensures that whatever selection set was asked for comes back
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });

    const token = generateToken(user.id);

    return {
      user,
      token
    };
  },

  async deleteUser(parent, args, {
    prisma,
    request
  }, info) {
    // const userExists = await prisma.exists.User({
    //   id: args.id
    // });

    // if (!userExists) throw new Error("User not found");

    // code above not necessary, left for reference sake
    const userId = getUserId(request);

    return await prisma.mutation.deleteUser({
        where: {
          id: userId
        }
      },
      info
    );
  },

  updateUser(parent, args, {
    prisma,
    request
  }, info) {
    const userId = getUserId(request);

    return prisma.mutation.updateUser({
        where: {
          id: userId
        },
        data: args.data
      },
      info
    );
  },

  createPost(parent, args, {
    prisma,
    request
  }, info) {

    const userId = getUserId(request)
    //get the header value, parse out the token, verify...
    return prisma.mutation.createPost({
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  },

  async deletePost(parent, args, {
    prisma,
    request
  }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    }, info);

    if (!postExists) throw new Error("Unable to delete post");

    return await prisma.mutation.deletePost({
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async updatePost(parent, {
    id,
    data
  }, {
    prisma,
    request
  }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id: id,
      author: {
        id: userId
      }
    });

    const isPublished = await prisma.exists.Post({
      id: id,
      published: true
    });

    if (isPublished && data.published === false) {
      await prisma.mutation.deleteManyComments({
        where: {
          post: {
            id: id
          }
        }
      });
    }

    if (!postExists) throw new Error("Unable to find post");

    return prisma.mutation.updatePost({
        where: {
          id: id
        },
        data: data
      },
      info
    );
  },

  async createComment(parent, args, {
    prisma,
    request
  }, info) {
    const userId = getUserId(request);

    const postExists = await prisma.exists.Post({
      id: args.data.post,
      published: true
    });

    if (!postExists) throw new Error("Unable to find post");

    return prisma.mutation.createComment({
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: userId
            }
          },
          post: {
            connect: {
              id: args.data.post
            }
          }
        }
      },
      info
    );
  },

  async deleteComment(parent, args, {
    prisma,
    request
  }, info) {

    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    }, info);

    if (!commentExists) throw new Error("Unable to find comment");

    return prisma.mutation.deleteComment({
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async updateComment(parent, {
    id,
    data
  }, {
    prisma,
    request
  }, info) {

    const userId = getUserId(request);

    const commentExists = await prisma.exists.Comment({
      id: id,
      author: {
        id: userId
      }
    }, info);

    if (!commentExists) throw new Error("Unable to find comment");

    return prisma.mutation.updateComment({
        where: {
          id: id
        },
        data: data
      },
      info
    );
  }
};

export {
  Mutation as
  default
};