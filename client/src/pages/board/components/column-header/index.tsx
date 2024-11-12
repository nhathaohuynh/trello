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
import { selectActiveBoard } from '~/redux/board/board.slice'
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

	const [isModalOpen, setModalOpen] = useState(false)

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	const handleCreateNewCard = (data: { title: string; coverImage?: File }) => {
		console.log(data)

		handleCloseModal()
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

		if (coloumn?.cards && coloumn?.cards.length > 0) {
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
					<MenuItem onClick={handleDeleteColumn}>
						<ListItemIcon>
							<Delete fontSize='small' />
						</ListItemIcon>
						<ListItemText>Remove this column</ListItemText>
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
