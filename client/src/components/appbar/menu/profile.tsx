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
import { useConfirm } from 'material-ui-confirm'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '~/redux/store'
import { selectCurrentUser, userLogout } from '~/redux/user/user.slice'
import { PATH_APP } from '~/utils/constants'

export default function Profile() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const confirm = useConfirm()
	const dispatch = useAppDispatch()
	const currentUser = useSelector(selectCurrentUser)
	const navigate = useNavigate()

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClickMenuItem = (navigatPath?: string) => {
		setAnchorEl(null)
		if (navigatPath) {
			return navigate(navigatPath)
		}
	}
	const handleLogout = async () => {
		confirm({
			title: 'Sign out!',
			description: 'Are you sure you want to sign out?',
		})
			.then(() => {
				handleClickMenuItem()
				dispatch(userLogout({ showSuccessMessage: true }))
			})
			.catch(() => {})
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
				<Avatar sx={{ width: 32, height: 32 }} src={currentUser?.avatar}>
					{currentUser?.username}
				</Avatar>
			</IconButton>
			<Menu
				id='basic-menu-profile'
				anchorEl={anchorEl}
				open={open}
				onClose={() => handleClickMenuItem()}
				MenuListProps={{
					'aria-labelledby': 'basic-button-profile"',
				}}
			>
				<MenuItem onClick={() => handleClickMenuItem(PATH_APP.SETTING_ACCOUNT)}>
					<Avatar
						sx={{ width: '28px', height: '28px', mr: 2 }}
						src={currentUser?.avatar}
					/>
					{currentUser?.username}
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => handleClickMenuItem()}>
					<ListItemIcon>
						<PersonAdd fontSize='small' />
					</ListItemIcon>
					Add another account
				</MenuItem>
				<MenuItem onClick={() => handleClickMenuItem()}>
					<ListItemIcon>
						<Settings fontSize='small' />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<Logout fontSize='small' />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</Box>
	)
}
