$(document).ready(function () {
	$("#addBtn").click(addNew);
	getCities();
	showProperties();
});

function addNew() {
	let property = $("#property").val();
	let city = $("#city").val();
	let postCode = $("#postCode").val();
	let googleMap = $("#gMap").val();
	let price = $("#price").val();

	let images = [];
	let img1 = $("#imgUrl1").val();
	let img2 = $("#imgUrl2").val();
	let img3 = $("#imgUrl3").val();
	let img4 = $("#imgUrl4").val();

	const errorsMessage = [];
	if (property.trim() === "") errorsMessage.push("Name");
	if (city.trim() === "") errorsMessage.push("City");
	if (postCode.trim() === "") errorsMessage.push("Postal Code ");
	if (price.trim() === "") errorsMessage.push("Price");

	if (img1.trim() !== "") images.push(img1);
	if (img2.trim() !== "") images.push(img2);
	if (img3.trim() !== "") images.push(img3);
	if (img4.trim() !== "") images.push(img4);

	if (errorsMessage.length > 0) {
		const messages = errorsMessage.join(", ");
		openErrors("Error, you need to add the next information: " + messages);
		return;
	}

	fetch("http://localhost:4000/workspaces/create", {
		method: "POST",
		body: JSON.stringify({ property, city, postCode, googleMap, price, images, id: userData().id }),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then((response) => response.json())
		.then((response) => {
			console.log("response", response, typeof response);
			showProperties();
		})
		.catch((err) => console.error(err));
}

async function showProperties() {
	const workspacesResponse = await fetch(`http://localhost:4000/workspaces/byuser/${userData().id}`);
	const workspaces = await workspacesResponse.json();

	const imagesResponse = await fetch("http://localhost:4000/workspaces/images");
	const images = await imagesResponse.json();

	const html = workspaces.data.map((item) => {
		const wImages = item.imagesIDs.map((img) => images.data.find((imgf) => imgf.ImageID === img).image_URL);

		return `<div>
		<h3>${item.PropertyName} - ${convertToDollars(item.Price)}</h3>
		<p>${item.city} ${item.PostalCode}</p>
		${
			item.imagesIDs.length > 0
				? `
				<h3>Photos added</h3>
				<div id="photos" class="photos">
					${buildImages(wImages)}
				</div>
			`
				: `<div class="notImage"><i>Not Images</i></div>`
		}
		<div class="btns-photo">
			<button class="modBtn">Edit</button>
			<button class="modBtn" onClick="deleteProperty(${item.id})">Delete</button>
		</div>
	</div>`;
	});
	$("#properties").append(html);
}

const buildImages = function (images) {
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
};

const deleteProperty = (id) => {
	const newArray = properties.filter((item) => item.id !== id);
	properties = newArray;
	showProperties(properties);
};
