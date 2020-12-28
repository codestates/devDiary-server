"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

var sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
	host: "practice-database-deploy.cht7atdafw8y.ap-northeast-2.rds.amazonaws.com",
	port: 3306,
	logging: console.log,
	maxConcurrentQueries: 100,
	dialect: "mysql",
	ssl: true,
	dialectOptions: {
		ssl: "Amazon RDS",
	},
	pool: { maxConnections: 5, maxIdleTime: 30 },
	language: "en",
});


// let sequelize;
// if (config.use_env_variable) {
// 	sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
// 	sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

fs.readdirSync(__dirname)
	.filter(file => {
		return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
