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
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createBoardAPI, getListBoardsAPI } from '~/apis/board.api'
import Appbar from '~/components/appbar'
import { IBoard } from '~/interfaces/board.interface'
import {
	DEFAULT_ITEM__PER_PAGE,
	DEFAULT_PAGE,
	PATH_APP,
} from '~/utils/constants'
import NewBoardModal from './components/create-board-modal'
import BoardList from './components/list-board'

const sidebarWidth = 300

const ITEM_SIDEBAR = {
	BOARD: 'Boards',
	TEAMPHATE: 'Template',
	CREATE: 'Add new board',
}

const Boards = () => {
	const [activeItem, setActiveItem] = useState(ITEM_SIDEBAR.BOARD)
	const location = useLocation()
	const query = new URLSearchParams(location.search)
	const page = parseInt(query.get('page') || DEFAULT_PAGE.toString(), 10)
	const [isModalOpen, setModalOpen] = useState(false)
	const [boards, setBoards] = useState<IBoard[] | null>(null)
	const [totalBoards, setTotalBoards] = useState(DEFAULT_PAGE)

	const fetchBoardsData = () => {
		getListBoardsAPI(location.search).then((data) => {
			setBoards(data.boards || [])
			setTotalBoards(data.total || DEFAULT_PAGE)
		})
	}

	useEffect(() => {
		fetchBoardsData()
	}, [location.search])

	const handleItemClick = (item: string) => {
		if (item === ITEM_SIDEBAR.CREATE) {
			handleOpenModal()
		}
		setActiveItem(item)
	}

	const handleOpenModal = () => {
		setModalOpen(true)
	}

	const handleCloseModal = () => {
		setModalOpen(false)
	}

	const handleCreateBoard = (board: {
		title: string
		description: string
		cover?: File | null | undefined
		type: string
	}) => {
		const formData = new FormData()
		formData.append('title', board.title)
		formData.append('description', board.description)
		formData.append('type', board.type)
		if (board.cover) {
			formData.append('cover', board.cover)
		}

		toast
			.promise(createBoardAPI(formData), {
				pending: 'Creating board...',
				success: 'Board created successfully!',
			})
			.then(() => {
				fetchBoardsData()
			})
	}

	return (
		<>
			{/* Appbar at the top */}
			<Box
				sx={{
					width: '100%',
					position: 'fixed',
					top: 0, // Adjust to sit below the Appbar
					left: 0,
				}}
			>
				<Appbar />
			</Box>

			{/* Sidebar */}
			<Box
				sx={{
					width: sidebarWidth,
					height: '100vh',
					position: 'fixed',
					top: (theme) => theme.appSetting.appBarHeight, // Adjust to sit below the Appbar
					left: 0,
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
							onClick={() => handleItemClick(ITEM_SIDEBAR.BOARD)}
							sx={{
								backgroundColor:
									activeItem === ITEM_SIDEBAR.BOARD ? blue[100] : 'transparent',
								color:
									activeItem === ITEM_SIDEBAR.BOARD
										? 'primary.mainChannel'
										: 'inherit',
								borderRadius: '4px',
							}}
						>
							<ListItemIcon
								sx={{
									color:
										activeItem === ITEM_SIDEBAR.BOARD
											? 'primary.mainChannel'
											: 'inherit',
								}}
							>
								<Dashboard fontSize='medium' />
							</ListItemIcon>
							<ListItemText
								primary={ITEM_SIDEBAR.BOARD}
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
							onClick={() => handleItemClick(ITEM_SIDEBAR.TEAMPHATE)}
							sx={{
								backgroundColor:
									activeItem === ITEM_SIDEBAR.TEAMPHATE
										? blue[100]
										: 'transparent',
								color:
									activeItem === ITEM_SIDEBAR.TEAMPHATE
										? 'primary.mainChannel'
										: 'inherit',
								borderRadius: '4px',
							}}
						>
							<ListItemIcon
								sx={{
									color:
										activeItem === ITEM_SIDEBAR.TEAMPHATE
											? 'primary.mainChannel'
											: 'inherit',
								}}
							>
								<ListAlt fontSize='medium' />
							</ListItemIcon>
							<ListItemText
								primary={ITEM_SIDEBAR.TEAMPHATE}
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
							onClick={() => handleItemClick(ITEM_SIDEBAR.CREATE)}
							sx={{
								backgroundColor:
									activeItem === ITEM_SIDEBAR.CREATE
										? blue[100]
										: 'transparent',
								color:
									activeItem === ITEM_SIDEBAR.CREATE
										? 'primary.mainChannel'
										: 'inherit',
								borderRadius: '4px',
							}}
						>
							<ListItemIcon
								sx={{
									color:
										activeItem === ITEM_SIDEBAR.CREATE
											? 'primary.mainChannel'
											: 'inherit',
								}}
							>
								<NoteAdd fontSize='medium' />
							</ListItemIcon>
							<ListItemText
								primary={ITEM_SIDEBAR.CREATE}
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
					marginTop: (theme) => theme.appSetting.appBarHeight,
					marginLeft: `${sidebarWidth}px`,
					padding: 2,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Typography
						variant='h4'
						sx={{
							color: 'primary.mainChannel',
							fontWeight: '600',
						}}
					>
						Your Boards
					</Typography>
					{totalBoards > 0 && (
						<Pagination
							page={page}
							count={Math.ceil(totalBoards / DEFAULT_ITEM__PER_PAGE)}
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
					)}
				</Box>

				<Divider sx={{ my: 1 }} />
				<BoardList boards={boards!} />

				{activeItem === ITEM_SIDEBAR.CREATE && (
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

export default Boards
