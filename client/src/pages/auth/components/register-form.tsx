import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
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
		formState: { errors },
	} = useForm<IFormInput>()
	const [emailVerificationSent, setEmailVerificationSent] = useState(false)
	const password = useRef<string | null>(null)
	const navigate = useNavigate()

	// Simulate sending email verification
	const handleRegister: SubmitHandler<IFormInput> = (data) => {
		console.log(data)
		setEmailVerificationSent(true) // Assume email verification sent for this example
	}

	return (
		<Box
			component='form'
			sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
			onSubmit={handleSubmit(handleRegister)}
		>
			{emailVerificationSent && (
				<Stack
					direction='row'
					alignItems='center'
					spacing={3}
					my={3}
					sx={{
						bgcolor: 'success.light',
						borderRadius: '4px',
						p: 1,
					}}
				>
					<CheckCircleIcon />
					<Typography
						variant='body2'
						sx={{
							textAlign: 'left',
						}}
					>
						A verification email has been sent to huynhnhathao0609@gmail.com.
						Please check and verify your email.
					</Typography>
				</Stack>
			)}
			<TextField
				label='Username'
				variant='outlined'
				fullWidth
				{...register('username', {
					required: 'Username is required',
					minLength: {
						value: 6,
						message: 'Username must be at least 6 characters',
					},
					maxLength: {
						value: 20,
						message: 'Username must be at most 20 characters',
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
					onChange: (e) => (password.current = e.target.value), // Store password in ref
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
						value === password.current || 'The passwords do not match',
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
					borderColor: 'grey.400',
					color: 'text.primary',
					'&:hover': {
						borderColor: 'grey.600',
					},
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
