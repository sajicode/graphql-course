import {
  extractFragmentReplacements
} from 'prisma-binding';
import Query from './Query';
import Mutation from './Mutation.js';
import User from './User';
import Post from './Post';
import Comment from './Comment';
import Subscription from './Subscription';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment
};

// below makes it possible for us to use fragments
// fragment replacements is a list of all the graphql fragment definitions e.g. from User.js

const fragmentReplacements = extractFragmentReplacements(resolvers);

export {
  resolvers,
  fragmentReplacements
};