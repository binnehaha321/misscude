export const useScroll = () => {
	const scrollIntoView = (node: React.RefObject<HTMLElement>) => {
		if (node?.current) {
			node.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	const scrollToTop = () => {
		const timeout = setTimeout(() => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
		}, 500)

		return () => clearTimeout(timeout)
	}

	const scrollToBottom = () => {
		const bottom = document.body.scrollHeight

		const timeout = setTimeout(() => {
			window.scrollTo({
				top: bottom,
				behavior: 'smooth'
			})
		}, 500)

		return () => clearTimeout(timeout)
	}

	return {
		scrollIntoView,
		scrollToTop,
		scrollToBottom
	}
}
