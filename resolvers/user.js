// User resolvers
import bcrypt from 'bcrypt';
import _ from 'lodash';


const formatErrors = (e, models) => {
  if (e instanceof models.Sequelize.ValidationError) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
    return e.errors.map((x) => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};

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
        if (password.length < 5 || password.length > 100) {
          return {
            ok: false,
            errors: [{ path: 'password', message: 'Şifre uzunluğu 5 ile 100 krakter arasında olması gerekmektedir.' }],
          };
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await models.User.create({ ...otherArgs, password: hashedPassword });
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
