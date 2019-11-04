// User resolvers
import bcrypt from 'bcrypt';


export default {
  User: {
    posts: (parent) => parent.getPosts(),
  },
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    registerUser: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await models.User.create({ ...otherArgs, password: hashedPassword });
        return true;
      } catch (err) {
        return false;
      }
    },
    // models.User.create(args),
  },
};
