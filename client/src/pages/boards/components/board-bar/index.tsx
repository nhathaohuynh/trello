import AddToDrive from '@mui/icons-material/AddToDrive'
import Bolt from '@mui/icons-material/Bolt'
import Dashboard from '@mui/icons-material/Dashboard'
import FilterList from '@mui/icons-material/FilterList'
import PersonAdd from '@mui/icons-material/PersonAdd'
import VpnLock from '@mui/icons-material/VpnLock'
import { capitalize } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { BoardType } from '~/apis/mock-data'

const MENU_STYLE = {
	padding: 1,
	color: 'primary.main',
	bgcolor: 'primary.secondary',
	border: 'none',
	borderRadius: '4px',
	'& .MuiSvgIcon-root': {
		color: 'primary.main',
	},
	'&:hover': {
		bgcolor: 'primary.50',
	},
}

interface BoardBarProps {
	board: BoardType
}

const BoardBar = ({ board }: BoardBarProps) => {
	return (
		<Box
			sx={{
				width: '100%',
				height: (theme) => theme.appSetting.boardBarHeight,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				paddingX: 3,
				gap: 2,

				overflowX: 'auto',
				overflowY: 'hidden',
				'&::-webkit-scrollbar-track': {
					m: 3,
				},
			}}
		>
			{/* left  */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 2,
				}}
			>
				<Chip
					sx={MENU_STYLE}
					clickable
					icon={<Dashboard />}
					label={board.title}
				/>

				<Chip
					sx={MENU_STYLE}
					clickable
					icon={<VpnLock />}
					label={capitalize(board.type)}
				/>

				<Chip
					sx={MENU_STYLE}
					clickable
					icon={<AddToDrive />}
					label='Add to Google Drive'
				/>

				<Chip sx={MENU_STYLE} clickable icon={<Bolt />} label='Automations' />
				<Chip sx={MENU_STYLE} clickable icon={<FilterList />} label='Filters' />
			</Box>

			{/* right  */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 2,
				}}
			>
				<Button
					startIcon={<PersonAdd />}
					variant='outlined'
					sx={{
						paddingX: 3,
						paddingY: 0.5,
						color: 'primary.mainChannel',
						borderColor: 'primary.mainChannel',
					}}
				>
					Invite
				</Button>

				<AvatarGroup
					max={7}
					sx={{
						'& .MuiAvatar-root': {
							width: '32px',
							height: '32px',
							border: 'none',
							color: 'white',
							cursor: 'pointer',
							fontSize: '13px',
							'&:first-of-type': {
								bgcolor: '#a4b0de',
							},
						},
					}}
				>
					<Tooltip title='Huynh Nhat Hao'>
						<Avatar
							alt='Remy Sharp'
							src='https://th.bing.com/th/id/OIP.iaSkdG5ClYhuJycAh1wWJwHaLH?pid=ImgDet&w=199&h=298&c=7'
						/>
					</Tooltip>
					<Tooltip title='Huynh Nhat Hao'>
						<Avatar
							alt='Remy Sharp'
							src='https://th.bing.com/th/id/OIP.soF0DDqRXG9P_rrbbN6EpgHaJ4?pid=ImgDet&w=199&h=265&c=7'
						/>
					</Tooltip>
					<Tooltip title='Huynh Nhat Hao'>
						<Avatar
							alt='Remy Sharp'
							src='https://th.bing.com/th/id/OIP.DM5QHt-pDCaxtPtdfOQR8gHaJQ?pid=ImgDet&w=199&h=248&c=7'
						/>
					</Tooltip>
					<Tooltip title='Huynh Nhat Hao'>
						<Avatar
							alt='Remy Sharp'
							src='https://th.bing.com/th/id/OIP.w0x35GFdhw9qxSJeyoGIoQHaJV?pid=ImgDet&w=199&h=250&c=7'
						/>
					</Tooltip>

					<Tooltip title='Huynh Nhat Hao'>
						<Avatar
							alt='Remy Sharp'
							src='https://th.bing.com/th/id/OIP.iaSkdG5ClYhuJycAh1wWJwHaLH?pid=ImgDet&w=199&h=298&c=7'
						/>
					</Tooltip>
					<Tooltip title='Huynh Nhat Hao'>
						<Avatar
							alt='Remy Sharp'
							src='https://th.bing.com/th/id/OIP.soF0DDqRXG9P_rrbbN6EpgHaJ4?pid=ImgDet&w=199&h=265&c=7'
						/>
					</Tooltip>
					<Tooltip title='Huynh Nhat Hao'>
						<Avatar
							alt='Remy Sharp'
							src='https://th.bing.com/th/id/OIP.DM5QHt-pDCaxtPtdfOQR8gHaJQ?pid=ImgDet&w=199&h=248&c=7'
						/>
					</Tooltip>
					<Tooltip title='Huynh Nhat Hao'>
						<Avatar
							alt='Remy Sharp'
							src='https://th.bing.com/th/id/OIP.w0x35GFdhw9qxSJeyoGIoQHaJV?pid=ImgDet&w=199&h=250&c=7'
						/>
					</Tooltip>
				</AvatarGroup>
			</Box>
		</Box>
	)
}

export default BoardBar
