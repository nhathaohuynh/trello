import Check from '@mui/icons-material/Check'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

export default function Started() {
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
			<Button
				id='basic-button-started'
				aria-controls={open ? 'basic-menu-started' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				sx={{
					color: 'white',
				}}
				endIcon={<ExpandMore />}
			>
				Started
			</Button>
			<Menu
				id='basic-menu-started'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button-started"',
				}}
			>
				<MenuItem>
					<ListItemText inset>Single</ListItemText>
				</MenuItem>
				<MenuItem>
					<ListItemText inset>1.15</ListItemText>
				</MenuItem>
				<MenuItem>
					<ListItemText inset>Double</ListItemText>
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<Check />
					</ListItemIcon>
					Custom: 1.2
				</MenuItem>
				<Divider />
				<MenuItem>
					<ListItemText>Add space before paragraph</ListItemText>
				</MenuItem>
				<MenuItem>
					<ListItemText>Add space after paragraph</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem>
					<ListItemText>Custom spacing...</ListItemText>
				</MenuItem>
			</Menu>
		</Box>
	)
}
