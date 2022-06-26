import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// IMPORT ROUTES
import registersRoute from "./routes/register.js";
import workspacesRoute from "./routes/workspaces.js";
import catalogsRoute from "./routes/catalogs.js";
import loginRoute from "./routes/login.js";

const app = express();
const PORT = 4000;
app.use(bodyParser.json());
app.use(cors());

// API routes
app.use("/registers", registersRoute);
app.use("/workspaces", workspacesRoute);
app.use("/catalogs", catalogsRoute);
app.use("/login", loginRoute);

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
