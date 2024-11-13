import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { ICard } from '~/interfaces/board.interface'
import CardItem from '../card-item'

interface props {
	cards: ICard[]
}

const Cards = ({ cards }: props) => {
	if (!cards) return

	const items = cards?.map((card: ICard) => card._id)
	return (
		<SortableContext items={items} strategy={verticalListSortingStrategy}>
			<Box
				sx={{
					overflowY: 'auto',
					p: '8px 5px',
					m: '4px 4px',
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					maxHeight: (theme) =>
						`calc(${theme.appSetting.columnContentHeight} - ${theme.spacing(
							5,
						)})`,
				}}
			>
				{cards?.map((card: ICard) => (
					<CardItem key={card._id} card={card} />
				))}
			</Box>
		</SortableContext>
	)
}

export default Cards
