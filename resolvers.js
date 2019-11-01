export default {
  Query: {
    getUser: (parent, { Id }, { models }) => models.User.findOne({ where: { Id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    createUser: (parent, args, { models }) => models.User.create(args),
  },
};
