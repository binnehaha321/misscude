export const copyToClipboard = (str: string) => {
	if (navigator?.clipboard?.writeText) return navigator.clipboard.writeText(str)
	return Promise.reject('The Clipboard API is not available.')
}
