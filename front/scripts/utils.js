/**
 * code reference: https://flaviocopes.com/how-to-format-number-as-currency-javascript/
 * dollars formater
 */
const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2
});

function convertToDollars(amount) {
	return formatter.format(amount);
}

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

function userData() {
	const user = localStorage.getItem("loginWorkspace");
	return JSON.parse(user);
}
