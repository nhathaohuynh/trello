import { Close } from '@mui/icons-material'
import Cloud from '@mui/icons-material/Cloud'
import {
	Box,
	Button,
	CardMedia,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material'
import { useState } from 'react'

interface NewBoardModalProps {
	open: boolean
	onClose: () => void
	onCreate: (board: {
		title: string
		description: string
		cover?: File | null
		type: string
	}) => void
}

const NewBoardModal = ({ open, onClose, onCreate }: NewBoardModalProps) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [type, setType] = useState<'public' | 'private'>('public')
	const [error, setError] = useState('')
	const [coverImage, setCoverImage] = useState<File | null>(null)

	const handleSubmit = () => {
		// Validate input
		if (!title.trim()) {
			setError('Title is required')
			return
		}

		if (title.length > 50) {
			setError('Title is too long')
			return
		}

		if (!description.trim()) {
			setError('Description is required')
			return
		}

		if (description.length > 256) {
			setError('Description is too long')
			return
		}

		if (!!coverImage) {
			onCreate({
				title,
				description,
				cover: coverImage,
				type,
			})
		} else {
			onCreate({
				title,
				description,
				type,
			})
		}

		// Clear fields and close modal
		setCoverImage(null)
		setTitle('')
		setDescription('')
		setError('')
		onClose()
	}

	// Handle image upload
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setCoverImage(event.target.files[0])
		}
	}

	return (
		<Dialog open={open} fullWidth maxWidth='sm'>
			<DialogTitle
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					bgcolor: 'primary.mainChannel',
					py: 1.5,
				}}
			>
				<Typography
					sx={{
						color: 'white',
					}}
				>
					New board
				</Typography>
				<Box
					onClick={onClose}
					sx={{
						cursor: 'pointer',
						bgcolor: 'error.main',
						borderRadius: '50%',
						height: 20,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: 20,
					}}
				>
					<Close
						sx={{
							color: 'white',
							fontSize: 16,
						}}
					/>
				</Box>
			</DialogTitle>
			<DialogContent
				sx={{
					bgcolor: 'background.default',
				}}
			>
				<Box sx={{ mt: 2 }}>
					<TextField
						fullWidth
						label='Title'
						variant='outlined'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						error={error.includes('Title')}
						helperText={error.includes('Title') ? error : ''}
					/>
					<TextField
						fullWidth
						label='Description'
						variant='outlined'
						multiline
						rows={4}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						sx={{
							mt: 2,
						}}
						error={error.includes('Description')}
						helperText={error.includes('Description') ? error : ''}
					/>

					<Box
						sx={{
							my: 2,
							textAlign: 'center',
							display: 'flex',
							justifyContent: 'space-between',
							flexDirection: 'column',
							alignItems: 'start',
							gap: 2,
						}}
					>
						<Box sx={{ flex: '1' }}>
							<Button
								variant='contained'
								startIcon={<Cloud />}
								component='label'
								className='interceptor-loading'
								sx={{
									bgcolor: 'primary.mainChannel',
									color: 'white',
									px: 4,
									py: 1.5,
									width: '100%',
									height: '36px',
									borderRadius: 2,
									textTransform: 'none',
									boxShadow: 3,
								}}
							>
								Upload cover image
								<input
									type='file'
									hidden
									accept='image/*'
									onChange={handleImageUpload}
								/>
							</Button>
						</Box>

						{/* Display image preview if a cover image is selected */}
						{coverImage && (
							<Box
								sx={{
									flex: '1',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									width: '100%',
								}}
							>
								<CardMedia
									component='img'
									image={URL.createObjectURL(coverImage)}
									sx={{
										width: '100%',
										height: '200px',
										borderRadius: 2,
									}}
								/>
							</Box>
						)}
					</Box>

					<FormControl
						component='fieldset'
						sx={{
							mt: 2,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<RadioGroup
							row
							value={type}
							onChange={(e) => setType(e.target.value as 'public' | 'private')}
						>
							<FormControlLabel
								value='public'
								control={<Radio color='primary' />}
								label='Public'
								sx={{
									'& span': {
										fontSize: '14px',
									},
								}}
							/>
							<FormControlLabel
								value='private'
								control={<Radio color='primary' />}
								label='Private'
								sx={{
									'& span': {
										fontSize: '14px',
									},
								}}
							/>
						</RadioGroup>

						<DialogActions>
							<Button
								onClick={handleSubmit}
								sx={{
									bgcolor: 'primary.mainChannel',
									color: 'white',
								}}
								size='medium'
								variant='contained'
							>
								Add board
							</Button>
						</DialogActions>
					</FormControl>
				</Box>
			</DialogContent>
		</Dialog>
	)
}

export default NewBoardModal
