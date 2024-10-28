// Date: 09/18/21
import Box from '@mui/material/Box'
import { mapOrder } from '~/utils/formatter'
import Cards from '../cards'
import FooterColumn from '../column-footer'
import HeaderColumn from '../column-header'

interface props {
	column: any
}

const Column = ({ column }: props) => {
	const sortedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
	return (
		<Box
			sx={{
				minWidth: '300px',
				maxWidth: '300px',
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

			<Cards cards={sortedCards} />

			{/* footer */}

			<FooterColumn />
		</Box>
	)
}

export default Column
