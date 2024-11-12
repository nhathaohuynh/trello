import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Attachment from '@mui/icons-material/Attachment'
import Comment from '@mui/icons-material/Comment'
import Group from '@mui/icons-material/Group'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useConfirm } from 'material-ui-confirm'
import { useState } from 'react'
import { ICard } from '~/interfaces/board.interface'
import CardModal from '../card-modal'

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

	const [isModalOpen, setModalOpen] = useState(false)
	const confirm = useConfirm()

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	const handleUpdateCard = (data: { title: string; coverImage?: File }) => {
		console.log(data)

		handleCloseModal()
	}

	const handleDeleteCard = () => {
		confirm({
			title: 'Delete Card',
			description: 'Are you sure you want to delete this card?',
		})
			.then(() => {
				console.log('Deleted')
			})
			.catch(() => {
				console.log('Not deleted')
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
					'&:hover': {
						border: '1px solid #0000002f',
					},
					border: '1px solid transparent',
					cursor: 'pointer',
					boxShadow: card?.FE_PLACEHOLDER
						? 'unset'
						: '0 1px 1px 0 rgb(0 0 0 / 20%)',
					overflow: card?.FE_PLACEHOLDER ? 'hidden' : 'unset',
					pointerEvents: card?.FE_PLACEHOLDER ? 'none' : 'unset',
				}}
			>
				{card?.cover && (
					<CardMedia
						sx={{ height: 140 }}
						image='https://images.unsplash.com/photo-1719937050792-a6a15d899281?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						title='green iguana'
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
						onClick={handleOpenModal}
					>
						Update
					</Button>

					<Button
						size='small'
						sx={{
							color: '#ffffff',
							fontWeight: 400,
							fontSize: '10px',
							bgcolor: 'error.main',
						}}
						onClick={handleDeleteCard}
					>
						Remove
					</Button>
				</CardActions>
			</Card>

			{isModalOpen && (
				<CardModal
					onClose={handleCloseModal}
					open={isModalOpen}
					onSubmitData={handleUpdateCard}
					isUpdate={true}
					cardData={{
						title: card?.title,
						coverImage: card?.cover || '',
					}}
				/>
			)}
		</>
	)
}

export default CardItem
