// User resolvers

export default {
  User: {
    posts: (parent) => parent.getPosts(),
  },
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    createUser: (parent, args, { models }) => models.User.create(args),
  },
};
