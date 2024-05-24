//importing the mysql2/promise for creating an async await function qith await connection and await querys
const mysql = require("mysql2/promise");

//creation of the async await function which connects to database using the credentials store in key value pairs in the .env file and then runs necessary querys
const DBConn = async () => {
  try {
    //async await pool connection function
    const pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      waitForConnections: process.env.DB_WAITFORCONNECTIONS,
      connectionLimit: process.env.DB_CONNECTIONLIMIT,
      queueLimit: process.env.DB_QUEUELIMIT
    });

    //async await create database if not exist query
    await pool.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\``
    );
    console.log(`Database ${process.env.DB_DATABASE} created`);

    //async await query for switching to the created or if exist database
    await pool.query(`USE \`${process.env.DB_DATABASE}\``);
    console.log(`Switched to ${process.env.DB_DATABASE}`);

    //async await create tables in database if not exists query
    await pool.query(
      `CREATE TABLE IF NOT EXISTS \`${process.env.DB_TABLENAME}\` (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
    );
    console.log(`${process.env.DB_TABLENAME} table created`);
    
    //returning the pool to be using in controller functions
    return pool;
    
  } catch (error) {
    //basic error handling
    console.error("Error during database connection", error);
  }
};

//exporting the function
module.exports = DBConn;
