import { Lock } from '@mui/icons-material'
import { Box, Paper, Typography, Zoom } from '@mui/material'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectCurrentUser } from '~/redux/user/user.slice'
import { PATH_APP } from '~/utils/constants'
import FormLogin from './components/login-form'
import FormRegister from './components/register-form'

const AuthPage = () => {
	const location = useLocation()
	const isLogin = location.pathname === PATH_APP.LOGIN
	const isRegister = location.pathname === PATH_APP.REGISTER
	const user = useSelector(selectCurrentUser)

	if (user) {
		return <Navigate to='/' replace={true} />
	}

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
				backgroundImage:
					'url("https://www.seti.org/sites/default/files/2022-01/Free-floating-Planets-Abound-in-Milky-Way-1-11-22.jpg")',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				position: 'relative',
				zIndex: 1,
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					bgcolor: 'rgba(0, 0, 0, 0.5)', // Adds a dark overlay
					zIndex: -1,
				},
			}}
		>
			<Zoom in style={{ transitionDelay: '300ms' }}>
				<Paper
					elevation={3}
					sx={{
						padding: 4,
						width: { xs: '100%', sm: '450px' },
						textAlign: 'center',
						bgcolor: 'background.paper',
						borderRadius: 2,
						opacity: 0.95,
					}}
				>
					{isLogin && (
						<Zoom in style={{ transitionDelay: '300ms' }}>
							<Box>
								<Lock sx={{ color: 'primary.mainChannel', fontSize: '40px' }} />

								<Typography variant='body1' sx={{ mb: 2 }}>
									Author: NhatHaoDev
								</Typography>
								<FormLogin />
							</Box>
						</Zoom>
					)}
					{isRegister && (
						<Zoom in style={{ transitionDelay: '300ms' }}>
							<Box>
								<Lock sx={{ color: 'primary.mainChannel', fontSize: '40px' }} />

								<Typography variant='body1' sx={{ mb: 2 }}>
									Author: NhatHaoDev
								</Typography>
								<FormRegister />
							</Box>
						</Zoom>
					)}
				</Paper>
			</Zoom>
		</Box>
	)
}

export default AuthPage
