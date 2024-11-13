import {
	SortableContext,
	horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import { IColumn } from '~/interfaces/board.interface'
import Column from '../column'

interface Props {
	columns: IColumn[]
	loading: boolean
}

const Columns = ({ columns, loading }: Props) => {
	const items = !!columns?.length
		? columns?.map((column: IColumn) => column._id)
		: []

	const renderSkeletons = () => (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				overflowX: 'auto',
				overflowY: 'hidden',
				gap: 3,
				padding: 2,
			}}
		>
			{Array.from(new Array(5)).map((_, index) => (
				<Box
					key={index}
					sx={{
						minWidth: '345px',
						maxWidth: '345px',
						height: '100%',
						borderRadius: '8px',
						bgcolor: 'background.paper',
						padding: 2,
						display: 'flex',
						flexDirection: 'column',
						gap: 1,
					}}
				>
					<Skeleton variant='rectangular' width='100%' height={60} />
					<Skeleton
						variant='rectangular'
						width='100%'
						height={400}
						sx={{
							flexGrow: 1,
						}}
					/>
					<Skeleton variant='rectangular' width='100%' height={60} />
				</Box>
			))}
		</Box>
	)

	return (
		<SortableContext items={items} strategy={horizontalListSortingStrategy}>
			<Box
				sx={{
					width: '100%',
					p: '10px 0',
					borderRadius: '6px',
					overflowY: 'hidden',
					height: (theme) => theme.appSetting.boardBarContentHeight,
				}}
			>
				{loading ? (
					renderSkeletons()
				) : (
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
						{!!columns?.length &&
							columns.map((column: IColumn) => (
								<Column key={column._id} column={column} />
							))}
					</Box>
				)}
			</Box>
		</SortableContext>
	)
}

export default Columns
