import AddToDrive from '@mui/icons-material/AddToDrive'
import Bolt from '@mui/icons-material/Bolt'
import Dashboard from '@mui/icons-material/Dashboard'
import FilterList from '@mui/icons-material/FilterList'
import Message from '@mui/icons-material/Message'
import NoteAdd from '@mui/icons-material/NoteAdd'
import PersonAdd from '@mui/icons-material/PersonAdd'
import VpnLock from '@mui/icons-material/VpnLock'
import { capitalize, Stack } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createColumnAPI } from '~/apis/board.api'
import { ICreateColumn } from '~/interfaces/board.interface'
import { selectActiveBoard, setActiveBoard } from '~/redux/board/board.slice'
import { useAppDispatch } from '~/redux/store'
import { generatePlaceholderCard } from '~/utils/formatter'
import NewColumnModal from '../create-column'

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

const BoardBar = () => {
	const board = useSelector(selectActiveBoard)

	const [isModalOpen, setModalOpen] = useState(false)

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	const { boardId } = useParams()
	const activeBoard = useSelector(selectActiveBoard)
	const dispatch = useAppDispatch()

	const handleAddColumn = async ({
		title,
		description,
	}: {
		title: string
		description: string
	}) => {
		const data: ICreateColumn = {
			boardId: boardId as string,
			description,
			title,
		}

		const boardClone = structuredClone(activeBoard)
		if (boardClone) {
			const newColumn = await createColumnAPI(data)
			const cardPlacerholder = generatePlaceholderCard(newColumn)

			newColumn.cards = [cardPlacerholder]
			newColumn.cardOrderIds = [cardPlacerholder._id]

			const newColumns = [...boardClone.columns, newColumn]
			const newColumnOrderIds = [...boardClone.columnOrderIds, newColumn._id]
			const newBoard = {
				...boardClone,
				columns: newColumns,
				columnOrderIds: newColumnOrderIds,
			}
			dispatch(setActiveBoard(newBoard))
		}
	}
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
					label={board?.title}
				/>

				<Chip
					sx={MENU_STYLE}
					clickable
					icon={<VpnLock />}
					label={capitalize(board?.type)}
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
				<Stack direction='row' alignItems='center'>
					<Button
						variant='outlined'
						sx={{
							color: 'primary.main',
							fontSize: '12px',
							fontWeight: 400,
							px: 2,
							py: 0.5,
							width: 'fit-content',
							borderColor: '#ececec',
						}}
						startIcon={<NoteAdd />}
						onClick={handleOpenModal}
					>
						New column
					</Button>

					<Button
						startIcon={<PersonAdd />}
						variant='outlined'
						sx={{
							ml: 2,
							px: 2,
							py: 0.5,
							width: 'fit-content',
							color: 'primary.main',
							borderColor: '#ececec',
							fontSize: '12px',
							fontWeight: 400,
						}}
					>
						Invite
					</Button>

					<Button
						startIcon={<Message />}
						variant='outlined'
						sx={{
							ml: 2,
							px: 2,
							py: 0.5,
							width: 'fit-content',
							fontSize: '12px',
							fontWeight: 400,
							color: 'primary.main',
							borderColor: '#ececec',
						}}
					>
						Message
					</Button>
				</Stack>

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

			{isModalOpen && (
				<NewColumnModal
					open={isModalOpen}
					onClose={handleCloseModal}
					onAddColumn={handleAddColumn}
				/>
			)}
		</Box>
	)
}

export default BoardBar
