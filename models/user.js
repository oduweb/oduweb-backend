import bcrypt from 'bcrypt';

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
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [5, 100],
            msg: 'Şifre uzunluğu 5 ile 100 krakter arasında olması gerekmektedir.',
          },
        },
      },
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
      hooks: {
        afterValidate: async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          // eslint-disable-next-line no-param-reassign
          user.password = hashedPassword;
        },
      },

    },
    {
      freezeTableName: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Post);
    User.hasMany(models.Wot);
  };

  return User;
};
