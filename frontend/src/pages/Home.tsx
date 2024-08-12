import { useEffect, useState } from 'react'

import { Welcome } from '@components/Welcome'
import { MainSection } from '@components/MainSection'
import { Checkin } from '@components/Checkin'
import { CheckinForm } from '@components/CheckinForm'
import { AddPost } from '@components/AddPost'
import { useScroll } from '@hooks/useScroll'

const Home = () => {
	const [loaded, setIsLoaded] = useState(true) // default: false
	const { scrollToTop } = useScroll()

	useEffect(() => {
		scrollToTop()
	}, [scrollToTop])

	return !loaded ? (
		<Welcome onSetIsLoaded={setIsLoaded} />
	) : (
		<main>
			<MainSection />
			<Checkin />
			<CheckinForm />
			<AddPost />
		</main>
	)
}

export default Home
