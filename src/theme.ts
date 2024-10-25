import { cyan, orange } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
	interface Theme {
		appSetting: {
			appBarHeight: string
			boardBarHeight?: string
		}
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		appSetting: {
			appBarHeight: string
			boardBarHeight: string
		}
	}
}

const theme = createTheme({
	appSetting: {
		appBarHeight: '48px',
		boardBarHeight: '58px',
	},
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: '#2b43fd',
				},
				secondary: {
					main: '#5856fe',
				},
			},
		},
		dark: {
			palette: {
				primary: cyan,
				secondary: orange,
			},
		},
	},
})

export default theme
