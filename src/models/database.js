const { Sequelize } = require("sequelize");

let sequelize = new Sequelize("hms", "root", "", {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
});

(async() => {
    await sequelize.sync()
    await sequelize.authenticate();
})()


module.exports = sequelize;
