import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import moment from 'moment'

import { useSelector } from 'react-redux'
import { IComment } from '~/interfaces/comment.interface'
import { selectCurrentUser } from '~/redux/user/user.slice'

interface CardActivitySectionProps {
	onCartComment: (comment: { content: string; user: string }) => void
	cardComment: IComment[]
}

function CardActivitySection({
	onCartComment,
	cardComment = [],
}: CardActivitySectionProps) {
	const currentUser = useSelector(selectCurrentUser)

	const handleAddCardComment = (event: React.KeyboardEvent<HTMLDivElement>) => {
		// Bắt hành động người dùng nhấn phím Enter && không phải hành động Shift + Enter
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault() // Thêm dòng này để khi Enter không bị nhảy dòng
			const target = event.target as HTMLInputElement
			if (!target.value) return // Nếu không có giá trị gì thì return không làm gì cả

			// Tạo một biến commend data để gửi api
			const commentToAdd = {
				user: currentUser?._id,
				content: target.value.trim(),
			}
			onCartComment(commentToAdd)
			target.value = '' // Reset lại giá trị của input
		}
	}

	return (
		<Box sx={{ mt: 2 }}>
			{/* Xử lý thêm comment vào Card */}
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
				<Avatar
					sx={{ width: 36, height: 36, cursor: 'pointer' }}
					alt='trungquandev'
					src={currentUser?.avatar}
				/>
				<TextField
					fullWidth
					placeholder='Write a comment...'
					type='text'
					variant='outlined'
					multiline
					onKeyDown={handleAddCardComment}
				/>
			</Box>

			{cardComment.length > 0 &&
				cardComment.map((comment, index) => (
					<Box
						sx={{ display: 'flex', gap: 1, width: '100%', mb: 1.5 }}
						key={index}
					>
						<Tooltip title={comment?.user?.username}>
							<Avatar
								sx={{ width: 36, height: 36, cursor: 'pointer' }}
								alt={comment?.user?.username}
								src={comment?.user?.avatar}
							/>
						</Tooltip>
						<Box sx={{ width: 'inherit' }}>
							<Typography variant='body2' sx={{ fontWeight: 'bold', mr: 1 }}>
								{comment?.user?.username}
							</Typography>

							<Typography variant='body2' sx={{ fontSize: '12px' }}>
								{moment().format('llll')}
							</Typography>

							<Box
								sx={{
									display: 'block',
									bgcolor: (theme) =>
										theme.palette.mode === 'dark' ? '#33485D' : 'white',
									p: '8px 12px',
									mt: '4px',
									border: '0.5px solid rgba(0, 0, 0, 0.2)',
									borderRadius: '4px',
									wordBreak: 'break-word',
									boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)',
								}}
							>
								{comment?.content}
							</Box>
						</Box>
					</Box>
				))}
		</Box>
	)
}

export default CardActivitySection
