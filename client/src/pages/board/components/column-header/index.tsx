import { Update } from '@mui/icons-material'
import AddCard from '@mui/icons-material/AddCard'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Delete from '@mui/icons-material/Delete'
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
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
	createCardAPI,
	deleteColumnAPI,
	updateColumnAPI,
} from '~/apis/board.api'
import ToggleFocusInput from '~/components/cores/focus-input'
import { selectActiveBoard, setActiveBoard } from '~/redux/board/board.slice'
import { useAppDispatch } from '~/redux/store'
import CardModal from '../card-modal'

interface props {
	title: string
	columnId: string
}

const HeaderColumn = ({ title, columnId }: props) => {
	const confirm = useConfirm()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const activeBoard = useSelector(selectActiveBoard)
	const open = Boolean(anchorEl)
	const dispatch = useAppDispatch()

	const [isModalOpen, setModalOpen] = useState(false)

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	const handleCreateNewCard = (data: { title: string; coverImage?: File }) => {
		if (data.title === '') {
			toast.error('Title is required')
			return
		}

		const formData = new FormData()

		if (data.coverImage) {
			formData.append('cover', data.coverImage)
		}

		formData.append('title', data.title)
		formData.append('columnId', columnId)

		toast
			.promise(createCardAPI(formData), {
				pending: 'Creating...',
				success: 'New card created',
			})
			.then((newCard) => {
				handleCloseModal()
				handleClose()
				const boardClone = structuredClone(activeBoard)
				const newColumns = boardClone.columns.map((column) => {
					if (column._id === columnId) {
						column.cards = [...column.cards, newCard]
						column.cardOrderIds = [...column.cardOrderIds, newCard._id]
						column.cards = column.cards.filter((card) => !card?.FE_PLACEHOLDER)
						column.cardOrderIds = column.cards
							.filter((card) => !card?.FE_PLACEHOLDER)
							.map((card) => card._id)
					}

					return column
				})

				const newBoard = {
					...boardClone,
					columns: newColumns,
				}

				dispatch(setActiveBoard(newBoard))
			})
	}

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleDeleteColumn = () => {
		const coloumn = activeBoard.columns.find(
			(column) => column._id === columnId,
		)

		if (!coloumn) {
			toast.error('Cannot delete column not exist')
			return setAnchorEl(null)
		}

		if (!coloumn?.cards[0]?.FE_PLACEHOLDER) {
			toast.error(
				'Cannot delete column with cards. Please remove all cards before delete column',
			)
			return setAnchorEl(null)
		}

		confirm({
			title: 'Delete Column?',
			description: 'Are you sure you want to delete this column',
			confirmationText: 'Delete',
		}).then(() => {
			const boardClone = structuredClone(activeBoard)
			const newColumns = boardClone.columns.filter(
				(column) => column._id !== columnId,
			)

			const newBoard = {
				...boardClone,
				columns: newColumns,
			}

			dispatch(setActiveBoard(newBoard))
			deleteColumnAPI(columnId)
			setAnchorEl(null)
		})
	}

	const onUpdateColumnTitle = (title: string) => {
		const boardClone = structuredClone(activeBoard)
		const newColumns = boardClone.columns.map((column) => {
			if (column._id === columnId) {
				column.title = title
			}

			return column
		})

		const newBoard = {
			...boardClone,
			columns: newColumns,
		}

		dispatch(setActiveBoard(newBoard))

		updateColumnAPI(columnId, { title })
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
			<ToggleFocusInput value={title} onChangedValue={onUpdateColumnTitle} />

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
					sx={{
						'& span': {
							color: 'text.secondary',
							fontSize: '0.875rem',
						},
					}}
				>
					<MenuItem onClick={handleOpenModal}>
						<ListItemIcon>
							<AddCard fontSize='small' />
						</ListItemIcon>
						<ListItemText>Add card</ListItemText>
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
					<MenuItem
						onClick={handleDeleteColumn}
						sx={{
							'& span': {
								color: 'error.main',
							},
						}}
					>
						<ListItemIcon>
							<Delete
								fontSize='small'
								sx={{
									color: 'error.main',
								}}
							/>
						</ListItemIcon>
						<ListItemText>Remove column</ListItemText>
					</MenuItem>
				</Menu>
			</Box>

			{isModalOpen && (
				<CardModal
					open={isModalOpen}
					onClose={handleCloseModal}
					onSubmitData={handleCreateNewCard}
				/>
			)}
		</Box>
	)
}

export default HeaderColumn
