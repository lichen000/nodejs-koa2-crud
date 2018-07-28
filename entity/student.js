"use strict";

const Sequelize = require('sequelize');
const config = require('../config/db');

let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false,
    timezone: '+08:00' //东八时区
});

let Student = sequelize.define('t_student', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    create_time: Sequelize.DATE,
    update_time: Sequelize.DATE,
    note: Sequelize.STRING,
    number: Sequelize.STRING,
    name: Sequelize.STRING,
    age: Sequelize.INTEGER
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Student;