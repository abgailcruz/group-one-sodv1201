/* @name: Course Project: Shared Workspace Web App
 * @Course Code: SODV1201 - 22MAYMNOT4
 * @class: Introduction to Web Programming 
 * @authors: Abigail Cruz, Debora Salles Antunes, Jorge Alberto Hurtado Ortega, Maria Estrella
 */

/**
 * code reference: https://flaviocopes.com/how-to-format-number-as-currency-javascript/
 * dollars formater
 */
const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2
});

// Function to convert the integer to an amount, here in Dollars / money format
function convertToDollars(amount) {
	return formatter.format(amount);
}

// Function to get city names from the database, and insert in the select as an option.
function getCities(id, defaultID) {
	fetch("http://localhost:4000/catalogs/cities")
		.then((response) => response.json())
		.then((response) => {
			const { data } = response;
			const html = data.map((item) => `<option value="${item.CityID}" ${item.CityID === defaultID && "selected"}>${item.CityName}</option>`);
			$(id).append(html);
		})
		.catch((err) => console.error(err));
}

// Function to get the information from the local storage
function userData() {
	const user = localStorage.getItem("loginWorkspace");
	return JSON.parse(user);
}

// Function to build the images
function buildImages(images) {
	return images
		.map(
			(item) => `<div
			class="properties__image"
			style="
				background-image: url('${item}');
			"
		></div>`
		)
		.flat()
		.join("");
}
