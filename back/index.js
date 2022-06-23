import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 4000;
app.use(bodyParser.json());
app.use(cors());

app.post("/register", function (req, res) {
	const { body } = req;
	console.log("body: ", body);
	res.json({
		status: "ok",
		body
	});
});

app.get("/", (req, res) => {
	res.send("Server working!");
});

// get all registers
app.get("/registers", (req, res) => {
	const data = { foo: "foo" };
	res.json({
		status: "ok",
		data: JSON.parse(data)
	});
});

app.get("/workspaces", (req, res) => {
	res.json({
		status: "ok",
	});
})

app.listen(PORT, () => console.log(`Running on port: http://localhost:${PORT}`));
