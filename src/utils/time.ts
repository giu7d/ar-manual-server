export function addHours(hours: number) {
	const date = new Date();
	date.setTime(date.getTime() + hours * 60 * 60 * 1000);
	return date;
}

export function formatDate(date: Date) {
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();

	return day + month + year;
}
