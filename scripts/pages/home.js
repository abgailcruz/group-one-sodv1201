const properties = [
	{
		id: 1,
		name: "Esta es una imagen",
		image: "https://www.akkaarchitects.com/wp-content/uploads/2018/03/difference-between-workplace-and-workspace-768x512.jpg",
		address: "Avenida de los insurgentes",
		price: 34
	},
	{
		id: 2,
		name: "Esta es una imagen",
		image:
			"https://cdn.wework.com/locations/image/0d1ddabc-a7f6-11e9-8fb7-0ec6db7d2a3c/Web_150DPI-20190206_WeWork_Tokyo_Square_Garden_-_Common_Areas_-_Hot_Desk-1.jpg",
		address: "Avenida de los insurgentes",
		price: 34
	},
	{
		id: 3,
		name: "Esta es una imagen",
		image:
			"https://cdn.wework.com/locations/image/b76c4f76-2fdd-11e9-80e8-1202be33576a/Web_72DPI-20181220_WeWork_Daimyo_-_Common_Areas_-_Couch_Area-2.jpg",
		address: "Avenida de los insurgentes",
		price: 34
	},
	{
		id: 4,
		name: "Esta es una imagen",
		image: "https://www.springplace.com/content/slides/20190610-sp-art-18.jpg",
		address: "Avenida de los insurgentes",
		price: 34
	},
	{
		id: 5,
		name: "Esta es una imagen",
		image: "https://flyspaces.com/meeting-room_side-img_1.png",
		address: "Avenida de los insurgentes",
		price: 34
	},
	{
		id: 6,
		name: "Esta es una imagen",
		image: "https://www.chicagomag.com/wp-content/archive/city-life/August-2017/Guide-to-Chicagos-Co-Working-Spaces/TheShiftCoworking.jpg",
		address: "Avenida de los insurgentes",
		price: 34
	},
	{
		id: 7,
		name: "Esta es una imagen",
		image:
			"https://cdn.wework.com/locations/image/b9b333d2-af6d-11eb-869d-0e6a5dc689cd/Web_150DPI-20200821_WeWork_220_N_Green_Street_-_Chicago_006.jpg",
		address: "Avenida de los insurgentes",
		price: 34
	},
	{
		id: 8,
		name: "Esta es una imagen",
		image: "https://dr3h7ptpe31k5.cloudfront.net/Assets/images/2400/Serviced-Office-IL-Chicago-155-North-Wacker-Drive-847630.jpg",
		address: "Avenida de los insurgentes",
		price: 34
	},
	{
		id: 9,
		name: "Esta es una imagen",
		image:
			"https://picture.liquidspace.com/Index?emptyImageUrl=https%3A%2F%2Fliquidspace.com%2FContent%2FImages%2Fliquid-holder.jpg&etag=wY3ox1QCRxRIH5JNno14vg%3D%3D&crop=true&aux=tCuq3LCSYL%2FNwA5b5R1M5eLiDzW3KpNrdZlXvped%2Boc2dP7Cg1PbEBW7YEIxGEJgnC%2BUgph7S3NIaReWIOyV5A%3D%3D",
		address: "Avenida de los insurgentes",
		price: 34
	},
	{
		id: 10,
		name: "Esta es una imagen",
		image: "https://deskpass.imgix.net/production/rooms/private-office-for-day-use-4498/day-office_1.jpg?w=1000&h=600",
		address: "Avenida de los insurgentes",
		price: 34
	},
	{
		id: 11,
		name: "Esta es una imagen",
		image: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2020/06/FINAL-20-W-Kinzie-St-Broker-Brochure-091019-1_save-for-web.jpg",
		address: "Avenida de los insurgentes",
		price: 34
	},
	{
		id: 12,
		name: "Esta es una imagen",
		image:
			"https://www.wework.com/ideas/wp-content/uploads/sites/4/2020/06/Web_150DPI-20190308-WeWork-330-North-Wabash-Common-Areas-Wide-1_header-1120x630.jpg",
		address: "Avenida de los insurgentes",
		price: 34
	},
	{
		id: 13,
		name: "Esta es una imagen",
		image: "https://www.servcorp.co.jp/media/28434/coworking-mobile7.jpg",
		address: "Avenida de los insurgentes",
		price: 34
	},
	{
		id: 14,
		name: "Esta es una imagen",
		image: "https://www.wework.com/ideas/wp-content/uploads/sites/4/2020/06/FINAL-The-National-Broker-Brochure-090519-2_v1_for-web-800x571.jpg",
		address: "Avenida de los insurgentes",
		price: 34
	}
];

function sortBy(field) {
	dataSet.sort((a, b) => {
		// it is validated if the field is a number or a string
		let fieldA = typeof a[field] ? a[field] : a[field].toLowerCase(),
			fieldB = typeof b[field] ? b[field] : b[field].toLowerCase();
		if (fieldA < fieldB) return -1;
		if (fieldA > fieldB) return 1;
		return 0; //default return value (no sorting)
	});

	buildProperties(dataSet);
}

function buildProperties(data) {
	const html = data.map(
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
}

$(document).ready(function () {
	buildProperties(properties);
});
