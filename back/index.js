import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// IMPORT ROUTES
import registersRoute from "./routes/register.js";

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


//create a get point for login page
app.get('/login', function (req, res) {
	console.log('Login Page')
	res.send ('Login Page')
	});

// create a post endpoint for login page
app.post('/login', function(req, res) {
	const { body } = req;
	// extract data from request
	// create a database entry
	res.json({"code": "loginCreated"})
	});