import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Company, { foreignKey: "company_id" });
      User.belongsTo(models.Role, { foreignKey: "role_id" });
      User.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
      role_id: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
