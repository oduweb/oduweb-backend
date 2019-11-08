export default (sequelize, DataTypes) => {
  const Wot = sequelize.define('wot', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TankName: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  });

  Wot.associate = (models) => {
    Wot.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        fied: 'userId',
      },
    });

    Wot.belongsTo(models.Post, {
      foreignKey: {
        name: 'postId',
        fied: 'postId',
      },
    });
  };

  return Wot;
};
