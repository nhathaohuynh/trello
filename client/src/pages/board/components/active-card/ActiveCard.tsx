import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import CancelIcon from '@mui/icons-material/Cancel'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateCardAPI } from '~/apis/board.api'
import { createCommentAPI } from '~/apis/comment.api'
import { ICard } from '~/interfaces/board.interface'
import { InputComment } from '~/interfaces/comment.interface'
import { selectActiveBoard, setActiveBoard } from '~/redux/board/board.slice'
import {
	clearActiveCard,
	selectActiveCard,
	updateActiveCard,
} from '~/redux/card/active-card.slice'
import { useAppDispatch } from '~/redux/store'
import { singleFileValidation } from '~/utils/validator.util'
import ToggleFocusInput from '../../../../components/cores/focus-input'
import VisuallyHiddenInput from '../../../../components/cores/hide-input'
import CardActivitySection from './CardActivitySection'
import CardDescriptionMdEditor from './CardDescriptionMdEditor'
import CardUserGroup from './CardUserGroup'

const SidebarItem = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
	cursor: 'pointer',
	fontSize: '14px',
	fontWeight: '600',
	color: theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
	backgroundColor: theme.palette.mode === 'dark' ? '#2f3542' : '#091e420f',
	padding: '10px',
	borderRadius: '4px',
	'&:hover': {
		backgroundColor:
			theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300],
		'&.active': {
			color: theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
			backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff',
		},
	},
}))

/**
 * Note: Modal là một low-component mà bọn MUI sử dụng bên trong những thứ như Dialog, Drawer, Menu, Popover. Ở đây dĩ nhiên chúng ta có thể sử dụng Dialog cũng không thành vấn đề gì, nhưng sẽ sử dụng Modal để dễ linh hoạt tùy biến giao diện từ con số 0 cho phù hợp với mọi nhu cầu nhé.
 */
function ActiveCard() {
	const fileInputRef = useRef<{ triggerFileInput: () => void } | null>(null)
	const dispatch = useAppDispatch()
	const activeCard = useSelector(selectActiveCard)
	const board = useSelector(selectActiveBoard)

	const onUpdateCardTitle = (newTitle: string) => {
		if (!newTitle.trim()) return
		const formData = new FormData()
		formData.append('title', newTitle)
		handleOnSubmit(formData)
	}

	const handleUploadClick = () => {
		fileInputRef.current?.triggerFileInput()
	}

	const handleFileSelect = (file: File) => {
		const error = singleFileValidation(file)
		if (error) {
			toast.error(error)
			return
		}

		const formData = new FormData()
		formData.append('cover', file)
		handleOnSubmit(formData)
	}

	const handleOnSubmit = (formData: FormData) => {
		toast
			.promise(updateCardAPI(activeCard._id, formData), {
				pending: 'Updating card...',
				success: 'Card updated successfully!',
			})
			.then((data) => {
				const boardClone = structuredClone(board)
				const column = boardClone.columns.find(
					(col) => col._id === data.columnId,
				)

				if (column) {
					const cardIndex = column.cards.findIndex(
						(card) => card._id === data._id,
					)
					column.cards[cardIndex] = data
				}

				dispatch(setActiveBoard(boardClone))
				dispatch(updateActiveCard(data as ICard))
			})
	}

	const handleUpdateCardDescription = (description: string) => {
		const formData = new FormData()
		formData.append('description', description)
		handleOnSubmit(formData)
	}

	const handelComment = (comment: { content: string; user: string }) => {
		const data: InputComment = {
			content: comment.content,
			user: comment.user,
			cardId: activeCard._id,
			parent: null,
		}

		createCommentAPI(data).then((data) => {
			const boardClone = structuredClone(board)

			const column = boardClone.columns.find(
				(col) => col._id === activeCard.columnId,
			)

			const card = column?.cards.find((card) => card._id === activeCard._id)

			if (card) {
				card.comments.push(data)
			}

			dispatch(setActiveBoard(boardClone))
			dispatch(updateActiveCard(card as ICard))
		})
	}

	return (
		<Modal disableScrollLock open={true} sx={{ overflowY: 'auto' }}>
			<Box
				sx={{
					position: 'relative',
					width: 900,
					maxWidth: 900,
					bgcolor: 'white',
					boxShadow: 24,
					borderRadius: '8px',
					border: 'none',
					outline: 0,
					padding: '40px 20px 20px',
					margin: '50px auto',
					backgroundColor: (theme) =>
						theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						top: '12px',
						right: '10px',
						cursor: 'pointer',
					}}
				>
					<CancelIcon
						sx={{ color: 'error.light', '&:hover': { color: 'error.dark' } }}
						onClick={() => dispatch(clearActiveCard())}
					/>
				</Box>

				{!!activeCard?.cover && (
					<Box sx={{ mb: 4 }}>
						<img
							style={{
								width: '100%',
								height: '250px',
								borderRadius: '6px',
								objectFit: 'cover',
							}}
							src={
								!!activeCard?.cover
									? activeCard?.cover
									: 'https://rdironworks.com/wp-content/uploads/2017/12/dummy-200x200.png'
							}
							alt='card-cover'
						/>
					</Box>
				)}

				<Box
					sx={{
						mb: 1,
						mt: -3,
						pr: 2.5,
						display: 'flex',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<CreditCardIcon />

					{/* Feature 01: Xử lý tiêu đề của Card */}
					<ToggleFocusInput
						inputFontSize='22px'
						value={activeCard?.title}
						color={(theme) =>
							theme.palette.mode === 'dark' ? 'white' : 'black'
						}
						onChangedValue={onUpdateCardTitle}
					/>
				</Box>

				<Grid container spacing={2} sx={{ mb: 3 }}>
					{/* Left side */}
					<Grid size={{ xs: 12, sm: 9 }}>
						<Box sx={{ mb: 3 }}>
							<Typography
								sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
							>
								Members
							</Typography>

							{/* Feature 02: Xử lý các thành viên của Card */}
							<CardUserGroup />
						</Box>

						<Box sx={{ mb: 3 }}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
								<SubjectRoundedIcon />
								<Typography
									variant='body2'
									sx={{ fontWeight: '600', fontSize: '20px' }}
								>
									Description
								</Typography>
							</Box>

							{/* Feature 03: Xử lý mô tả của Card */}
							<CardDescriptionMdEditor
								description={
									activeCard?.description ? activeCard.description : null
								}
								handelUpdateDescription={handleUpdateCardDescription}
							/>
						</Box>

						<Box sx={{ mb: 3 }}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
								<DvrOutlinedIcon />
								<Typography
									variant='body2'
									sx={{ fontWeight: '600', fontSize: '20px' }}
								>
									Activity
								</Typography>
							</Box>

							{/* Feature 04: Xử lý các hành động, ví dụ comment vào Card */}
							<CardActivitySection
								onCartComment={handelComment}
								cardComment={activeCard?.comments}
							/>
						</Box>
					</Grid>

					{/* Right side */}
					<Grid size={{ xs: 12, sm: 3 }}>
						<Typography
							sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
						>
							Add To Card
						</Typography>
						<Stack direction='column' spacing={1}>
							{/* Feature 05: Xử lý hành động bản thân user tự join vào card */}
							<SidebarItem className='active'>
								<PersonOutlineOutlinedIcon fontSize='small' />
								Join
							</SidebarItem>
							{/* Feature 06: Xử lý hành động cập nhật ảnh Cover của Card */}
							<SidebarItem
								onClick={handleUploadClick}
								className='active'
								style={{ cursor: 'pointer' }}
							>
								<ImageOutlinedIcon fontSize='small' />
								<VisuallyHiddenInput
									ref={fileInputRef}
									onFileSelect={handleFileSelect}
								/>
								Cover
							</SidebarItem>
							<SidebarItem>
								<AttachFileOutlinedIcon fontSize='small' />
								Attachment
							</SidebarItem>
							<SidebarItem>
								<LocalOfferOutlinedIcon fontSize='small' />
								Labels
							</SidebarItem>
							<SidebarItem>
								<TaskAltOutlinedIcon fontSize='small' />
								Checklist
							</SidebarItem>
							<SidebarItem>
								<WatchLaterOutlinedIcon fontSize='small' />
								Dates
							</SidebarItem>
							<SidebarItem>
								<AutoFixHighOutlinedIcon fontSize='small' />
								Custom Fields
							</SidebarItem>
						</Stack>

						<Divider sx={{ my: 2 }} />

						<Typography
							sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
						>
							Power-Ups
						</Typography>
						<Stack direction='column' spacing={1}>
							<SidebarItem>
								<AspectRatioOutlinedIcon fontSize='small' />
								Card Size
							</SidebarItem>
							<SidebarItem>
								<AddToDriveOutlinedIcon fontSize='small' />
								Google Drive
							</SidebarItem>
							<SidebarItem>
								<AddOutlinedIcon fontSize='small' />
								Add Power-Ups
							</SidebarItem>
						</Stack>

						<Divider sx={{ my: 2 }} />

						<Typography
							sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}
						>
							Actions
						</Typography>
						<Stack direction='column' spacing={1}>
							<SidebarItem>
								<ArrowForwardOutlinedIcon fontSize='small' />
								Move
							</SidebarItem>
							<SidebarItem>
								<ContentCopyOutlinedIcon fontSize='small' />
								Copy
							</SidebarItem>
							<SidebarItem>
								<AutoAwesomeOutlinedIcon fontSize='small' />
								Make Template
							</SidebarItem>
							<SidebarItem>
								<ArchiveOutlinedIcon fontSize='small' />
								Archive
							</SidebarItem>
							<SidebarItem>
								<ShareOutlinedIcon fontSize='small' />
								Share
							</SidebarItem>
						</Stack>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	)
}

export default ActiveCard
