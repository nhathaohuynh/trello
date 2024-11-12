import { NotificationsNone } from '@mui/icons-material'
import Add from '@mui/icons-material/Add'
import AppsIcon from '@mui/icons-material/Apps'
import Close from '@mui/icons-material/Close'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import HelpOutline from '@mui/icons-material/HelpOutline'
import LightMode from '@mui/icons-material/LightMode'
import Search from '@mui/icons-material/Search'
import SettingsBrightness from '@mui/icons-material/SettingsBrightness'
import SplitscreenIcon from '@mui/icons-material/Splitscreen'
import {
	InputAdornment,
	TextField,
	Tooltip,
	Typography,
	useColorScheme,
} from '@mui/material'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { PATH_APP } from '~/utils/constants'
import SelectItem from '../cores/select'
import Profile from './menu/profile'
import Recent from './menu/recent'
import Started from './menu/started'
import Template from './menu/template'
import WorkSpace from './menu/workspace'

function Appbar() {
	const { mode, setMode } = useColorScheme()
	const items = [
		{ value: 'light', label: 'Light', icon: LightMode },
		{ value: 'dark', label: 'Dark', icon: DarkModeOutlined },
		{ value: 'system', label: 'System', icon: SettingsBrightness },
	]
	const handleOnChnage = (value: string) => {
		setMode(value as 'light' | 'dark' | 'system')
	}
	const navigate = useNavigate()

	return (
		<Box
			sx={{
				width: '100%',
				paddingX: 3,
				height: (theme) => theme.appSetting.appBarHeight,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: 2,
				overflowX: 'auto',
				overflowY: 'hidden',
				'&::-webkit-scrollbar-track': {
					m: 3,
				},
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<AppsIcon
					sx={{
						color: 'primary.main',
					}}
				/>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 0.5,
						'&:hover': {
							cursor: 'pointer',
						},
					}}
					onClick={() => navigate(PATH_APP.DASHBOARD)}
				>
					<SplitscreenIcon
						fontSize='small'
						sx={{
							color: 'primary.main',
						}}
					/>

					<Typography
						variant='h1'
						sx={{
							fontSize: '1.2rem',
							fontWeight: 'bold',
							color: 'primary.main',
							textTransform: 'uppercase',
						}}
					>
						Trello
					</Typography>
				</Box>
				<Box
					sx={{
						display: { xs: 'none', md: 'flex' },
						alignItems: 'center',
						gap: 1,
					}}
				>
					<WorkSpace />
					<Recent />
					<Started />
					<Template />
					<Button
						startIcon={<Add />}
						variant='outlined'
						sx={{
							paddingX: 2,
							paddingY: 0.5,
							textTransform: 'Uppercase',
							color: 'primary.mainChannel',
							borderColor: 'primary.mainChannel',
						}}
					>
						Create
					</Button>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<TextField
					sx={{
						minWidth: '120px',
						'& .MuiOutlinedInput-root': {
							'&:hover fieldset': {
								borderColor: 'primary.mainChannel',
							},

							'&.Mui-focused fieldset': {
								borderColor: 'primary.mainChannel',
							},
						},
					}}
					id='outlined-multiline-flexible'
					size='small'
					placeholder='Search Trello'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<Search sx={{ color: 'primary' }} />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position='end'>
								<Close sx={{ color: 'primary' }} />
							</InputAdornment>
						),
					}}
				/>
				<SelectItem
					label='Mode'
					value={mode ?? 'light'}
					items={items}
					onChange={handleOnChnage}
				/>

				<Tooltip title='Notifications'>
					<Badge color='secondary' variant='dot' sx={{ cursor: 'pointer' }}>
						<NotificationsNone />
					</Badge>
				</Tooltip>

				<Tooltip title='Help'>
					<HelpOutline sx={{ cursor: 'pointer' }} />
				</Tooltip>

				<Profile />
			</Box>
		</Box>
	)
}

export default Appbar
