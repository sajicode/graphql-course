import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getUserId from '../utils/getUserId';

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

    return {
      user,
      token: jwt.sign({
        userId: user.id
      }, "whatsecretis?")
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

    return {
      user,
      token: jwt.sign({
          userId: user.id
        },
        "whatsecretis?"
      )
    };
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
      },
      info
    );
  },

  updateUser(parent, args, {
    prisma
  }, info) {
    return prisma.mutation.updateUser({
        where: {
          id: args.id
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
    prisma
  }, info) {
    return await prisma.mutation.deletePost({
        where: {
          id: args.id
        }
      },
      info
    );
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
      },
      info
    );
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
      },
      info
    );
  },

  deleteComment(parent, args, {
    prisma
  }, info) {
    return prisma.mutation.deleteComment({
        where: {
          id: args.id
        }
      },
      info
    );
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
      },
      info
    );
  }
};

export {
  Mutation as
  default
};