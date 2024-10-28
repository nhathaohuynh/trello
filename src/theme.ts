import { blue, deepOrange, grey } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
	interface Theme {
		appSetting: {
			appBarHeight: string
			boardBarHeight: string
			boardBarContentHeight: string
			columnHeaderHeight: string
			columnFooterHeight: string
			columnContentHeight: string
		}
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		appSetting: {
			appBarHeight: string
			boardBarHeight: string
			boardBarContentHeight: string
			columnHeaderHeight: string
			columnFooterHeight: string
			columnContentHeight: string
		}
	}
}

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_BAR_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '40px'
const COLUMN_FOOTER_HEIGHT = '40px'
const COLUMN_CONTENT_HEIGHT = `calc(${BOARD_BAR_CONTENT_HEIGHT} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`

const theme = createTheme({
	appSetting: {
		appBarHeight: APP_BAR_HEIGHT,
		boardBarHeight: BOARD_BAR_HEIGHT,
		boardBarContentHeight: BOARD_BAR_CONTENT_HEIGHT,
		columnHeaderHeight: COLUMN_HEADER_HEIGHT,
		columnFooterHeight: COLUMN_FOOTER_HEIGHT,
		columnContentHeight: COLUMN_CONTENT_HEIGHT,
	},
	typography: {
		fontFamily: 'Poppins, sans-serif',
	},
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: '#000',
					mainChannel: blue[600],
				},
				secondary: deepOrange,
			},
		},
		dark: {
			palette: {
				primary: {
					main: '#f3f3f3',
					mainChannel: blue[600],
				},
				secondary: deepOrange,
			},
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					'*::-webkit-scrollbar': {
						width: '5px',
						height: '6px',
					},
					'*::-webkit-scrollbar-thumb': {
						backgroundColor: blue[600],
						borderRadius: '4px',
					},
					'*::-webkit-scrollbar-thumb:hover': {
						transition: 'all 0.3s ease',
						backgroundColor: blue[800],
					},
				},
			},
		},

		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},

		MuiInputLabel: {
			styleOverrides: {
				root: () => ({
					fontSize: '0.875rem',
				}),
			},
		},

		MuiTypography: {
			styleOverrides: {
				root: {
					'&.MuiTypography-body2': {
						fontSize: '0.8rem',
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: ({ theme }) => {
					if (theme.palette.mode === 'dark') {
						return {
							// color: theme.palette.primary.main,
							fontSize: '0.875rem',
							'.MuiOutlinedInput-notchedOutline': {
								borderColor: '#333643',
							},

							'&:hover .MuiOutlinedInput-notchedOutline': {
								borderColor: theme.palette.primary.main,
							},
							'& fieldset': {
								borderWidth: '1px !important',
							},
						}
					}
					return {
						// color: theme.palette.primary.main,
						fontSize: '0.875rem',
						'.MuiOutlinedInput-notchedOutline': {
							borderColor: grey[300],
						},

						'&:hover .MuiOutlinedInput-notchedOutline': {
							borderColor: theme.palette.primary.main,
						},
						'& fieldset': {
							borderWidth: '1px !important',
						},
					}
				},
			},
		},
	},
})

export default theme
