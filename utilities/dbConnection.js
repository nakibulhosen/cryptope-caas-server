const Pool = require('pg').Pool;

const pool = new Pool({
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "password",
    "database": "cryptopecaas",
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool;