import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Attachment from '@mui/icons-material/Attachment'
import Comment from '@mui/icons-material/Comment'
import Delete from '@mui/icons-material/Delete'
import Group from '@mui/icons-material/Group'
import Update from '@mui/icons-material/Update'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useConfirm } from 'material-ui-confirm'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteCardAPI } from '~/apis/board.api'
import { ICard } from '~/interfaces/board.interface'
import { selectActiveBoard, setActiveBoard } from '~/redux/board/board.slice'
import { updateActiveCard } from '~/redux/card/active-card.slice'
import { useAppDispatch } from '~/redux/store'

interface props {
	card: ICard
}
function CardItem({ card }: props) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: card?._id, data: { ...card } })

	const dndkitCardStyle = {
		touchAction: 'none',
		transform: CSS.Translate.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	}
	const board = useSelector(selectActiveBoard)
	const dispatch = useAppDispatch()
	const confirm = useConfirm()

	const handleDeleteCard = () => {
		confirm({
			title: 'Delete Card',
			description: 'Are you sure you want to delete this card?',
		}).then(() => {
			const boardClone = structuredClone(board)
			const column = boardClone.columns.find((col) => col._id === card.columnId)

			if (column) {
				column.cards = column.cards.filter((c) => c._id !== card._id)
				column.cardOrderIds = column.cardOrderIds.filter(
					(id) => id !== card._id,
				)
			}

			dispatch(setActiveBoard(boardClone))
			deleteCardAPI(card._id)
			toast.success('Card deleted successfully!')
		})
	}

	return (
		<>
			<Card
				ref={setNodeRef}
				{...attributes}
				{...listeners}
				style={dndkitCardStyle}
				sx={{
					cursor: 'pointer',
					boxShadow: card?.FE_PLACEHOLDER
						? 'unset'
						: '0 1px 1px 0 rgb(0 0 0 / 20%)',
					overflow: card?.FE_PLACEHOLDER ? 'hidden' : 'unset',
					pointerEvents: card?.FE_PLACEHOLDER ? 'none' : 'unset',
					bgcolor: card?.FE_PLACEHOLDER ? 'transparent' : 'background.paper',
					height: card?.FE_PLACEHOLDER ? '100px' : 'fit-content',
				}}
			>
				{card?.cover && (
					<CardMedia
						sx={{ height: '140px', borderRadius: '4px' }}
						image={card?.cover}
					/>
				)}
				<CardContent
					sx={{
						p: 1.5,
						'&:last-child': {
							p: 1.5,
						},
						color: (them) => them.palette.text.primary,
					}}
				>
					<Typography variant='body2'>{card?.title}</Typography>
				</CardContent>
				{!card?.FE_PLACEHOLDER && (
					<CardActions sx={{ p: '0 4px 8px 4px' }}>
						<Button
							sx={{ color: 'primary.mainChannel' }}
							size='small'
							startIcon={<Group />}
						>
							{card?.memberIds?.length > 0 ? card?.memberIds?.length : 0}
						</Button>

						<Button
							sx={{ color: 'primary.mainChannel' }}
							size='small'
							startIcon={<Comment />}
						>
							{card?.comments?.length > 0 ? card?.comments?.length : 0}
						</Button>

						<Button
							sx={{ color: 'primary.mainChannel' }}
							size='small'
							startIcon={<Attachment />}
						>
							{card?.attachments?.length > 0 ? card?.attachments?.length : 0}
						</Button>

						<Button
							sx={{
								color: '#ffffff',
								fontWeight: 400,
								fontSize: '10px',
								bgcolor: 'success.main',
								mx: '4px',
							}}
							size='small'
							className='interceptor-loading'
							onClick={() => dispatch(updateActiveCard(card))}
						>
							<Update
								sx={{
									fontSize: '1rem',
									color: 'white',
								}}
							/>
						</Button>

						<Button
							size='small'
							variant='outlined'
							sx={{
								fontWeight: 400,
								fontSize: '10px',
								bgcolor: 'error.main',
								border: 'none',
							}}
							onClick={handleDeleteCard}
						>
							<Delete
								sx={{
									fontSize: '1rem',
									color: 'white',
								}}
							/>
						</Button>
					</CardActions>
				)}
			</Card>
		</>
	)
}

export default CardItem
