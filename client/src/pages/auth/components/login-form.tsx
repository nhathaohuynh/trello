import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '~/redux/store'
import { userLogin } from '~/redux/user/user.slice'
import { PATH_APP } from '~/utils/constants'

interface IFormInput {
	email: string
	password: string
}
const FormLogin = () => {
	const dispatch = useAppDispatch()
	const [searchParams] = useSearchParams()
	const { registeredEmail, verifiedEmail } = Object.fromEntries([
		...searchParams,
	])

	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInput>({
		defaultValues: {
			email: verifiedEmail || '',
			password: '',
		},
	})
	const navigate = useNavigate()

	const handleLogin: SubmitHandler<IFormInput> = (data) => {
		setLoading(true)
		Promise.resolve(dispatch(userLogin(data))).then((res) => {
			setLoading(false)
			if (res.payload) {
				reset()
				navigate(PATH_APP.BASE_NAME)
			}
		})
	}

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(handleLogin)}
			sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
		>
			{verifiedEmail && (
				<Alert severity='success' sx={{ textAlign: 'left' }}>
					<Typography
						variant='body2'
						sx={{
							textAlign: 'left',
							color: 'success.dark',
						}}
					>
						Your email has been verified. Please login to continue.
					</Typography>
				</Alert>
			)}

			{registeredEmail && (
				<Alert severity='info' sx={{ textAlign: 'left' }}>
					<Typography
						variant='body2'
						sx={{
							textAlign: 'left',
							color: 'success.dark',
						}}
					>
						{`A verification email has been sent to ${registeredEmail}. Please check and verify your
						account`}
					</Typography>
				</Alert>
			)}

			<TextField
				label='Email'
				variant='outlined'
				fullWidth
				autoComplete='on'
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
				autoComplete='on'
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
				className='interceptor-loading'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					mt: 1,
					borderColor: 'primary.mainChannel',
					bgcolor: 'primary.mainChannel',
					color: 'white',
					height: '36px',
				}}
				type='submit'
				fullWidth
			>
				{loading ? (
					<CircularProgress
						size={20}
						sx={{
							color: 'white',
						}}
					/>
				) : (
					'Login'
				)}
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
