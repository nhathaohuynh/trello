import Box from '@mui/material/Box'
import { mapOrder } from '~/utils/formatter'
import Columns from '../columns'

interface props {
	board: any
}

const BoardContent = ({ board }: props) => {
	const sortedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
	return (
		<Box
			sx={{
				width: '100%',
				// p: '10px 0',
				height: (theme) => theme.appSetting.boardBarContentHeight,
			}}
		>
			<Columns columns={sortedColumns} />
		</Box>
	)
}

export default BoardContent
