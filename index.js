import express from 'express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';
import models from './models';
// import bodyParser from 'body-parser';

// import { makeExecutableSchema } from 'graphql-tools';

const SECRET = 'ashdbflaksjdbflakjsdfa';
const SECRET2 = 'akşsjfşakjsfnşaksfşaksda';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const { ApolloServer } = require('apollo-server-express');

const PORT = 8081;
const PATH = '/graphql';

const app = express();

app.use(cors('*'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      'schema.polling.enable': false,
    },
  },
  introspection: true,
  context: {
    models, user: { Id: 1 }, SECRET, SECRET2,
  },
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
