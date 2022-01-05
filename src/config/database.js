require('dotenv/config');

module.exports = {
    dialect: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    username: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASS,
    database: process.env.MYSQL_DB_NAME,
    define: {
        timestamps: true, 
        freezeTableName: true,
        underscored: true,
        underscoredAll: true,
    }
};