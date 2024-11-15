import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FieldErrorAlert from '~/components/cores/field-alert'

interface InviteBoardUserFormData {
	inviteeEmail: string
}

const InviteBoardUser = () => {
	// State for Popover anchor element
	const [anchorPopoverElement, setAnchorPopoverElement] =
		useState<HTMLElement | null>(null)
	const isOpenPopover = Boolean(anchorPopoverElement)
	const popoverId = isOpenPopover ? 'invite-board-user-popover' : undefined

	// Handle Popover open/close
	const handleTogglePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorPopoverElement((prevState) =>
			prevState ? null : event.currentTarget,
		)
	}

	// React Hook Form
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<InviteBoardUserFormData>()

	// Submit handler
	const submitInviteUserToBoard: SubmitHandler<InviteBoardUserFormData> = (
		data,
	) => {
		const { inviteeEmail } = data
		console.log('inviteeEmail:', inviteeEmail)

		// Clear the input field after submitting the form
		setValue('inviteeEmail', '')
		setAnchorPopoverElement(null)
	}

	return (
		<Box>
			<Tooltip title='Invite user to this board!'>
				<Button
					aria-describedby={popoverId}
					onClick={handleTogglePopover}
					startIcon={<PersonAddIcon />}
					variant='outlined'
					sx={{
						ml: 2,
						px: 2,
						py: 0.8,
						width: 'fit-content',
						color: 'primary.main',
						fontSize: '12px',
						fontWeight: 500,
						bgcolor: (theme) =>
							theme.palette.mode === 'dark' ? '#FFFFFF29' : '#00000014',
						border: 'none',
					}}
				>
					Invite
				</Button>
			</Tooltip>

			{/* Popover to invite user */}
			<Popover
				id={popoverId}
				open={isOpenPopover}
				anchorEl={anchorPopoverElement}
				onClose={handleTogglePopover}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<form
					onSubmit={handleSubmit(submitInviteUserToBoard)}
					style={{ width: '320px' }}
				>
					<Box
						sx={{
							p: '15px 20px 20px 20px',
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}
					>
						<Typography
							variant='body2'
							sx={{ fontWeight: 'bold', fontSize: '16px' }}
						>
							Invite User To This Board!
						</Typography>
						<Box>
							<TextField
								autoFocus
								fullWidth
								label='Email'
								type='text'
								variant='outlined'
								{...register('inviteeEmail', {
									required: "Email can't be empty",
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
										message: 'Invalid email format',
									},
								})}
								error={!!errors['inviteeEmail']}
							/>
							<FieldErrorAlert errors={errors} fieldName={'inviteeEmail'} />
						</Box>

						<Box sx={{ alignSelf: 'flex-end' }}>
							<Button
								className='interceptor-loading'
								type='submit'
								variant='contained'
								color='info'
							>
								Invite
							</Button>
						</Box>
					</Box>
				</form>
			</Popover>
		</Box>
	)
}

export default InviteBoardUser
