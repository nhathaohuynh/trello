import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import theme from './theme.ts'

createRoot(document.getElementById('root')!).render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<App />
		<ToastContainer position='top-left' theme='colored' />
	</ThemeProvider>,
)
