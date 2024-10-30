import AddCard from '@mui/icons-material/AddCard'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

const FooterColumn = () => {
	const [cardTitle, setCardTitle] = useState<string | null>()
	const [isToggleCardForm, setIsToggleCardForm] = useState<boolean>(false)
	return (
		<Box
			sx={{
				height: (theme) => theme.appSetting.columnFooterHeight,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'primary.mainChannel',
				borderBottomLeftRadius: '6px',
				borderBottomRightRadius: '6px',
				maxHeight: isToggleCardForm ? '56px' : 'inherit',
				minHeight: isToggleCardForm ? '56px' : 'inherit',
				padding: '0 12px',
			}}
		>
			{isToggleCardForm ? (
				<TextField
					sx={{
						width: '100%',
						'& input': {
							color: 'white',
						},
						'& label': {
							color: 'white',
						},
						'& label.Mui-focused': {
							color: 'white',
						},
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderColor: 'white',
							},
							'&:hover fieldset': {
								borderColor: 'white',
							},

							'&.Mui-focused fieldset': {
								borderColor: 'white',
							},
						},
					}}
					size='small'
					type='text'
					label='Enter card content'
					autoFocus
					variant='outlined'
					data-no-dnd='true'
					value={cardTitle}
					onChange={(e) => setCardTitle(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							setCardTitle('')
							setIsToggleCardForm(false)
						}
					}}
				/>
			) : (
				<Button
					sx={{
						color: '#ffffff',
						fontWeight: 400,
						fontSize: '0.875rem',
						width: '100%',
					}}
					startIcon={<AddCard />}
					onClick={() => setIsToggleCardForm(true)}
				>
					Add new card
				</Button>
			)}
		</Box>
	)
}

export default FooterColumn
