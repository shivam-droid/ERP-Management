import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { pathToFileURL } from "url";
import configFile from "../config/config.json" with { type: "json" };

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(decodeURIComponent(__filename).replace(/^\/([A-Z]:)/, "$1"));

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const files = fs.readdirSync(__dirname)
  .filter(file => file !== basename && file.slice(-3) === ".js");

for (const file of files) {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href; // file:// URL
  const modelModule = await import(modelPath);
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
