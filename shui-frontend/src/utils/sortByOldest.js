export const sortByOldest = (messages, sortState) => {
	let sortedMessages = [];

	if (!sortState) {
		sortedMessages = messages.sort(
			(a, b) => new Date(a.CreatedAt) - new Date(b.CreatedAt)
		);
	} else
		sortedMessages = messages.sort(
			(a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
		);
	return sortedMessages;
};
