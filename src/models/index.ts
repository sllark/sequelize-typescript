"use strict";

import fs from "fs";
import path from "path";
import { Sequelize, Model, DataTypes } from "sequelize";

const basename = path.basename(__filename);
const env: string = process.env.NODE_ENV || "development";
import configs from "../config/config.json";

const config = configs[env];

interface dbTypes {
  sequelize: typeof Sequelize | null;
  Sequelize: typeof Sequelize | null;
  User: typeof Model | null;
  Cart: typeof Model | null;
  Order: typeof Model | null;
  CartItem: typeof Model | null;
  Product: typeof Model | null;
}

const db: dbTypes = {
  sequelize: null,
  Sequelize: null,
  User: null,
  Cart: null,
  Order: null,
  CartItem: null,
  Product: null,
};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
  );
});

for (const file of files) {
  const fileImp = await import(path.join(__dirname, file));
  const model = fileImp.default(sequelize, DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
