export const calculateTimeDiff = (date) => {
	const messageDate = new Date(date);
	const currentDate = new Date();

	const diffMs = currentDate - messageDate;
	const diffMinutes = Math.floor(diffMs / (1000 * 60)); // totala minuter
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // totala timmar
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // totala dagar

	if (diffMinutes < 60) {
		return `${diffMinutes} min sedan`; // mindre än 60 min → visa bara minuter
	} else if (diffHours < 24) {
		return `${diffHours} tim sedan`; // timmar + minuter
	} else {
		return `${diffDays} dag sedan `; // dagar + timmar + minuter
	}
};
