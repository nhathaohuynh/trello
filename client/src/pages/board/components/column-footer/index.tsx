import AddCard from '@mui/icons-material/AddCard'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createCardAPI } from '~/apis/board.api'
import { ICreateCard } from '~/interfaces/board.interface'
import { selectActiveBoard, setActiveBoard } from '~/redux/board/board.slice'
import { useAppDispatch } from '~/redux/store'

interface props {
	columnId: string
}

const FooterColumn = ({ columnId }: props) => {
	const [cardTitle, setCardTitle] = useState<string>('')
	const [isToggleCardForm, setIsToggleCardForm] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const activeBoard = useSelector(selectActiveBoard)
	const { boardId } = useParams()
	const dispatch = useAppDispatch()

	const handleAddCard = async (columnId: string, title: string) => {
		const data: ICreateCard = {
			columnId,
			title,
			boardId: boardId as string,
		}

		const newCard = await createCardAPI(data)

		const boardClone = structuredClone(activeBoard)

		if (boardClone) {
			const newColumns = boardClone.columns.map((column) => {
				if (column._id === columnId) {
					column.cards = [...column.cards, newCard]
					column.cardOrderIds = [...column.cardOrderIds, newCard._id]

					// remove placeholder card
					column.cards = column.cards.filter((card) => !card?.FE_PLACEHOLDER)

					column.cardOrderIds = column.cards
						.filter((card) => !card?.FE_PLACEHOLDER)
						.map((card) => card._id)
				}

				return column
			})

			const newBoard = {
				...boardClone,
				columns: newColumns,
			}

			dispatch(setActiveBoard(newBoard))
		}
	}
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
				padding: '0 12px',
			}}
		>
			{isToggleCardForm ? (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<TextField
						sx={{
							width: '100%',

							'& input': {
								color: 'white',
								fontSize: '12px',
								height: '12px',
							},
							'& input::placeholder': {
								color: 'white',
								fontSize: '12px',
							},
							'& label.Mui-focused': {
								color: 'white',
								fontSize: '14px',
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
						placeholder='Enter a title for card...'
						autoFocus
						variant='outlined'
						ref={inputRef}
						data-no-dnd='true'
						value={cardTitle}
						onChange={(e) => {
							setCardTitle(e.target.value)
						}}
					/>
					<Button
						sx={{
							color: '#ffffff',
							fontWeight: 400,
							fontSize: '10px',
							bgcolor: 'success.main',
							mx: '4px',
						}}
						className='interceptor-loading'
						onClick={() => {
							if (!cardTitle)
								return toast.error('Please enter a title for card')
							handleAddCard(columnId, cardTitle)
							setCardTitle('')
							inputRef.current?.focus()
						}}
					>
						Add
					</Button>

					<Button
						sx={{
							color: '#ffffff',
							fontWeight: 400,
							fontSize: '10px',
							bgcolor: 'error.main',
						}}
						onClick={() => {
							setIsToggleCardForm(false)
						}}
					>
						Cancel
					</Button>
				</Box>
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
					New card
				</Button>
			)}
		</Box>
	)
}

export default FooterColumn
