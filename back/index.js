import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// IMPORT ROUTES
import registersRoute from "./routes/register.js";
import db from "./db/db.js";

const app = express();
const PORT = 4000;
app.use(bodyParser.json());
app.use(cors());

// all register routers will be start with this route /register
app.use("/registers", registersRoute);

app.get("/", (req, res) => {
	res.send("Server working!");
});

app.use((error, req, res, next) => {
	res.status(400).json({
		status: "error",
		message: error.message
	});
});

app.listen(PORT, () => console.log(`Running on port: http://localhost:${PORT}`));
