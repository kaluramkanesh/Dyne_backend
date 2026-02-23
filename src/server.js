// src/server.js

const app = require("./app");
const { PORT } = require("./config/env");
const { connectDB } = require("./config/database");


async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server failed to start", error);
        process.exit(1);
    }
}

startServer();
