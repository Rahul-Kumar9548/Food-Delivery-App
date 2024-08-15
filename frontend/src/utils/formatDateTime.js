function formatDateTime(isoString) {
	const date = new Date(isoString);

	const options = {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
	};

	const formattedDate = date.toLocaleDateString("en-US", options);
	const timeOptions = {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true,
	};

	const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

	return `${formattedDate} at ${formattedTime}`;
}

export default formatDateTime;
