import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import { store } from './redux/store.ts'
import theme from './theme.ts'

import { BrowserRouter } from 'react-router-dom'
import { PATH_APP } from './utils/constants.ts'
createRoot(document.getElementById('root')!).render(
	<BrowserRouter basename={PATH_APP.BASE_NAME}>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
				<ToastContainer position='top-left' theme='colored' />
			</ThemeProvider>
		</Provider>
	</BrowserRouter>,
)
