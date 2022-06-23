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

export function queryInsert(query, insert) {
	const sql = `INSERT INTO users(first_name, last_name, email, password, phone, city)
  VALUES (?, ?, ?, ?, ?, ?)`;
	db.run(sql, ["Jorge", "hurtado", "qwe@qwe.com", "1231asd", "123123123", "calgary"], (err) => {
		if (err) return console.error(err.message);
		return "queryInsert done";
	});
}

export function querySelect(query) {
	const sql = `SELECT * FROM users`;
	db.all(sql, [], (err, rows) => {
		if (err) return console.error(err.message);
		return "querySelect done";
	});
}

export default db;
