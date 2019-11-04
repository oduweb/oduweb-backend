export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userName: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'Lütfen kullanıcı adında özel krakter kullanmayınız.',
          },
          len: {
            args: [3, 25],
            msg: 'Kullanıcı Adında krakter uzunluğu 3 ile 25 krakter olmalıdır.',
          },
        },
      },
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: false,
            msg: 'Lütfen geçerli bir mail adresi giriniz.',
          },
        },
      },
    },
    {
      freezeTableName: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Post);
  };

  return User;
};
