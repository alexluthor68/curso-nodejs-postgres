const { User, UserSchema } = require('./user.model');

function septupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
}

module.exports = septupModels;
