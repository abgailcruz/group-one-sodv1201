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
