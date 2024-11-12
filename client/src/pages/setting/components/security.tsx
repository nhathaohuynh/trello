import SecurityUpdate from '@mui/icons-material/SecurityUpdate'
import {
	Alert,
	Box,
	Button,
	FormControlLabel,
	Stack,
	Switch,
	TextField,
	Typography,
} from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { updatePasswordAPI } from '~/apis/user.api'
import { useAppDispatch } from '~/redux/store'
import { userLogout } from '~/redux/user/user.slice'

const Security = () => {
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [twoStepVerification, setTwoStepVerification] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)
	const confirm = useConfirm()
	const dispatch = useAppDispatch()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError('')
		setSuccess(false)

		if (!currentPassword || !newPassword || !confirmPassword) {
			setError('All fields are required')
			return
		}

		if (currentPassword === newPassword) {
			setError('New password must be different from the current password')
			return
		}

		if (newPassword !== confirmPassword) {
			setError('New passwords do not match')
			return
		}

		if (
			RegExp(
				'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
			).test(newPassword) === false
		) {
			setError(
				'Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
			)
			return
		}

		confirm({
			title: 'Are you sure?',
			description: 'Do you really want to change your password?',
			cancellationText: 'Cancel',
			confirmationText: 'Yes',
		}).then(() => {
			toast
				.promise(
					updatePasswordAPI({ password: currentPassword, newPassword }),
					{
						pending: 'Changing password in progress...',
						success: 'Password changed successfully. Please login again',
					},
				)
				.then((res) => {
					if (res) {
						setSuccess(true)
						setCurrentPassword('')
						setNewPassword('')
						setConfirmPassword('')
						setTimeout(() => {
							dispatch(userLogout({ showSuccessMessage: false }))
						}, 2000)
					}
				})
		})
	}

	return (
		<Box
			sx={{
				maxWidth: 500,
				mx: 'auto',
				p: 3,
				backgroundColor: 'background.paper',
				borderRadius: 2,
				boxShadow: 1,
				border: (theme) => `1px solid ${theme.palette.divider}`,
			}}
		>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='center'
				sx={{ mb: 3, mx: 'auto' }}
				gap={2}
				color='primary.mainChannel'
			>
				<SecurityUpdate sx={{ fontSize: 32 }} />
				<Typography
					variant='h4'
					component='h2'
					sx={{
						fontWeight: '500',
					}}
				>
					SECURITY
				</Typography>
			</Stack>

			{/* Display error message */}
			{error && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}
			{success && (
				<Alert severity='success' sx={{ mb: 2 }}>
					Password changed successfully!
				</Alert>
			)}

			{/* Password Change Form */}
			<Box component='form' onSubmit={handleSubmit}>
				<TextField
					autoComplete='current-password'
					fullWidth
					label='Current Password'
					type='password'
					variant='outlined'
					margin='normal'
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>
				<TextField
					fullWidth
					label='New Password'
					type='password'
					variant='outlined'
					margin='normal'
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
				<TextField
					autoComplete='current-password'
					fullWidth
					label='Confirm New Password'
					type='password'
					variant='outlined'
					margin='normal'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>

				{/* Two-Step Verification Toggle */}
				<FormControlLabel
					control={
						<Switch
							checked={twoStepVerification}
							onChange={(e) => setTwoStepVerification(e.target.checked)}
							color='primary'
						/>
					}
					labelPlacement='start'
					label={'Two-Step Verification'}
					sx={{ mt: 2 }}
				/>

				{/* Submit Button */}
				<Button
					type='submit'
					fullWidth
					variant='contained'
					sx={{ mt: 3, backgroundColor: 'primary.mainChannel', color: 'white' }}
				>
					Save Change
				</Button>
			</Box>
		</Box>
	)
}

export default Security
