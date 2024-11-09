// Date: 09/18/21
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Box from '@mui/material/Box'
import { IColumn } from '~/interfaces/board.interface'
import Cards from '../cards'
import FooterColumn from '../column-footer'
import HeaderColumn from '../column-header'

interface props {
	column: IColumn
	handleAddCard: (columnId: string, title: string) => Promise<void>
}

const Column = ({ column, handleAddCard }: props) => {
	// drag and drop
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: column?._id, data: { ...column } })

	const dndkitColumnStyle = {
		touchAction: 'none',
		transform: CSS.Translate.toString(transform),
		transition,
		height: '100%',
		opacity: isDragging ? 0.5 : 1,
	}

	return (
		<div ref={setNodeRef} {...attributes} style={dndkitColumnStyle}>
			<Box
				{...listeners}
				sx={{
					minWidth: '350px',
					maxWidth: '350px',
					backgroundColor: (theme) =>
						theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
					ml: 3,
					height: 'fit-content !important',
					borderRadius: '6px',
					maxHeight: (theme) =>
						`calc(${theme.appSetting.boardBarContentHeight} - ${theme.spacing(
							5,
						)})`,
				}}
			>
				{/* header */}
				<HeaderColumn title={column?.title} />

				{/* card  */}

				<Cards cards={column.cards} />

				{/* footer */}
				<FooterColumn handleAddCard={handleAddCard} columnId={column._id} />
			</Box>
		</div>
	)
}

export default Column
