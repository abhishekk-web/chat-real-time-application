const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('group', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = User;