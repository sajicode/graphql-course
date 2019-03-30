const Query = {
  users(parent, args, {
    db,
    prisma
  }, info) {
    const opArgs = {};

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
  posts(parent, args, {
    db,
    prisma
  }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{
            title_contains: args.query
          },
          {
            body_contains: args.query
          }
        ]
      };
    }
    return prisma.query.posts(opArgs, info);
    // if (!args.query) return db.posts;
    // return db.posts.filter(
    //   post =>
    //   post.title.toLowerCase().includes(args.query.toLowerCase()) ||
    //   post.body.toLowerCase().includes(args.query.toLowerCase())
    // );
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
  comments(parent, args, {
    db,
    prisma
  }, info) {

    return prisma.query.comments(null, info);
  }
};

export {
  Query as
  default
};