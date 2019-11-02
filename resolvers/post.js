
export default {
  Post: {
    users: (parent) => parent.getUser(),
  },
  Query: {
    allPosts: (parent, args, { models }) => models.Post.findAll(),
    getPost: (parent, { Id }, { models }) => models.Post.findOne({ where: { Id } }),
  },
  Mutation: {
    createPost: async (parent, args, { models }) => {
      try {
        await models.Post.create(args);
        return true;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
