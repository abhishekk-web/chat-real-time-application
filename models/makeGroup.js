const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Group = sequelize.define('group', {

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

module.exports = Group;