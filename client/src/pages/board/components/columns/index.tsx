import {
	SortableContext,
	horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { IColumn } from '~/interfaces/board.interface'
import Column from '../column'

interface props {
	columns: IColumn[]
}

const Columns = ({ columns }: props) => {
	const items = columns?.map((column: IColumn) => column._id)

	return (
		<SortableContext items={items} strategy={horizontalListSortingStrategy}>
			<Box
				sx={{
					width: '100%',
					p: '10px 0',
					borderRadius: '6px',
					height: (theme) => theme.appSetting.boardBarContentHeight,
				}}
			>
				<Box
					sx={{
						bgColor: 'inherit',
						width: '100%',
						height: '100%',
						display: 'flex',
						overflowX: 'auto',
						overflowY: 'hidden',
						'&::-webkit-scrollbar-track': {
							m: 3,
						},
					}}
				>
					{columns?.map((column: IColumn) => (
						<Column key={column._id} column={column} />
					))}

					{/* {isToggleColumForm ? (
						<Box
							sx={{
								minWidth: '350px',
								maxWidth: '350px',
								mx: 2,
								p: 1,
								borderRadius: '6px',
								height: 'fit-content',
								bgcolor: 'primary.mainChannel',
								display: 'flex',
							}}
						>
							<TextField
								sx={{
									width: '100%',
									'& input': {
										color: 'white',
										height: '14px',
										fontSize: '12px',
									},
									'& label': {
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
								ref={inputRef}
								type='text'
								placeholder='Enter a title for column...'
								autoFocus
								variant='outlined'
								value={columTitle}
								onChange={(e) => setColumTitle(e.target.value)}
							/>

							<Button
								className='interceptor-loading'
								sx={{
									color: '#ffffff',
									fontWeight: 400,
									fontSize: '10px',
									bgcolor: 'success.main',
									mx: '4px',
								}}
								onClick={() => {
									if (!columTitle)
										return toast.error('Please enter a title for column')
									handleAddColumn(columTitle)
									setColumTitle('')
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
									setIsTonggleColumForm(false)
								}}
							>
								Cancel
							</Button>
						</Box>
					) : (
						<Box
							sx={{
								minWidth: '300px',
								maxWidth: '300px',
								mx: 3,
								borderRadius: '6px',
								height: 'fit-content',
								bgcolor: 'primary.mainChannel',
							}}
							onClick={() => setIsTonggleColumForm(true)}
						>
							<Button
								sx={{
									width: '100%',
									fontSize: '0.875rem',
									color: '#ffffff',
									px: 2.5,
									py: 1,
								}}
								startIcon={<NoteAdd />}
							>
								New column
							</Button>
						</Box>
					)} */}
				</Box>
			</Box>
		</SortableContext>
	)
}

export default Columns
