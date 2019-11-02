import express from 'express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import models from './models';

// import bodyParser from 'body-parser';

// import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const { ApolloServer } = require('apollo-server-express');

const PORT = 4000;
const PATH = '/graphql';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:4000${PATH}`));

models.sequelize.sync({}).then(() => {
  app.listen(8081);
});
