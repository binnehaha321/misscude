export const useLocalStorage = () => {
	const getItem = (itemName: string) => {
		const value = localStorage.getItem(itemName)

		if (!value) return ''
		return JSON.parse(value)
	}

	const addItem = (itemName: string, itemValue: any) => {
		localStorage.setItem(itemName, JSON.stringify(itemValue))
	}

	const removeItem = (itemName: string) => {
		localStorage.removeItem(itemName)
	}

	const clearAll = () => {
		localStorage.clear()
	}

	return {
		getItem,
		addItem,
		removeItem,
		clearAll
	}
}
