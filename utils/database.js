const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs_db', 'root', '', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;




// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejs_db',
//     password: ''
// });

// module.exports = pool.promise();