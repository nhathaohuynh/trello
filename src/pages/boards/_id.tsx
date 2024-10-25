import Container from '@mui/material/Container'
import Appbar from '~/components/appbar'
import BoardBar from './board-bar'
import BoardContent from './board-content'

function Board() {
	return (
		<Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
			<Appbar />
			<BoardBar />
			<BoardContent />
		</Container>
	)
}

export default Board
