const { Pool } = require("pg");
const env = require("./env");

const pool = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASS,
    port: env.DB_PORT
});

async function connectDB() {
    try {
        await pool.query("SELECT 1");
        console.log("PostgreSQL connected");
    } catch (error) {
        console.error("DB connection failed", error);
        process.exit(1);
    }
}

module.exports = {
    pool,
    connectDB
};
