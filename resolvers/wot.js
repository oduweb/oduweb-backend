import formatErrors from '../formatErrors';

export default {
  Wot: {
    users: (parent) => parent.getUser(),
    posts: (parent) => parent.getPost(),
  },
  Query: {
    allWots: (parent, args, { models }) => models.Wot.findAll(),
    getWot: (parent, { Id }, { models }) => models.Wot.findOne({ where: { Id } }),
  },
  Mutation: {
    createWot: async (parent, args, { models }) => {
      try {
        const wot = await models.Wot.create(args);
        return {
          ok: true,
          wot,
        };
      } catch (err) {
        return {
          ok: false,
          erros: formatErrors(err, models),
        };
      }
    },
  },
};
