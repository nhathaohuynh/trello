import AddCard from '@mui/icons-material/AddCard'
import DragHandle from '@mui/icons-material/DragHandle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

const FooterColumn = () => {
	return (
		<Box
			sx={{
				height: (theme) => theme.appSetting.columnFooterHeight,
				p: 2,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Button sx={{ color: 'primary.mainChannel' }} startIcon={<AddCard />}>
				Add new card
			</Button>

			<Tooltip title='Add new card'>
				<Button size='small' sx={{ color: 'primary.mainChannel' }}>
					<DragHandle sx={{ cursor: 'pointer' }} />
				</Button>
			</Tooltip>
		</Box>
	)
}

export default FooterColumn
