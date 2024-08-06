export const formatDate = (date: string) =>
	Intl.DateTimeFormat('vi-VI').format(new Date(date))
