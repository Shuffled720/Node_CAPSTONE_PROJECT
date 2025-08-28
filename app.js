import express from "express";
import connectdb from "./db.js";
import router from "./router.js";
import { errorHandler } from "./errors/error.js";

const app = express();

connectdb();

app.use(express.json());

app.use("/api", router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
