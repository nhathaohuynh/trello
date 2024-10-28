import Box from '@mui/material/Box'
import CardItem from '../card-item'

interface props {
	cards: any
}

const Cards = ({ cards }: props) => {
	return (
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
					`calc(${theme.appSetting.columnContentHeight} - ${theme.spacing(5)})`,
			}}
		>
			{cards?.map((card: any) => (
				<CardItem key={card._id} card={card} />
			))}
		</Box>
	)
}

export default Cards
