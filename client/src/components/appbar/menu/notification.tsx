import { EmojiEmotions } from '@mui/icons-material'
import DoneIcon from '@mui/icons-material/Done'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import React, { MouseEvent, useState } from 'react'

// Enum to define possible invitation statuses
const BOARD_INVITATION_STATUS = {
	PENDING: 'PENDING',
	ACCEPTED: 'ACCEPTED',
	REJECTED: 'REJECTED',
} as const

type BoardInvitationStatus = keyof typeof BOARD_INVITATION_STATUS

interface Notification {
	id: number
	inviter: string
	board: string
	status: BoardInvitationStatus
}

const Notifications: React.FC = () => {
	// State variables with proper types
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [notifications, setNotifications] = useState<Notification[]>([])

	const open = Boolean(anchorEl)

	// Handlers for menu open and close
	const handleClickNotificationIcon = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const updateBoardInvitation = (status: BoardInvitationStatus) => {
		console.log('Updated Status: ', status)
	}

	return (
		<Box>
			<Tooltip title='Notifications'>
				<Badge
					color='error'
					variant='dot'
					sx={{ cursor: 'pointer' }}
					id='basic-button-open-notification'
					aria-controls={open ? 'basic-notification-drop-down' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClickNotificationIcon}
				>
					<NotificationsNoneIcon sx={{ color: 'white' }} />
				</Badge>
			</Tooltip>

			<Menu
				sx={{ mt: 2, height: '400px' }}
				id='basic-notification-drop-down'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
			>
				{notifications.length === 0 ? (
					<Box
						sx={{
							minWidth: 200,
							height: '100%',
							display: 'flex',
							p: 2,
							alignItems: 'center',
						}}
					>
						<EmojiEmotions
							sx={{
								color: 'text.main',
							}}
						/>
						<Typography variant='body2' sx={{ fontSize: '13px', ml: 1 }}>
							You do not have any new notifications.
						</Typography>
					</Box>
				) : (
					notifications.map((notification) => (
						<Box key={notification.id}>
							<Box
								sx={{ minWidth: 200, maxWidth: 360, overflowY: 'auto', p: 2 }}
							>
								<Box
									sx={{
										maxWidth: '100%',
										wordBreak: 'break-word',
										whiteSpace: 'pre-wrap',
										display: 'flex',
										flexDirection: 'column',
										gap: 1,
									}}
								>
									{/* Notification content */}
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
										<Box>
											<GroupAddIcon fontSize='small' />
										</Box>
										<Box>
											<strong>{notification.inviter}</strong> invited you to
											join the board <strong>{notification.board}</strong>
										</Box>
									</Box>

									{/* Action buttons for PENDING notifications */}
									{notification.status === 'PENDING' && (
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 1,
												justifyContent: 'flex-end',
											}}
										>
											<Button
												className='interceptor-loading'
												type='submit'
												variant='contained'
												color='success'
												size='small'
												onClick={(e) => {
													e.stopPropagation()
													updateBoardInvitation(
														BOARD_INVITATION_STATUS.ACCEPTED,
													)
												}}
											>
												Accept
											</Button>
											<Button
												className='interceptor-loading'
												type='submit'
												variant='contained'
												color='error'
												size='small'
												onClick={(e) => {
													e.stopPropagation()
													updateBoardInvitation(
														BOARD_INVITATION_STATUS.REJECTED,
													)
												}}
											>
												Reject
											</Button>
										</Box>
									)}

									{/* Display status when invitation is ACCEPTED or REJECTED */}
									{['ACCEPTED', 'REJECTED'].includes(notification.status) && (
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 1,
												justifyContent: 'flex-end',
											}}
										>
											{notification.status === 'ACCEPTED' && (
												<Chip
													icon={<DoneIcon />}
													label='Accepted'
													color='success'
													size='small'
												/>
											)}
											{notification.status === 'REJECTED' && (
												<Chip
													icon={<NotInterestedIcon />}
													label='Rejected'
													size='small'
												/>
											)}
										</Box>
									)}

									{/* Notification timestamp */}
									<Box sx={{ textAlign: 'right' }}>
										<Typography variant='body2' sx={{ fontSize: '13px' }}>
											{moment().format('llll')}
										</Typography>
									</Box>
								</Box>
							</Box>
							{/* Divider between notifications */}
							{notification.id !==
								notifications[notifications.length - 1].id && <Divider />}
						</Box>
					))
				)}
			</Menu>
		</Box>
	)
}

export default Notifications
