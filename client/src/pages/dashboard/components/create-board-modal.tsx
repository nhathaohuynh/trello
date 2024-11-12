import { Close } from '@mui/icons-material'
import {
	Box,
	Button,
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
	onCreate: (board: { title: string; description: string }) => void
}

const NewBoardModal = ({ open, onClose, onCreate }: NewBoardModalProps) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [isPublic, setIsPublic] = useState(true)
	const [error, setError] = useState('')

	const handleSubmit = () => {
		// Validate input
		if (!title.trim()) {
			setError('Title is required')
			return
		}

		if (!description.trim()) {
			setError('Description is required')
			return
		}

		// Call the onCreate prop with the new board data
		onCreate({ title, description })

		// Clear fields and close modal
		setTitle('')
		setDescription('')
		setError('')
		onClose()
	}

	return (
		<Dialog open={open} fullWidth maxWidth='sm'>
			<DialogTitle
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Typography
					variant='h6'
					sx={{
						color: 'primary.mainChannel',
					}}
				>
					Create New Board
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
			<DialogContent>
				<Box sx={{ mt: 2 }}>
					<TextField
						fullWidth
						label='Board title'
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
							value={isPublic ? 'public' : 'private'}
							onChange={(e) => setIsPublic(e.target.value === 'public')}
						>
							<FormControlLabel
								value='public'
								control={<Radio color='primary' />}
								label='Public'
							/>
							<FormControlLabel
								value='private'
								control={<Radio color='primary' />}
								label='Private'
							/>
						</RadioGroup>

						<DialogActions>
							<Button
								onClick={handleSubmit}
								sx={{
									bgcolor: 'primary.mainChannel',
								}}
								size='small'
								variant='contained'
							>
								Add Board
							</Button>
						</DialogActions>
					</FormControl>
				</Box>
			</DialogContent>
		</Dialog>
	)
}

export default NewBoardModal
