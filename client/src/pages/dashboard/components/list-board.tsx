import { ArrowRight, Lock, Public } from '@mui/icons-material'
import Update from '@mui/icons-material/Update'
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'
import { IBoard } from '~/interfaces/board.interface'

const BoardList = ({ boards }: { boards: IBoard[] }) => {
	const navigate = useNavigate()

	const renderSkeletons = () => (
		<Grid container spacing={3} columns={{ xs: 4, sm: 12, md: 12 }}>
			{Array.from(new Array(12)).map((_, index) => (
				<Grid size={{ xs: 4, sm: 4, md: 3 }} key={index}>
					<Card sx={{ width: 345, pb: 1, boxShadow: 3 }}>
						<Skeleton variant='rectangular' height={80} />
						<CardContent>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
							>
								<Skeleton variant='text' width='60%' />
								<Skeleton variant='circular' width={24} height={24} />
							</Stack>
							<Skeleton variant='text' width='80%' />
						</CardContent>
						<CardActions
							sx={{ display: 'flex', justifyContent: 'space-between' }}
						>
							<Skeleton variant='rectangular' width='45%' height={36} />
							<Skeleton variant='rectangular' width='45%' height={36} />
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	)

	return (
		<Grid>
			<Box sx={{ flexGrow: 1, padding: 1 }}>
				<Grid container spacing={3} columns={{ xs: 9, sm: 12 }}>
					{!boards
						? renderSkeletons()
						: boards?.map((board, index) => (
								<Grid size={{ xs: 12, sm: 9, md: 3 }} key={index}>
									<Card sx={{ maxWidth: 345, pb: 1, boxShadow: 3 }}>
										<CardMedia
											component='img'
											height='85'
											image={
												board?.cover
													? board.cover
													: `https://picsum.photos/id/${index + 1}/200/100`
											}
										/>
										<CardContent>
											<Stack
												direction='row'
												alignItems='center'
												justifyContent='space-between'
											>
												<Typography gutterBottom variant='h6' component='div'>
													{board.title}
												</Typography>
												{board.type === 'public' ? (
													<Public sx={{ color: 'primary.mainChannel' }} />
												) : (
													<Lock sx={{ color: 'primary.mainChannel' }} />
												)}
											</Stack>
											<Typography variant='body2' color='text.secondary'>
												{board.description}
											</Typography>
										</CardContent>
										<CardActions
											sx={{ display: 'flex', justifyContent: 'space-between' }}
										>
											<Button
												variant='contained'
												size='small'
												className='interceptor-loading'
												sx={{ bgcolor: 'black', color: 'white' }}
												onClick={() => navigate(`/boards/${board._id}`)}
											>
												<Typography
													sx={{
														fontSize: '0.9rem',
													}}
												>
													Go to
												</Typography>
												<ArrowRight
													sx={{
														fontSize: '1rem',
													}}
												/>
											</Button>
											<Button
												variant='contained'
												className='interceptor-loading'
												size='small'
												sx={{ bgcolor: 'black', color: 'white' }}
											>
												<Typography
													sx={{
														fontSize: '0.9rem',
													}}
												>
													Update
												</Typography>
												<Update
													sx={{
														fontSize: '1rem',
														ml: 0.5,
													}}
												/>
											</Button>
										</CardActions>
									</Card>
								</Grid>
						  ))}
				</Grid>
			</Box>
		</Grid>
	)
}

export default BoardList
