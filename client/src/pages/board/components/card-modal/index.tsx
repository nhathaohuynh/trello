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
	TextField,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface NewCardModalProps {
	open: boolean
	isUpdate?: boolean
	onClose: () => void
	onSubmitData: (board: { title: string; coverImage?: File }) => void
	cardData?: { title?: string; coverImage?: string }
}

const CardModal = ({
	open,
	isUpdate = false,
	cardData = { title: '', coverImage: '' },
	onClose,
	onSubmitData,
}: NewCardModalProps) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: cardData.title || '',
		},
	})

	const [coverImage, setCoverImage] = useState<File | string>(
		cardData.coverImage || '',
	)

	const onSubmit = (data: { title: string }) => {
		if (typeof coverImage !== 'string') {
			onSubmitData({ ...data, coverImage: coverImage })
		} else {
			onSubmitData({
				title: data.title,
			})
		}
		onClose()
	}

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
				<Typography variant='h6' sx={{ color: 'white' }}>
					{!isUpdate ? 'New Card' : 'Update Card'}
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
					<Close sx={{ color: 'white', fontSize: 16 }} />
				</Box>
			</DialogTitle>
			<DialogContent sx={{ bgcolor: 'background.default' }}>
				<Box sx={{ mt: 2 }} component='form' onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='title'
						control={control}
						rules={{ required: 'Title is required' }}
						render={({ field }) => (
							<TextField
								{...field}
								fullWidth
								label='Card title'
								variant='outlined'
								error={!!errors.title}
								helperText={errors.title?.message}
							/>
						)}
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
						<Box
							sx={{
								flex: '1',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
							}}
						>
							{coverImage && (
								<CardMedia
									component='img'
									image={
										typeof coverImage === 'string'
											? coverImage
											: URL.createObjectURL(coverImage)
									}
									sx={{ width: '100%', height: '200px', borderRadius: 2 }}
								/>
							)}
						</Box>
					</Box>

					<DialogActions>
						<Button
							type='submit'
							sx={{
								bgcolor: 'primary.mainChannel',
								color: 'white',
							}}
							size='medium'
							variant='contained'
						>
							{!isUpdate ? 'Add card' : 'Update card'}
						</Button>
					</DialogActions>
				</Box>
			</DialogContent>
		</Dialog>
	)
}

export default CardModal
