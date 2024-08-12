import mainCouple from '@assets/main.svg'

import styles from './style.module.css'

const MainSection = () => {
	return (
		<section className={styles['main-section']}>
			<img
				src={mainCouple}
				alt='bin-and-cu'
				className={styles.main}
			/>
		</section>
	)
}

export default MainSection
