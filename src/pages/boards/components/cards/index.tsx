import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { CardType } from '~/apis/mock-data'
import CardItem from '../card-item'

interface props {
	cards: CardType[]
}

const Cards = ({ cards }: props) => {
	const items = cards?.map((card: CardType) => card._id)
	return (
		<SortableContext items={items} strategy={verticalListSortingStrategy}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					p: '8px 5px',
					m: '0 5px',
					overflowX: 'hidden',
					overflowY: 'auto',
					maxHeight: (theme) =>
						`calc(${theme.appSetting.columnContentHeight} - ${theme.spacing(
							5,
						)})`,
				}}
			>
				{cards?.map((card: CardType) => (
					<CardItem key={card._id} card={card} />
				))}
			</Box>
		</SortableContext>
	)
}

export default Cards
