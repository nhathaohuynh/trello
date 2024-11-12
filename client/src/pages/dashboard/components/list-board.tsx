import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import randomColor from 'randomcolor'

const boards = [
	{
		id: 1,
		title: 'Board 1',
		description: 'This is the description for Board 1',
	},
	{
		id: 2,
		title: 'Board 2',
		description: 'This is the description for Board 2',
	},
	{
		id: 3,
		title: 'Board 3',
		description: 'This is the description for Board 3',
	},

	{
		id: 1,
		title: 'Board 1',
		description: 'This is the description for Board 1',
	},
	{
		id: 2,
		title: 'Board 2',
		description: 'This is the description for Board 2',
	},
	{
		id: 3,
		title: 'Board 3',
		description: 'This is the description for Board 3',
	},

	{
		id: 1,
		title: 'Board 1',
		description: 'This is the description for Board 1',
	},
	{
		id: 2,
		title: 'Board 2',
		description: 'This is the description for Board 2',
	},
	{
		id: 3,
		title: 'Board 3',
		description: 'This is the description for Board 3',
	},

	{
		id: 1,
		title: 'Board 1',
		description: 'This is the description for Board 1',
	},
	{
		id: 2,
		title: 'Board 2',
		description: 'This is the description for Board 2',
	},
	{
		id: 3,
		title: 'Board 3',
		description: 'This is the description for Board 3',
	},

	// Add more boards as needed
]

const BoardList = () => {
	return (
		<Box sx={{ flexGrow: 1, padding: 1 }}>
			<Grid container spacing={4} columns={{ xs: 4, sm: 12, md: 12 }}>
				{boards.map((board, index) => (
					<Grid size={{ xs: 4, sm: 4, md: 3 }} key={index}>
						<Card sx={{ maxWidth: 345, pb: 1, boxShahow: 3 }}>
							<Box sx={{ height: '50px', bgcolor: randomColor() }}></Box>
							<CardContent>
								<Typography gutterBottom variant='h6' component='div'>
									{board.title}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									{board.description}
								</Typography>
							</CardContent>
							<CardActions
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<Button
									variant='contained'
									size='small'
									sx={{ bgcolor: 'primary.mainChannel', color: 'white' }}
								>
									View
								</Button>
								<Button
									variant='contained'
									size='small'
									sx={{ bgcolor: 'primary.mainChannel', color: 'white' }}
								>
									Update
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	)
}

export default BoardList
