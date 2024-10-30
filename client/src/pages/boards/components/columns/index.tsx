import {
	SortableContext,
	horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import NoteAdd from '@mui/icons-material/NoteAdd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { ColumnType } from '~/apis/mock-data'
import Column from '../column'

interface props {
	columns: ColumnType[]
}

const Columns = ({ columns }: props) => {
	const [columTitle, setColumTitle] = useState<string | null>()
	const [isToggleColumForm, setIsTonggleColumForm] = useState<boolean>(false)
	const items = columns?.map((column: ColumnType) => column._id)
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
					{columns?.map((column: ColumnType) => (
						<Column key={column._id} column={column} />
					))}

					{isToggleColumForm ? (
						<Box
							sx={{
								minWidth: '300px',
								maxWidth: '300px',
								mx: 2,
								p: 1,
								borderRadius: '6px',
								height: 'fit-content',
								bgcolor: 'primary.mainChannel',
								display: 'flex',
								gap: 1,
							}}
						>
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
								label='Enter column title'
								autoFocus
								variant='outlined'
								value={columTitle}
								onChange={(e) => setColumTitle(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										setColumTitle('')
										setIsTonggleColumForm(false)
									}
								}}
							/>
						</Box>
					) : (
						<Box
							sx={{
								minWidth: '300px',
								maxWidth: '250px',
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
								Add new column
							</Button>
						</Box>
					)}
				</Box>
			</Box>
		</SortableContext>
	)
}

export default Columns
