import _ from 'lodash';
import formatErrors from '../formatErrors';

export default {
  Post: {
    users: (parent) => parent.getUser(),
  },
  Query: {
    allPosts: (parent, args, { models }) => models.Post.findAll(),
    getPost: (parent, { Id }, { models }) => models.Post.findOne({ where: { Id } }),
  },
  Mutation: {
    createPost: async (parent, args, { models, user }) => {
      try {
        await models.Post.create({ ...args, userId: user.Id });
        return {
          ok: true,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          erros: formatErrors(err),
        };
      }
    },
  },
};
