export const localStore = {
	get(name: string) {
		let data = localStorage.getItem(name)

		if (data) {
			data = JSON.parse(data)
			return data
		}
	},

	set(name: string, value: any) {
		localStorage.setItem(name, JSON.stringify(value))
	},

	remove(name: string) {
		localStorage.removeItem(name)
	},

	removeAll() {
		localStorage.clear()
	}
}
