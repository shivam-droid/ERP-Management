import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      // define association here
      Company.hasMany(models.User, { foreignKey: "company_id" });
    }
  }

  Company.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Company",
    }
  );

  return Company;
};
