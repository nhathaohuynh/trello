import Box from '@mui/material/Box'

const BoardContent = () => {
	return (
		<Box
			sx={{
				bakcgroundColor: 'primary.main',
				width: '100%',
				display: 'flex',
				height: (theme) =>
					`calc(100vh - ${theme.appSetting.appBarHeight} - ${theme.appSetting.boardBarHeight})`,
				alignItems: 'center',
			}}
		>
			Content
		</Box>
	)
}

export default BoardContent
