const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('naijakids', 'mrazuka', 'siwesjob', {
    host: 'db4free.net',
    dialect: 'mysql'
});

sequelize.sync()
const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Successfully connected to the Database");
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = { sequelize, connectToDb }