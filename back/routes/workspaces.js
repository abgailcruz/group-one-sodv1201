import express from "express";
import { v4 as uuidv4 } from "uuid";
import { queryInsert, querySelect, querySelectAsync } from "../db/db.js";

const workspacesRoute = express.Router();

/**
 * Method: GET
 * To get all workspaces
 */
workspacesRoute.get("/", async (req, res) => {
	const workspaces = await querySelectAsync("SELECT * FROM Workspaces");
	const workspacesImages = await querySelectAsync("SELECT * FROM Workspaces_Image");
	const result = workspaces.map((item) => {
		const imagesIDs = workspacesImages.filter((img) => img.WorkspaceID === item.WorkspaceID).map((img) => img.ImageID);
		return { ...item, imagesIDs };
	});

	res.json({
		status: "ok",
		data: result
	});
});

/**
 * Method: GET
 * To get all workspaces images
 */
workspacesRoute.get("/images", (req, res) => {
	querySelect("SELECT * FROM Images", (workspacesImages) => {
		res.json({
			status: "ok",
			data: JSON.parse(workspacesImages)
		});
	});
});

/**
 * Method: POST
 * Create a workspace
 */
workspacesRoute.post("/create", function (req, res) {
	const { property, city, postCode, googleMap, price, images, id } = req.body;

	const workspaceID = uuidv4();
	queryInsert({
		table: "Workspaces",
		columns: [
			"WorkspaceID",
			"PropertyName",
			"PropertyAddress",
			"CityID",
			"PostalCode",
			"GoogleMap",
			"TypeID",
			"Size",
			"NoOfCoworker",
			"Parking",
			"Smoking",
			"DateAvailable",
			"LeaseID",
			"Price",
			"UserID",
			"Availability",
			"BookingStartDate",
			"BookingEndDate",
			"ReachTransp"
		],
		columnsValue: [
			workspaceID,
			property,
			null,
			city,
			postCode,
			googleMap,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			price,
			id,
			null,
			null,
			null,
			null
		]
	});
	images.forEach((item) => {
		const imgID = uuidv4();
		queryInsert({
			table: "Images",
			columns: ["ImageID", "image_URL"],
			columnsValue: [imgID, item]
		});
		queryInsert({
			table: "Workspaces_Image",
			columns: ["Workspace_ImageID", "ImageID", "WorkspaceID"],
			columnsValue: [uuidv4(), imgID, workspaceID]
		});
	});

	res.json({
		status: "ok",
		message: "workspace created successfully"
	});
});

export default workspacesRoute;
