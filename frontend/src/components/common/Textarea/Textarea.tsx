import React, { forwardRef } from 'react'

import styles from './style.module.css'

type Props = React.ComponentPropsWithRef<'textarea'>

const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
	return (
		<textarea
			{...props}
			ref={ref}
			className={styles.textarea}
		/>
	)
})

export default Textarea
