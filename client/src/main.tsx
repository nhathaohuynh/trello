import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ConfirmProvider } from 'material-ui-confirm'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'
import { injectStore } from '~/custom/axios.ts'
import App from './App.tsx'
import { persistor, store } from './redux/store.ts'
import theme from './theme.ts'
import { PATH_APP } from './utils/constants.ts'

// Inject store to axios
injectStore(store)

createRoot(document.getElementById('root')!).render(
	<BrowserRouter basename={PATH_APP.BASE_NAME}>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider theme={theme}>
					<ConfirmProvider
						defaultOptions={{
							cancellationText: 'No',
							confirmationText: 'Yes',
							allowClose: false,
							dialogProps: { maxWidth: 'sm' },
							confirmationButtonProps: {
								variant: 'contained',
								color: 'error',
							},
							cancellationButtonProps: {
								variant: 'contained',
								color: 'inherit',
							},
						}}
					>
						<CssBaseline />
						<App />
						<ToastContainer position='top-left' theme='colored' />
					</ConfirmProvider>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	</BrowserRouter>,
)
