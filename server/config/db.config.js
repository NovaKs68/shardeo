let mysql = require('mysql');


db  = mysql.createPool({
    connectionLimit : 10,
    host            : 'mariadb',
    port            : '3306',
    user            : 'willemintom',
    password        : 'root',
    database        : 'shardeo',
    multipleStatements: true
});
