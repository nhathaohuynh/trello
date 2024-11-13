import { Box, SvgIconTypeMap } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import Select from '@mui/material/Select'

interface props {
	value: string
	items: {
		value: string
		label: string
		icon?: OverridableComponent<SvgIconTypeMap> & { muiName: string }
	}[]
	onChange: (value: string) => void
}

export default function SelectItem({ value, items, onChange }: props) {
	return (
		<FormControl size='small' sx={{ m: 1, minWidth: '120px' }}>
			<Select
				labelId='select-label'
				id='select-small'
				value={value}
				onChange={(e) => onChange(e.target.value as string)}
				sx={{
					color: 'white',
					border: '1px solid white',
					'& svg': {
						color: 'white',
					},
					'& fieldset': {
						border: 'none !important',
					},
				}}
			>
				{items.map((item, index) => (
					<MenuItem
						key={index}
						value={item.value}
						sx={{
							p: 1,
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 1,
							}}
						>
							{item.icon ? <item.icon fontSize='small' /> : null}
							{item.label}
						</Box>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}
