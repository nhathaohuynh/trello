import { Box, CircularProgress, Typography } from '@mui/material'

interface LoadingProps {
	message?: string
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
				textAlign: 'center',
				bgcolor: 'background.default',
				color: 'text.primary',
				p: 3,
			}}
		>
			<CircularProgress
				size={60}
				sx={{
					color: 'primary.mainChannel',
				}}
			/>
			{message && (
				<Typography variant='body1' sx={{ mt: 2 }}>
					{message}
				</Typography>
			)}
		</Box>
	)
}

export default Loading
