import express from 'express';
// import bodyParser from 'body-parser';

import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

const { ApolloServer } = require('apollo-server-express');

const PORT = 4000;
const PATH = '/graphql';

const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({ schema });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:4000${PATH}`));

models.sequelize.sync({}).then(() => {
  app.listen(8081);
});
