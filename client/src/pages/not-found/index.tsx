import { Box, Button, Fade, Typography, Zoom } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
	const navigate = useNavigate()

	const handleGoHome = () => {
		navigate('/')
	}

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				textAlign: 'center',
				color: 'text.primary',
				position: 'relative',
				overflow: 'hidden',
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					width: '200%',
					height: '200%',
					background:
						'linear-gradient(120deg, #89f7fe, #66a6ff, #8e44ad, #c0392b)',
					backgroundSize: '400% 400%',
					animation: 'gradientBackground 15s ease infinite',
					zIndex: -1,
					opacity: 0.3,
				},
				'@keyframes gradientBackground': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
				padding: 3,
			}}
		>
			<Fade in timeout={1000}>
				<Box>
					<Zoom in style={{ transitionDelay: '300ms' }}>
						<Typography
							variant='h1'
							component='div'
							sx={{ fontSize: { xs: 100, md: 160 } }}
						>
							404
						</Typography>
					</Zoom>
					<Fade in timeout={1500}>
						<Typography variant='h5' sx={{ mb: 2 }}>
							Oops! The page you're looking for doesn't exist.
						</Typography>
					</Fade>
					<Fade in timeout={2000}>
						<Typography variant='body1' sx={{ mb: 4 }}>
							It seems you may have taken a wrong turn. Let's get you back on
							track.
						</Typography>
					</Fade>
					<Fade in timeout={2500}>
						<Button
							variant='contained'
							color='primary'
							onClick={handleGoHome}
							sx={{ textTransform: 'none' }}
						>
							Go to Home
						</Button>
					</Fade>
				</Box>
			</Fade>
		</Box>
	)
}

export default NotFoundPage
