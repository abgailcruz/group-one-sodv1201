/* @name: Course Project: Shared Workspace Web App
 * @Course Code: SODV1201 - 22MAYMNOT4
 * @class: Introduction to Web Programming 
 * @authors: Abigail Cruz, Debora Salles Antunes, Jorge Alberto Hurtado Ortega, Maria Estrella
 */

$(document).ready(function () {
	$("#addBtn").click(addNew);
	getCities("#city");
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
	if (postCode.trim() === "") errorsMessage.push("Postal Code");
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
			if (response.status === "ok") {
				window.location.href = "/front/user-profile.html";
			}
		})
		.catch((err) => console.error(err));
}

async function showProperties() {
	const workspacesResponse = await fetch(`http://localhost:4000/workspaces/byuser/${userData().id}`);
	const workspaces = await workspacesResponse.json();

	const imagesResponse = await fetch("http://localhost:4000/workspaces/images");
	const images = await imagesResponse.json();

	const citiesResponse = await fetch("http://localhost:4000/catalogs/cities");
	const cities = await citiesResponse.json();

	const html = workspaces.data.map((item) => {
		const wImages = item.imagesIDs.map((img) => {
			const imgFounded = images.data.find((imgf) => imgf.ImageID === img);
			return imgFounded ? imgFounded.image_URL : null;
		});
		const city = cities.data.find((c) => c.CityID === item.CityID);
		return `<div>
		<h3>${item.PropertyName} - ${convertToDollars(item.Price)}</h3>
		<p> ${city && city.CityName} ${item.PostalCode}</p>
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
			<button class="modBtn" onClick="editOpen('${item.WorkspaceID}')">Edit</button>
			<button class="modBtn" onClick="deleteWorkspace('${item.WorkspaceID}')">Delete</button>
		</div>
	</div>`;
	});
	$("#properties").append(html);
}

function editOpen(id) {
	fetch(`http://localhost:4000/workspaces/byid/${id}`)
		.then((response) => response.json())
		.then((response) => {
			const { data } = response;
			openModal(
				`
					<div class="edit-form">
						<h4>Edit workspace</h4>
	          <label for="property">Property:</label>
	          <input class="inputBox" type="text" id="propertyEdit" value="${data.PropertyName}">
	          <label for="city">City:</label>
						<select class="inputBox" placeholder="City" id="cityEdit">
							<option>Select city</option>
						</select>
	          <label for="postCode">Post Code:</label>
	          <input class="inputBox" type="text" id="postCodeEdit" value="${data.PostalCode}">
	          <label for="gMap">Google Map URL:</label>
	          <input class="inputBox" type="text" id="gMapEdit" value="${data.GoogleMap}">
	          <label for="price">Price:</label>
	          <input class="inputBox" type="number" id="priceEdit" value="${data.Price}">
	          <p>You can add until four images <i>(url images only)</i></p>
	          <label for="imgUrl1">Image URL 1:</label>
	          <input class="inputBox" type="text" id="imgUrl1Edit" value="${data.images[0] ? data.images[0].image_URL : ""}">
						<input type="hidden" id="imghidden0" value="${data.images[0] ? data.images[0].ImageID : ""}">
	          <label for="imgUrl2">Image URL 2:</label>
	          <input class="inputBox" type="text" id="imgUrl2Edit" value="${data.images[1] ? data.images[1].image_URL : ""}">
						<input type="hidden" id="imghidden1" value="${data.images[1] ? data.images[1].ImageID : ""}">
	          <label for="imgUrl1">Image URL 3:</label>
	          <input class="inputBox" type="text" id="imgUrl3Edit" value="${data.images[2] ? data.images[2].image_URL : ""}">
						<input type="hidden" id="imghidden2" value="${data.images[2] ? data.images[2].ImageID : ""}">
	          <label for="imgUrl4">Image URL 4:</label>
	          <input class="inputBox" type="text" id="imgUrl4Edit" value="${data.images[3] ? data.images[3].image_URL : ""}">
						<input type="hidden" id="imghidden3" value="${data.images[3] ? data.images[3].ImageID : ""}">
	          <button class="addBtn" onclick="updateData('${data.WorkspaceID}')">Update</button>
					<div>
	      	`,
				630,
				438
			);
			getCities("#cityEdit", data.CityID);
		})
		.catch((err) => console.error(err));
}

function updateData(id) {
	const property = $("#propertyEdit").val();
	const city = $("#cityEdit").val();
	const postCode = $("#postCodeEdit").val();
	const googleMap = $("#gMapEdit").val();
	const price = $("#priceEdit").val();
	const images = [];
	const img1 = $("#imgUrl1Edit").val();
	const img2 = $("#imgUrl2Edit").val();
	const img3 = $("#imgUrl3Edit").val();
	const img4 = $("#imgUrl4Edit").val();
	const imghidden0 = $("#imghidden0").val();
	const imghidden1 = $("#imghidden1").val();
	const imghidden2 = $("#imghidden2").val();
	const imghidden3 = $("#imghidden3").val();
	const body = {
		property,
		city,
		postCode,
		googleMap,
		price,
		images,
		images: [
			{
				id: imghidden0 ? imghidden0 : null,
				url: img1
			},
			{
				id: imghidden1 ? imghidden1 : null,
				url: img2
			},
			{
				id: imghidden2 ? imghidden2 : null,
				url: img3
			},
			{
				id: imghidden3 ? imghidden3 : null,
				url: img4
			}
		]
	};
	fetch(`http://localhost:4000/workspaces/update/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	})
		.then((response) => response.json())
		.then((response) => {
			if (response.status === "ok") {
				window.location.href = "/front/user-profile.html";
			}
		});
}

function deleteWorkspace(id) {
	console.log(id);
	fetch(`http://localhost:4000/workspaces/delete/${id}`, {
		method: "DELETE"
	})
		.then((response) => response.json())
		.then((response) => {
			if (response.status === "ok") {
				window.location.href = "/front/user-profile.html";
			}
		});
}
