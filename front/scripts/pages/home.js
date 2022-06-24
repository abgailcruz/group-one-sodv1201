

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

function buildProperties() {
console.log("entro 1")
	fetch("http://localhost:4000/workspaces")
		.then((response) => response.json())
		.then((response) => {
			console.log("response", response, typeof response);
			const html = response.data.map(
				(item) => `	<div class="card">

					<div
						class="card__img"
						style="
							background-image: url(${item.image});
						"
					></div>
					<h1 class="card__title">${item.name}</h1>
					<p class="card__address">${item.address}</p>
					<p class="card__price"><span>C ${convertToDollars(item.price)}</span> Per hour</p>
					<button class="card__button">See detail</button>
				</div>`
				);
				$("#card-container").append(html);
		})
		.catch((err) => console.error(err));

}

buildProperties();
