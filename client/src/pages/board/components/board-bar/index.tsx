import AddToDrive from '@mui/icons-material/AddToDrive'
import Bolt from '@mui/icons-material/Bolt'
import Dashboard from '@mui/icons-material/Dashboard'
import FilterList from '@mui/icons-material/FilterList'
import Message from '@mui/icons-material/Message'
import NoteAdd from '@mui/icons-material/NoteAdd'
import VpnLock from '@mui/icons-material/VpnLock'
import { capitalize, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createColumnAPI } from '~/apis/board.api'
import { ICreateColumn } from '~/interfaces/board.interface'
import { selectActiveBoard, setActiveBoard } from '~/redux/board/board.slice'
import { useAppDispatch } from '~/redux/store'
import { generatePlaceholderCard } from '~/utils/formatter'
import NewColumnModal from '../create-column'
import InviteBoardUser from '../invation'
import BoardUserGroup from '../user-group/user-group'

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
	const boardUsers = activeBoard?.ownerIds.concat(activeBoard?.memberIds)
	const dispatch = useAppDispatch()

	const handleAddColumn = async ({ title }: { title: string }) => {
		const data: ICreateColumn = {
			boardId: boardId as string,
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
					label={board?.type && capitalize(board?.type)}
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
							fontWeight: 500,
							px: 2,
							py: 0.8,
							width: 'fit-content',
							bgcolor: (theme) =>
								theme.palette.mode === 'dark' ? '#FFFFFF29' : '#00000014',
							border: 'none',
						}}
						startIcon={<NoteAdd />}
						onClick={handleOpenModal}
					>
						New column
					</Button>

					<InviteBoardUser boardId={activeBoard?._id} />

					<Button
						startIcon={<Message />}
						variant='outlined'
						sx={{
							ml: 2,
							px: 2,
							py: 0.8,
							width: 'fit-content',
							fontSize: '12px',
							fontWeight: 500,
							color: 'primary.main',
							bgcolor: (theme) =>
								theme.palette.mode === 'dark' ? '#FFFFFF29' : '#00000014',
							border: 'none',
						}}
					>
						Message
					</Button>
				</Stack>
				<BoardUserGroup boardUsers={boardUsers} />
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
