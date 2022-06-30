/* @name: Course Project: Shared Workspace Web App
 * @Course Code: SODV1201 - 22MAYMNOT4
 * @class: Introduction to Web Programming 
 * @authors: Abigail Cruz, Debora Salles Antunes, Jorge Alberto Hurtado Ortega, Maria Estrella
 */

// Function to Sort the properties based on either by name or by price.
function sortBy(field) {
	const propertiesFilters = properties.sort((a, b) => {
		// Validation if the field is a number or a string
		let fieldA = typeof a[field] ? a[field] : a[field].toLowerCase(),
			fieldB = typeof b[field] ? b[field] : b[field].toLowerCase();
		if (fieldA < fieldB) return -1;
		if (fieldA > fieldB) return 1;
		return 0; // Default return value (no sorting)
	});
	$("#card-container").empty();
	buildProperties(propertiesFilters);
}

// Function to show the properties in the home page
async function buildProperties() {
	const workspacesResponse = await fetch("http://localhost:4000/workspaces/all");
	const workspaces = await workspacesResponse.json();

	const imagesResponse = await fetch("http://localhost:4000/workspaces/images");
	const images = await imagesResponse.json();

	const citiesResponse = await fetch("http://localhost:4000/catalogs/cities");
	const cities = await citiesResponse.json();

	const html = workspaces.data.map((item) => {
		let img;
		if (item.imagesIDs.length > 0) {
			img = images.data.find((img) => img.ImageID === item.imagesIDs[0]);
		}
		const city = cities.data.find((c) => c.CityID === item.CityID);
		return `<div class="card">
				<div
					class="card__img"
					style="
						background-image: url(${img !== undefined && img.image_URL});
					"
				></div>
				<h1 class="card__title">${item.PropertyName}</h1>
				<p class="card__address">${city && city.CityName} ${item.PostalCode}</p>
				<p class="card__price"><span>C ${convertToDollars(item.Price)}</span> Per hour</p>
				<button class="card__button" onClick="openDetail('${item.WorkspaceID}')">See detail</button>
			</div>`;
	});
	if (html.length === 0) {
		return $("#card-container").append(
			`<h2>There are currently no workspaces, register and start creating them.
			<span style='font-size:40px;'>&#128521;</span></h2>
			`
		);
	}
	$("#card-container").append(html);
}

async function openDetail(id) {
	const response = await fetch(`http://localhost:4000/workspaces/byid/${id}`);
	const workspace = await response.json();

	const citiesResponse = await fetch("http://localhost:4000/catalogs/cities");
	const cities = await citiesResponse.json();

	const imagesModal = workspace.data.images.map((item) => item.image_URL);
	const city = cities.data.find((item) => item.CityID === workspace.data.CityID);
	openModal(
		`<div class="detail">
	<h1>${workspace.data.PropertyName}</h1>
	<div class="detail__img-container">
	${buildImages(imagesModal)}
	</div>
	<h3>${city.CityName} ${workspace.data.PostalCode}</h3>
	<h1>${convertToDollars(workspace.data.Price)}</h1>
	<div>
		<button class="addBtn" onClick="booking()">Booking</button>
		<span class="soon" style="display:none;">due to lack of time I am pending</span>
		<span class="soon" style='font-size:24px; display:none;'>&#128532;</span>
	</div>
</div>`,
		400,
		835
	);
}

function booking() {
	$(".soon").show();
}

buildProperties();
