import Container from '@mui/material/Container'
import { mockData } from '~/apis/mock-data'
import Appbar from '~/components/appbar'
import BoardBar from './components/board-bar'
import BoardContent from './components/board-content'

function Board() {
	return (
		<Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
			<Appbar />
			<BoardBar board={mockData.board} />
			<BoardContent board={mockData.board} />
		</Container>
	)
}

export default Board
