import express from 'express';
// import bodyParser from 'body-parser';

// import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

const { ApolloServer } = require('apollo-server-express');

const PORT = 4000;
const PATH = '/graphql';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: false,
  context: async ({ req, models }) => {
    if (models) {
      // check connection for metadata
      return models.context;
    }
    // check from req
    const token = req.headers.authorization || '';
    console.log(token);
    return { token };
  },
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:4000${PATH}`));

models.sequelize.sync({}).then(() => {
  app.listen(8081);
});
