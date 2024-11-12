import AddCard from '@mui/icons-material/AddCard'

import Cloud from '@mui/icons-material/Cloud'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteForever from '@mui/icons-material/DeleteForever'
import ExpandMore from '@mui/icons-material/ExpandMore'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useConfirm } from 'material-ui-confirm'
import { useState } from 'react'

interface props {
	title: string
}

const HeaderColumn = ({ title }: props) => {
	const confirm = useConfirm()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleDeleteColumn = () => {
		confirm({
			title: 'Delete Column?',
			description: 'Are you sure you want to delete this column',
		}).then(() => {
			setAnchorEl(null)
		})
	}
	return (
		<Box
			sx={{
				height: (theme) => theme.appSetting.columnHeaderHeight,
				p: 2,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				bgcolor: 'primary.mainChannel',
				borderTopLeftRadius: '6px',
				borderTopRightRadius: '6px',
			}}
		>
			<Button>
				<Typography
					variant='body1'
					sx={{
						fontWeight: 500,
						cursor: 'pointer',
						color: '#ffffff',
						pointerEvents: 'none',
					}}
				>
					{title}
				</Typography>
			</Button>

			<Box>
				<Tooltip title='More options'>
					<Button
						id='basic-column-dropdown'
						aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
						endIcon={<ExpandMore />}
						size='small'
						sx={{
							color: '#ffffff',
						}}
					></Button>
				</Tooltip>

				<Menu
					id='basic-menu-column-dropdown'
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-column-dropdown',
					}}
				>
					<MenuItem>
						<ListItemIcon>
							<AddCard fontSize='small' />
						</ListItemIcon>
						<ListItemText>Add new card</ListItemText>
						<Typography variant='body2' sx={{ color: 'text.secondary' }}>
							⌘N
						</Typography>
					</MenuItem>
					<MenuItem>
						<ListItemIcon>
							<ContentCut fontSize='small' />
						</ListItemIcon>
						<ListItemText>Cut</ListItemText>
						<Typography variant='body2' sx={{ color: 'text.secondary' }}>
							⌘X
						</Typography>
					</MenuItem>
					<MenuItem>
						<ListItemIcon>
							<ContentCopy fontSize='small' />
						</ListItemIcon>
						<ListItemText>Coppy</ListItemText>
						<Typography variant='body2' sx={{ color: 'text.secondary' }}>
							⌘C
						</Typography>
					</MenuItem>
					<MenuItem>
						<ListItemIcon>
							<ContentPaste fontSize='small' />
						</ListItemIcon>
						<ListItemText>Paste</ListItemText>
						<Typography variant='body2' sx={{ color: 'text.secondary' }}>
							⌘V
						</Typography>
					</MenuItem>
					<Divider />
					<MenuItem>
						<ListItemIcon>
							<Cloud fontSize='small' />
						</ListItemIcon>
						<ListItemText>Archive this column</ListItemText>
					</MenuItem>
					<MenuItem onClick={handleDeleteColumn}>
						<ListItemIcon>
							<DeleteForever fontSize='small' />
						</ListItemIcon>
						<ListItemText>Remove this column</ListItemText>
					</MenuItem>
				</Menu>
			</Box>
		</Box>
	)
}

export default HeaderColumn
