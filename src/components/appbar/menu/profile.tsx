import Logout from '@mui/icons-material/Logout'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { useState } from 'react'

export default function Profile() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Box>
			<IconButton
				onClick={handleClick}
				size='small'
				aria-controls={open ? 'basic-menu-profile' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
			>
				<Avatar
					sx={{ width: 32, height: 32 }}
					src='https://images.unsplash.com/photo-1588001832198-c15cff59b078?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9'
				>
					Nhat Hao
				</Avatar>
			</IconButton>
			<Menu
				id='basic-menu-profile'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button-profile"',
				}}
			>
				<MenuItem onClick={handleClose}>
					<Avatar sx={{ width: '28px', height: '28px', mr: 2 }} /> Profile
				</MenuItem>

				<MenuItem onClick={handleClose}>
					<Avatar sx={{ width: '28px', height: '28px', mr: 2 }} /> My account
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<PersonAdd fontSize='small' />
					</ListItemIcon>
					Add another account
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Settings fontSize='small' />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Logout fontSize='small' />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</Box>
	)
}
