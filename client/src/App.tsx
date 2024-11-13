import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/protected-route'
import VerificationToken from './components/verify-token'
import AuthPage from './pages/auth'
import Board from './pages/board'
import DashboardPage from './pages/dashboard'
import NotFound from './pages/not-found'
import Setting from './pages/setting'
import { PATH_APP } from './utils/constants'

function App() {
	return (
		<Routes>
			<Route
				path={PATH_APP.BASE_NAME}
				element={<Navigate to={PATH_APP.DASHBOARD} replace={true} />}
			/>
			<Route
				path={PATH_APP.SETTING_ACCOUNT}
				element={
					<ProtectedRoute>
						<Setting />
					</ProtectedRoute>
				}
			/>
			<Route
				path={PATH_APP.SETTING_SECURITY}
				element={
					<ProtectedRoute>
						<Setting />
					</ProtectedRoute>
				}
			/>

			<Route path={PATH_APP.LOGIN} element={<AuthPage />} />
			<Route path={PATH_APP.REGISTER} element={<AuthPage />} />
			<Route
				path={PATH_APP.VERIFICATION_TOKEN}
				element={<VerificationToken />}
			/>

			<Route
				path={PATH_APP.DASHBOARD}
				element={
					<ProtectedRoute>
						<DashboardPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path={PATH_APP.BOARD_DETAIL}
				element={
					<ProtectedRoute>
						<Board />
					</ProtectedRoute>
				}
			/>
			<Route path={PATH_APP.NOT_FOUND} element={<NotFound />} />
		</Routes>
	)
}

export default App
