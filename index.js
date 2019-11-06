import express from 'express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import models from './models';
import { refreshTokens } from './auth';

const SECRET = 'ashdbflaksjdbflakjsdfa';
const SECRET2 = 'akşsjfşakjsfnşaksfşaksda';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const { ApolloServer } = require('apollo-server-express');

const PORT = 8081;
const PATH = '/graphql';

const app = express();

app.use(cors('*'));

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      'schema.polling.enable': false,
    },
  },
  introspection: true,
  context: ({ req }) => ({
    models,
    user: req.user,
    SECRET,
    SECRET2,

  }),
  tracing: true,
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${PATH}`));

/* sync =>
force : Siler ve yeni tablo oluşturur.
alter: Silmeden değişiklikler yapar.
*/
models.sequelize.sync({ alter: true }).then(() => {
  app.listen(8082);
});
