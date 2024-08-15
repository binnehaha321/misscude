import { createTheme } from '@mui/material/styles'
import { pinkPalette } from './palette'

const theme = createTheme({
	typography: {
		fontFamily: ['Be Vietnam Pro', 'sans-serif'].join(','),
		fontSize: 12
	},
	palette: pinkPalette,
	components: {
		MuiInputBase: {
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
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					color: pinkPalette.primary.main // Default color for all IconButtons
				}
			}
		}
	}
})

export { theme }
