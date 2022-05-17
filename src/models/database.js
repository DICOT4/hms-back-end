const { Sequelize } = require("sequelize");

let sequelize = new Sequelize("hms", "root", "", {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
});

(async() => {
    try {
        await sequelize.sync()
        await sequelize.authenticate();
    } catch (e) {
        console.log(e);
    }
})()


module.exports = sequelize;
