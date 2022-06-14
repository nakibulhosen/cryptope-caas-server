const Pool = require('pg').Pool;

const pool = new Pool({
    "host": "ec2-34-201-95-176.compute-1.amazonaws.com",
    "port": 5432,
    "user": "cdoztibtkeiprd",
    "password": "45566e60c988579f74202c31b1160e035a27587678696fa6fd6a548cee410bf0",
    "database": "d7l1re99b54fl0",
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool;