import getUserId from '../utils/getUserId';

const Query = {
  users(parent, args, {
    db,
    prisma
  }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    if (args.query) {
      opArgs.where = {
        OR: [{
            name_contains: args.query
          },
          {
            email_contains: args.query
          }
        ]
      };
    }
    return prisma.query.users(opArgs, info);
    // if (!args.query) return db.users;
    // return db.users.filter(user =>
    //   user.name.toLowerCase().includes(args.query.toLowerCase())
    // );
  },

  myPosts(parent, args, {
    prisma,
    request
  }, info) {
    const userId = getUserId(request);
    const opArgs = {
      where: {
        author: {
          id: userId
        }
      },
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }

    if (args.query) {
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }]
    }

    return prisma.query.posts(opArgs, info);
  },

  posts(parent, args, {
    db,
    prisma
  }, info) {
    const opArgs = {
      where: {
        published: true
      },
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    if (args.query) {
      opArgs.where.OR = [{
          title_contains: args.query
        },
        {
          body_contains: args.query
        }
      ]
    }
    return prisma.query.posts(opArgs, info);
    // if (!args.query) return db.posts;
    // return db.posts.filter(
    //   post =>
    //   post.title.toLowerCase().includes(args.query.toLowerCase()) ||
    //   post.body.toLowerCase().includes(args.query.toLowerCase())
    // );
  },

  me(parent, args, {
    prisma,
    request
  }, info) {
    const userId = getUserId(request);

    return prisma.query.user({
      where: {
        id: userId
      }
    })
  },

  async post(parent, args, {
    prisma,
    request
  }, info) {
    const userId = getUserId(request, false);

    const posts = await prisma.query.posts({
      where: {
        id: args.id,
        OR: [{
          published: true
        }, {
          author: {
            id: userId
          }
        }]
      }
    }, info);

    if (posts.length === 0) throw new Error("Post not found");

    return posts[0];
  },
  comments(parent, args, {
    db,
    prisma
  }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }
    return prisma.query.comments(opArgs, info);
  }
};

export {
  Query as
  default
};