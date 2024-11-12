import { PhotoCamera } from '@mui/icons-material'
import {
	Alert,
	Avatar,
	Box,
	Button,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useAppDispatch } from '~/redux/store'
import {
	selectCurrentUser,
	userUpdateInformation,
} from '~/redux/user/user.slice'
import { singleFileValidation } from '~/utils/validator.util'

export const Account = () => {
	const user = useSelector(selectCurrentUser)
	const dispatch = useAppDispatch()
	const [username, setUsername] = useState(user?.username)
	const [phone, setPhone] = useState(user?.phone || '')
	const [address, setAddress] = useState(user?.address || '')
	const [error, setError] = useState('')
	const confirm = useConfirm()
	const [avatar, setAvatar] = useState(user?.avatar || '')

	const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target?.files?.[0]) {
			setError('No file selected')
			return
		}

		const error = singleFileValidation(e.target.files[0])
		if (error) {
			setError(error)
			return
		}

		const requestData = new FormData()
		requestData.append('avatar', e.target.files[0])

		const url = URL.createObjectURL(e.target.files[0])
		setAvatar(url)

		toast
			.promise(dispatch(userUpdateInformation({ avatar: requestData })), {
				pending: 'Uploading...',
				success: 'Upload avatar successfully',
			})
			.then((res) => {
				console.log(res)
				e.target.value = ''
			})

		// clear input to choose file again
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!username || !phone || !address) {
			setError('Display name, phone and address are required')
			return
		}

		if (
			username === user?.username &&
			phone === user?.phone &&
			address === user?.address
		) {
			setError('No changes to save')
			return
		}

		if (phone.length !== 10) {
			setError('Phone number must be 10 digits')
			return
		}

		confirm({
			title: 'Are you sure?',
			description: 'Do you really want to save changes?',
			cancellationText: 'Cancel',
			confirmationText: 'Yes',
		}).then(() => {
			toast.promise(
				dispatch(userUpdateInformation({ username, phone, address })),
				{
					pending: 'Saving changes...',
					success: 'Update information successfully',
				},
			)
		})
	}

	return (
		<Box
			sx={{
				maxWidth: 500,
				mx: 'auto',
				p: 3,
				backgroundColor: 'Background.paper',
				borderRadius: 2,
				border: (theme) => `1px solid ${theme.palette.divider}`,
				boxShadow: 1,
			}}
		>
			{error && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}
			{/* Profile Picture */}
			<Stack direction='row' alignItems='center' sx={{ mb: 3 }} gap={1}>
				<Stack>
					<Avatar
						sx={{ width: 100, height: 100, mb: 2 }}
						src={avatar}
						alt='Profile Picture'
					/>
					<Button
						className='interceptor-loading'
						variant='contained'
						component='label'
						startIcon={<PhotoCamera />}
						sx={{
							bgcolor: 'primary.mainChannel',
							color: 'white',
						}}
					>
						Upload Photo
						<input
							hidden
							accept='image/*'
							type='file'
							onChange={(e) => handleUploadPhoto(e)}
						/>
					</Button>
				</Stack>

				<Stack>
					<Typography
						variant='h5'
						sx={{
							fontWeight: 'bold',
						}}
					>
						{user?.username}
					</Typography>
					<Typography
						variant='body1'
						sx={{
							color: 'text.secondary',
						}}
					>
						{user?.email}
					</Typography>
				</Stack>
			</Stack>

			{/* User Information Fields */}
			<Box component='form' onSubmit={handleSubmit}>
				<TextField
					fullWidth
					label='Dispaly Name'
					variant='outlined'
					margin='normal'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					fullWidth
					label='Email'
					InputProps={{
						readOnly: true,
					}}
					sx={{
						pointerEvents: 'none',
					}}
					disabled
					type='email'
					variant='outlined'
					margin='normal'
					defaultValue={user?.email}
				/>
				<TextField
					fullWidth
					label='Phone Number'
					type='tel'
					variant='outlined'
					margin='normal'
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				<TextField
					fullWidth
					label='Address'
					variant='outlined'
					margin='normal'
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>

				{/* Save Button */}
				<Button
					className='interceptor-loading'
					fullWidth
					variant='contained'
					type='submit'
					disabled={
						username === user?.username &&
						phone === user?.phone &&
						address === user?.address
					}
					sx={{ mt: 3, bgcolor: 'primary.mainChannel', color: 'white' }}
				>
					Save Changes
				</Button>
			</Box>
		</Box>
	)
}
