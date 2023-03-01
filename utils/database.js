const Sequelize = require('sequelize');

const sequelize = new Sequelize("chat-real-time-application", "root", "nodecomplete", {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize;