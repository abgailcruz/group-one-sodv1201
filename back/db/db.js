import sqlite3 from "sqlite3";
import tables from "./tables.js";

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
		console.log("rows1", rows);
		if (err) return console.error(err.message);
		console.log("rows2", rows);
		callback(rows);
	});
}

export default db;
