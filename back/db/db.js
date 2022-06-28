import sqlite3 from "sqlite3";
import tables from "./tables.js";
import { v4 as uuidv4 } from "uuid";

// Read or Create database
const db = new sqlite3.Database("./workspace.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => err && console.error(err));

db.serialize(() => {
	db.run(tables.rolesTable);
	db.run(tables.citiesTable);
	db.run(tables.paymentMethod);
	db.run(tables.users);
	db.run(tables.types);
	db.run(tables.leaseTeam);
	db.run(tables.workspaces);
	db.run(tables.booking);
	db.run(tables.images);
	db.run(tables.workspacesImage);

	// Insert data to Roles catalog
	["Owner", "Coworker", "Master"].map((item) =>
		queryInsert({
			table: "Roles",
			columns: ["RoleID", "RoleName"],
			columnsValue: [uuidv4(), item]
		})
	);

	// Insert data to Cities catalog
	["Calgary", "Toronto", "Vancouver", "Edmonton"].map((item) =>
		queryInsert({
			table: "Cities",
			columns: ["CityID", "CityName"],
			columnsValue: [uuidv4(), item]
		})
	);

	// Insert data to Lease_team catalog
	["Daily", "Weekly", "Monthly"].map((item) =>
		queryInsert({
			table: "Lease_team",
			columns: ["LeaseID", "LeaseName"],
			columnsValue: [uuidv4(), item]
		})
	);

	// Insert data to Types catalog
	["Desk", "Meeting Room", "Private office"].map((item) =>
		queryInsert({
			table: "Types",
			columns: ["TypeID", "TypeName"],
			columnsValue: [uuidv4(), item]
		})
	);

	// INSERT MASTER USER
	querySelect("SELECT * FROM Roles", (roles) => {
		let role = JSON.parse(roles).find((item) => item.RoleName === "Master");
		queryInsert({
			table: "Users",
			columns: ["UserID", "CityID", "PaymentID", "RoleID", "Name", "Password", "EmailAddress", "Phone", "Active"],
			columnsValue: [uuidv4(), null, null, role.RoleID, `Group Master`, "admin2022", "admin@admin.com", null, 1]
		});
	});
});

export function queryInsert(props) {
	const { table, columns, columnsValue } = props;
	const values = columns.map((item) => "?").join(", ");
	const sql = `INSERT INTO ${table}(${columns.join(", ")})
  VALUES (${values})`;
	db.run(sql, columnsValue, (err) => {
		if (err) return console.error(err.message);
		return "queryInsert done";
	});
}

export function querySelect(query, callback) {
	const sql = query;
	db.all(sql, [], (err, rows) => {
		if (err) return console.error(err.message);
		callback(JSON.stringify(rows));
	});
}

export async function querySelectAsync(query) {
	return new Promise(function (resolve, reject) {
		db.all(query, function (err, rows) {
			if (err) {
				return reject(err);
			}
			resolve(rows);
		});
	});
}

export default db;
