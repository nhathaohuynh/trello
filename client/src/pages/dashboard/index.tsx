import { Dashboard, ListAlt } from '@mui/icons-material'
import NoteAdd from '@mui/icons-material/NoteAdd'
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Appbar from '~/components/appbar'
import { PATH_APP } from '~/utils/constants'
import NewBoardModal from './components/create-board-modal'
import BoardList from './components/list-board'

const Sidebar = () => {
	const sidebarWidth = 350
	const [activeItem, setActiveItem] = useState('Boards')

	const location = useLocation()
	const query = new URLSearchParams(location.search)
	const page = parseInt(query.get('page') || '1', 10)

	// Function to handle item click and set the active item
	const handleItemClick = (item: string) => {
		if (item === 'Create') {
			handleOpenModal()
		}
		setActiveItem(item)
	}

	const [isModalOpen, setModalOpen] = useState(false)

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	const handleCreateBoard = (board: { title: string; description: string }) => {
		// Logic to add the new board (e.g., send data to an API or update local state)
		console.log('New board created:', board)
	}

	return (
		<>
			{/* Appbar at the top */}

			<Appbar />

			{/* Sidebar */}
			<Box
				sx={{
					width: sidebarWidth,
					height: '100vh',
					position: 'fixed',
					top: 64, // Adjust to sit below the Appbar
					left: 0,
					paddingTop: 2,
					fontSize: '0.875rem',
				}}
			>
				<List
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 1,
						px: 2,
					}}
				>
					{/* "Boards" item */}
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => handleItemClick('Boards')}
							sx={{
								backgroundColor:
									activeItem === 'Boards' ? blue[100] : 'transparent',
								color:
									activeItem === 'Boards' ? 'primary.mainChannel' : 'inherit',
								boderRadius: '4px',
							}}
						>
							<ListItemIcon
								sx={{
									color:
										activeItem === 'Boards' ? 'primary.mainChannel' : 'inherit',
								}}
							>
								<Dashboard fontSize='medium' />
							</ListItemIcon>
							<ListItemText
								primary='Boards'
								primaryTypographyProps={{ variant: 'body2' }}
								sx={{
									'& p': {
										fontSize: '0.875rem',
									},
								}}
							/>
						</ListItemButton>
					</ListItem>

					{/* "Template" item */}
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => handleItemClick('Template')}
							sx={{
								backgroundColor:
									activeItem === 'Template' ? blue[100] : 'transparent',
								color:
									activeItem === 'Template' ? 'primary.mainChannel' : 'inherit',
								borderRadius: '4px',
							}}
						>
							<ListItemIcon
								sx={{
									color:
										activeItem === 'Template'
											? 'primary.mainChannel'
											: 'inherit',
								}}
							>
								<ListAlt fontSize='medium' />
							</ListItemIcon>
							<ListItemText
								primary='Template'
								primaryTypographyProps={{ variant: 'body2' }}
								sx={{
									'& p': {
										fontSize: '0.875rem',
									},
								}}
							/>
						</ListItemButton>
					</ListItem>

					<Divider />

					<ListItem disablePadding>
						<ListItemButton
							onClick={() => handleItemClick('Create')}
							sx={{
								backgroundColor:
									activeItem === 'Create' ? blue[100] : 'transparent',
								color:
									activeItem === 'Create' ? 'primary.mainChannel' : 'inherit',
								borderRadius: '4px',
							}}
						>
							<ListItemIcon
								sx={{
									color:
										activeItem === 'Create' ? 'primary.mainChannel' : 'inherit',
								}}
							>
								<NoteAdd fontSize='medium' />
							</ListItemIcon>
							<ListItemText
								primary='Create board'
								primaryTypographyProps={{ variant: 'body2' }}
								sx={{
									'& p': {
										fontSize: '0.875rem',
									},
								}}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Box>

			{/* Main Content */}
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					marginLeft: `${sidebarWidth}px`,
					padding: 2,
				}}
			>
				<Typography
					variant='h4'
					sx={{
						color: 'primary.mainChannel',
						fontWeight: '600',
						p: 1,
					}}
				>
					Your Boards
				</Typography>
				<Divider sx={{ my: 1 }} />
				<BoardList />
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						mt: 3,
					}}
				>
					<Pagination
						page={page}
						count={10}
						renderItem={(item) => (
							<PaginationItem
								component={Link}
								to={`${PATH_APP.DASHBOARD}${
									item.page === 1 ? '' : `?page=${item.page}`
								}`}
								{...item}
							/>
						)}
					/>
				</Box>

				{activeItem === 'Create' && (
					<NewBoardModal
						open={isModalOpen}
						onClose={handleCloseModal}
						onCreate={handleCreateBoard}
					/>
				)}

				{/* Add your main content here */}
			</Box>
		</>
	)
}

export default Sidebar
