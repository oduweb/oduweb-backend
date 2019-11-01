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
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User);
  };

  return Post;
};
