import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PATH_APP } from '~/utils/constants'

interface IFormInput {
	email: string
	password: string
}
const FormLogin = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>()
	const navigate = useNavigate()

	const handleLogin: SubmitHandler<IFormInput> = (data) => {
		console.log(data)
		// Your login logic here
	}

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(handleLogin)}
			sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
		>
			<TextField
				label='Email'
				variant='outlined'
				fullWidth
				autoComplete='off'
				error={errors.email ? true : false}
				helperText={errors.email?.message}
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
						message: 'Invalid email address',
					},
				})}
			/>
			<TextField
				label='Password'
				type='password'
				autoComplete='off'
				variant='outlined'
				fullWidth
				error={errors.password ? true : false}
				helperText={errors.password?.message}
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
			/>
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
				Login
			</Button>

			{/* Additional Links for Register and Forgot Password */}
			<Stack direction='row' justifyContent='space-between' mt={2}>
				<Typography
					onClick={() => navigate(PATH_APP.REGISTER)}
					variant='body2'
					sx={{
						cursor: 'pointer',
						'&:hover': {
							textDecoration: 'underline',
							color: 'primary.mainChannel',
						},
					}}
				>
					Don’t have an account? sign up
				</Typography>
				<Typography
					variant='body2'
					onClick={() => navigate(PATH_APP.FORGOT_PASSWORD)}
					sx={{
						cursor: 'pointer',
						'&:hover': {
							textDecoration: 'underline',
							color: 'primary.mainChannel',
						},
					}}
				>
					Forgot Password?
				</Typography>
			</Stack>
		</Box>
	)
}

export default FormLogin
