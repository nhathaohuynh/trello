import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { ICard } from '~/interfaces/board.interface'
import CardItem from '../card-item'

interface props {
	cards: ICard[]
}

const Cards = ({ cards }: props) => {
	const items = cards?.map((card: ICard) => card._id)
	return (
		<SortableContext items={items} strategy={verticalListSortingStrategy}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					p: '8px 5px',
					m: '5px 5px',
					overflowX: 'hidden',
					overflowY: 'auto',
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
