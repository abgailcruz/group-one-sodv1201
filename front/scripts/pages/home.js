function sortBy(field) {
	const propertiesFilters = properties.sort((a, b) => {
		// it is validated if the field is a number or a string
		console.log(a);
		console.log(b);
		let fieldA = typeof a[field] ? a[field] : a[field].toLowerCase(),
			fieldB = typeof b[field] ? b[field] : b[field].toLowerCase();
		if (fieldA < fieldB) return -1;
		if (fieldA > fieldB) return 1;
		return 0; //default return value (no sorting)
	});
	$("#card-container").empty();
	buildProperties(propertiesFilters);
}

async function buildProperties() {
	const workspacesResponse = await fetch("http://localhost:4000/workspaces");
	const workspaces = await workspacesResponse.json();

	const imagesResponse = await fetch("http://localhost:4000/workspaces/images");
	const images = await imagesResponse.json();

	const html = workspaces.data.map(
		(item) => `	<div class="card">

			<div
				class="card__img"
				style="
					background-image: url(${images.data.find((img) => img.ImageID === item.imagesIDs[0]).image_URL});
				"
			></div>
			<h1 class="card__title">${item.PropertyName}</h1>
			<p class="card__address">${item.PostalCode}</p>
			<p class="card__price"><span>C ${convertToDollars(item.Price)}</span> Per hour</p>
			<button class="card__button">See detail</button>
		</div>`
	);
	$("#card-container").append(html);
}

buildProperties();
