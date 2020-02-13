import Sequelize from 'sequelize';

const sequelize = new Sequelize('newDeepJupiter', 'postgres', '123qaz', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

const models = {
  User: sequelize.import('./user'),
  Post: sequelize.import('./post'),
  Wot: sequelize.import('./wot'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
