import NoteAdd from '@mui/icons-material/NoteAdd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from '../column'

interface props {
	columns: any
}

const Columns = ({ columns }: props) => {
	return (
		<Box
			sx={{
				width: '100%',
				p: '10px 0',
				height: (theme) => theme.appSetting.boardBarContentHeight,
			}}
		>
			<Box
				sx={{
					bgColor: 'inherit',
					width: '100%',
					height: '100%',
					display: 'flex',
					overflowX: 'auto',
					overflowY: 'hidden',
					'&::-webkit-scrollbar-track': {
						m: 3,
					},
				}}
			>
				{columns?.map((column: any) => (
					<Column key={column._id} column={column} />
				))}

				<Box
					sx={{
						minWidth: '200px',
						maxWidth: '200px',
						mx: 3,
						borderRadius: '6px',
						height: 'fit-content',
						bgcolor: 'primary.mainChannel',
					}}
				>
					<Button
						sx={{
							width: '100%',
							fontSize: '0.875rem',
							color: '#ffffff',
							px: 2.5,
							py: 1,
						}}
						startIcon={<NoteAdd />}
					>
						Add new column
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

export default Columns
