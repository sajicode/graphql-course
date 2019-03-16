const Subscription = {
  count: {
    subscribe(parent, args, {
      pubsub
    }, info) {
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish('count', {
          // property matches with subscription name
          count
        })
      }, 1000);
      // asyncIterator takes the channel name as an argument
      return pubsub.asyncIterator('count')
    }
  },
  comment: {
    subscribe(parent, {
      postId
    }, {
      db,
      pubsub
    }, info) {
      const post = db.posts.find(post => post.id === postId && post.published);

      if (!post) throw new Error("Post not found");

      return pubsub.asyncIterator(`comment ${postId}`);
    }
  }
};

export {
  Subscription as
  default
};