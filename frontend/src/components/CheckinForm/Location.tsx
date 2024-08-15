import { forwardRef, memo } from 'react'
import { TextField } from '@mui/material'

const Location = forwardRef<
	HTMLInputElement,
	React.ComponentPropsWithoutRef<typeof TextField>
>((props, ref) => {
	return (
		<TextField
			ref={ref}
			variant='standard'
			label='Nơi checkin'
			placeholder='VD: Paris tower'
			size='small'
			sx={{ marginBottom: 2 }}
			fullWidth
			onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
			{...props}
		/>
	)
})

export default memo(Location)
