import express from "express";
import { v4 as uuidv4 } from "uuid";
import { queryInsert, querySelect, querySelectAsync, queryUpdate } from "../db/db.js";

const workspacesRoute = express.Router();

/**
 * Method: GET
 * To get all workspaces
 */
workspacesRoute.get("/all", async (req, res) => {
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
 * To get all workspaces by user
 */
workspacesRoute.get("/byuser/:id", async (req, res) => {
	const workspaces = await querySelectAsync(`SELECT * FROM Workspaces WHERE UserID = '${req.params.id}'`);
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

workspacesRoute.get("/byid/:id", async (req, res) => {
	const workspace = await querySelectAsync(`SELECT * FROM Workspaces WHERE WorkspaceID = '${req.params.id}'`);
	const workspacesImages = await querySelectAsync("SELECT * FROM Workspaces_Image");
	const images = await querySelectAsync("SELECT * FROM Images");
	const result = workspace.map((item) => {
		const imagesIDs = workspacesImages.filter((img) => img.WorkspaceID === item.WorkspaceID).map((img) => img.ImageID);
		const newImages = imagesIDs.map((item) => images.find((img) => img.ImageID === item));
		return { ...item, images: newImages };
	});
	res.json({
		status: "ok",
		data: result[0]
	});
});

workspacesRoute.put("/update/:id", async (req, res) => {
	const { property, city, postCode, googleMap, price, images } = req.body;
	const workspacesImages = await querySelectAsync(`SELECT * FROM Workspaces_Image WHERE WorkspaceID = '${req.params.id}'`);
	console.log("workspacesImages->", workspacesImages.length);

	queryUpdate({
		table: "Workspaces",
		fields: ["PropertyName", "CityID", "PostalCode", "GoogleMap", "Price"],
		fieldsValue: [property, city, postCode, googleMap, price],
		whereCondition: `WorkspaceID = ${req.params.id}`
	});
	images.forEach((item) => {
		if (item.id !== null && workspacesImages <= 4) {
			const imgID = uuidv4();
			queryInsert({
				table: "Images",
				columns: ["ImageID", "image_URL"],
				columnsValue: [imgID, item.url]
			});
			queryInsert({
				table: "Workspaces_Image",
				columns: ["Workspace_ImageID", "ImageID", "WorkspaceID"],
				columnsValue: [uuidv4(), imgID, req.params.id]
			});
		} else {
			queryUpdate({
				table: "Images",
				fields: ["image_URL"],
				fieldsValue: [item.url],
				whereCondition: `ImageID = '${item.id}'`
			});
		}
	});
	res.json({
		status: "ok",
		data: "data updated successfully"
	});
});

export default workspacesRoute;
