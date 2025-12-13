import express from "express";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();
startServer();

function startServer() {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.json());

    app.use("/", routes);

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

