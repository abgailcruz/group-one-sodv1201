import express from "express";
import { v4 as uuidv4 } from "uuid";
import db, { queryInsert, querySelect } from "../db/db.js";

const registersRoute = express.Router();

/**
 * Method: POST
 * Create a register
 */
registersRoute.post("/", function (req, res) {
	console.log("ENTRO");
	const { body } = req;
	console.log("body: ", body);
	queryInsert({
		table: "Roles",
		columns: ["RoleName"],
		columnsValue: ["Owner"]
	});
	querySelect(`SELECT * FROM Roles`, (data) => {
		console.log("---->", data);
	});
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
