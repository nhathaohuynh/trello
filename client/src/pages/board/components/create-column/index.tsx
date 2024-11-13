import { Close } from '@mui/icons-material'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface NewColumnModalProps {
	open: boolean
	onClose: () => void
	onAddColumn: (board: { title: string; description: string }) => void
}

interface FormValues {
	title: string
	description: string
}

const NewColumnModal = ({
	open,
	onClose,
	onAddColumn,
}: NewColumnModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>()

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		onAddColumn(data)
		reset()
		onClose()
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
					New Column
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
				<Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
					<TextField
						fullWidth
						label='Column title'
						variant='outlined'
						{...register('title', { required: 'Title is required' })}
						error={!!errors.title}
						helperText={errors.title?.message}
					/>
					<TextField
						fullWidth
						label='Description'
						variant='outlined'
						multiline
						rows={4}
						sx={{ mt: 2 }}
						{...register('description', {
							required: 'Description is required',
						})}
						error={!!errors.description}
						helperText={errors.description?.message}
					/>
				</Box>
			</DialogContent>

			<DialogActions>
				<Button
					type='submit'
					onClick={handleSubmit(onSubmit)}
					sx={{
						bgcolor: 'primary.mainChannel',
						color: 'white',
						fontWeight: 500,
						fontSize: 14,
						mr: 2,
					}}
					size='medium'
					variant='contained'
				>
					Add column
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default NewColumnModal
