import Attachment from '@mui/icons-material/Attachment'
import Comment from '@mui/icons-material/Comment'
import Group from '@mui/icons-material/Group'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

interface props {
	card: any
}

function CardItem({ card }: props) {
	const shouldShowCardAction =
		!!card?.memberIds.length ||
		!!card?.comments.length ||
		!!card?.attachments.length
	return (
		<Card
			sx={{
				boxShadow: '0 1px 1px 0 rgb(0 0 0 / 20%)',
				overflow: 'unset',
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
				}}
			>
				<Typography variant='body2'>{card?.title}</Typography>
			</CardContent>

			{shouldShowCardAction && (
				<CardActions sx={{ p: '0 4px 8px 4px' }}>
					{!!card?.memberIds.length && (
						<Button
							sx={{ color: 'primary.mainChannel' }}
							size='small'
							startIcon={<Group />}
						>
							{card?.memberIds.length}
						</Button>
					)}

					{!!card?.comments.length && (
						<Button
							sx={{ color: 'primary.mainChannel' }}
							size='small'
							startIcon={<Comment />}
						>
							{card?.comments.length}
						</Button>
					)}

					{!!card?.attachments.length && (
						<Button
							sx={{ color: 'primary.mainChannel' }}
							size='small'
							startIcon={<Attachment />}
						>
							{card?.attachments.length}
						</Button>
					)}
				</CardActions>
			)}
		</Card>
	)
}

export default CardItem
