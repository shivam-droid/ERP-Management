'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Company, { foreignKey: 'company_id' });
      User.belongsTo(models.Role, { foreignKey: 'role_id' });
      User.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    company_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};