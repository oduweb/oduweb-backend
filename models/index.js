import Sequelize from 'sequelize';

const sequelize = new Sequelize('newDeepJupiter', 'postgres', '123qaz', {
  dialect: 'postgres',
});

const models = {
  User: sequelize.import('./user'),
  Post: sequelize.import('./post'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
