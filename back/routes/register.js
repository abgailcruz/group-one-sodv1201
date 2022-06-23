import express from "express";
import { v4 as uuidv4 } from "uuid";

const registersRoute = express.Router();

/**
 * Method: POST
 * Create a register
 */
registersRoute.post("/", function (req, res) {
	const { body } = req;
	console.log("body: ", body);
	res.json({
		status: "ok",
		body
	});
});

/**
 * Method: GET
 * To get all registers
 */
registersRoute.get("/", (req, res) => {
	const data = { registers: ["foo"] };
	res.json({
		status: "ok",
		data: JSON.parse(data)
	});
});

export default registersRoute;
