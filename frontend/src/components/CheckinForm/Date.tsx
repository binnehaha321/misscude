import { forwardRef, memo } from 'react'
import { TextField } from '@mui/material'

const Date = forwardRef<
	HTMLInputElement,
	React.ComponentPropsWithoutRef<typeof TextField>
>((props, ref) => {
	return (
		<TextField
			{...props}
			ref={ref}
			type='date'
			variant='standard'
			label='Ngày checkin'
			size='small'
			sx={{ marginBottom: 2 }}
			fullWidth
			InputLabelProps={{ shrink: true }}
		/>
	)
})

export default memo(Date)
