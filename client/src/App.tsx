import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth'
import Board from './pages/boards'
import NotFoundPage from './pages/not-found'
import { PATH_APP } from './utils/constants'

function App() {
	return (
		<Routes>
			<Route
				path={PATH_APP.BASE_NAME}
				element={
					<Navigate to='boards/672de19a44ebcf44ee13d514' replace={true} />
				}
			/>
			<Route path={PATH_APP.BOARD_DETAIL} element={<Board />} />
			<Route path={PATH_APP.LOGIN} element={<AuthPage />} />
			<Route path={PATH_APP.REGISTER} element={<AuthPage />} />

			<Route path={PATH_APP.NOT_FOUND} element={<NotFoundPage />} />
		</Routes>
	)
}

export default App
