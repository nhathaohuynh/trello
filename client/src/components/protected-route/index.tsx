import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectCurrentUser } from '~/redux/user/user.slice'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const user = useSelector(selectCurrentUser)

	let location = useLocation()

	if (!user) {
		return <Navigate to='/login' state={{ from: location }} replace />
	}
	return children
}

export default ProtectedRoute
