import { useState } from 'react'

import { Welcome } from '@components/Welcome'
// import { MainSection } from '@components/MainSection'
import { Checkin } from '@components/Checkin'
import { CheckinForm } from '@components/CheckinForm'
import { AddPost } from '@components/AddPost'

const Home = () => {
	const [loaded, setIsLoaded] = useState(true) // default: false

	return !loaded ? (
		<Welcome onSetIsLoaded={setIsLoaded} />
	) : (
		<main>
			{/* <MainSection /> */}
			<Checkin />
			<CheckinForm />
			<AddPost />
		</main>
	)
}

export default Home
