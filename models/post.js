export default (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'post',
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      freezeTableName: true,
    },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'userId',
      },
    });
    Post.hasMany(models.Wot);
  };

  return Post;
};
