import { Box, Button, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RegisterAPI } from '~/apis/user.api'
import { PATH_APP } from '~/utils/constants'

interface IFormInput {
	username: string
	email: string
	password: string
	confirmPassword: string
}

const FormRegister = () => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<IFormInput>()
	const navigate = useNavigate()

	const handleRegister: SubmitHandler<IFormInput> = (data) => {
		toast
			.promise(
				RegisterAPI({
					email: data.email,
					username: data.username,
					password: data.password,
				}),
				{
					pending: 'Registration in progress...',
					success: 'Register successfully',
					error: 'Register failed',
				},
			)
			.then((user) => {
				if (user) {
					reset()
					return navigate(`${PATH_APP.LOGIN}?registeredEmail=${data.email}`)
				}
			})
	}

	return (
		<Box
			component='form'
			sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
			onSubmit={handleSubmit(handleRegister)}
		>
			<TextField
				label='Username'
				variant='outlined'
				fullWidth
				{...register('username', {
					required: 'Username is required',
					minLength: {
						value: 3,
						message: 'Username must be at least 6 characters',
					},
				})}
				error={!!errors.username}
				helperText={errors.username?.message}
			/>
			<TextField
				label='Email'
				variant='outlined'
				fullWidth
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
						message: 'Invalid email address',
					},
				})}
				error={!!errors.email}
				helperText={errors.email?.message}
			/>

			{/* Password Field */}
			<TextField
				label='Password'
				type='password'
				variant='outlined'
				fullWidth
				{...register('password', {
					required: 'Password is required',
					minLength: {
						value: 8,
						message: 'Password must be at least 8 characters',
					},
					maxLength: {
						value: 20,
						message: 'Password must be at most 20 characters',
					},
				})}
				error={!!errors.password}
				helperText={errors.password?.message}
			/>

			{/* Confirm Password Field */}
			<TextField
				label='Confirm Password'
				type='password'
				variant='outlined'
				fullWidth
				{...register('confirmPassword', {
					required: 'Confirm Password is required',
					validate: (value) =>
						value === watch('password') || 'The passwords do not match',
				})}
				error={!!errors.confirmPassword}
				helperText={errors.confirmPassword?.message}
			/>

			{/* Register Button */}
			<Button
				variant='outlined'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					mt: 1,
					borderColor: 'primary.mainChannel',
					bgcolor: 'primary.mainChannel',
					color: 'white',
				}}
				type='submit'
				fullWidth
			>
				Register
			</Button>

			<Typography
				variant='body2'
				onClick={() => navigate(PATH_APP.LOGIN)}
				sx={{
					mt: 2,
					cursor: 'pointer',
					'&:hover': {
						textDecoration: 'underline',
						color: 'primary.main',
					},
				}}
			>
				Already have an account? Sign in
			</Typography>
		</Box>
	)
}

export default FormRegister
