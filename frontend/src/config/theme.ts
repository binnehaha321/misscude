import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	typography: {
		fontFamily: ['Be Vietnam Pro', 'sans-serif'].join(','),
		fontSize: 12
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				input: ({ theme }) => ({
					[theme.breakpoints.down('md')]: {
						fontSize: 16,
						'&::placeholder': {
							fontSize: 16
						}
					}
				})
			}
		}
	}
})

export { theme }
