import formatErrors from '../formatErrors';
import { tryLogin } from '../auth';

export default {
  User: {
    posts: (parent) => parent.getPosts(),
  },
  Query: {
    getUser: async (parent, { Id }, { models }, context, args) => {
      const user = await models.User.findOne({ where: { Id } });
      console.log(Id);
      return user;
    },
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) => tryLogin(email, password, models, SECRET, SECRET2),
    registerUser: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);
        return {
          ok: true,
          user,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
    // models.User.create(args),
  },
};
