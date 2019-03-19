const Query = {
  posts(parent, args, {
    db
  }, info) {
    if (!args.query) return db.posts;
    return db.posts.filter(
      post =>
      post.title.toLowerCase().includes(args.query.toLowerCase()) ||
      post.body.toLowerCase().includes(args.query.toLowerCase())
    );
  },
  users(parent, args, {
    db
  }, info) {
    if (!args.query) return db.users;
    return db.users.filter(user =>
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
  comments(parent, args, {
    db
  }, info) {
    return db.comments;
  }
};

export {
  Query as
  default
};