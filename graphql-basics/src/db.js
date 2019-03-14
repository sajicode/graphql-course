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

const db = {
  users,
  posts,
  comments
};

export {
  db as
  default
};