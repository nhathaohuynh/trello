import { Box, SvgIconTypeMap } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import Select from '@mui/material/Select'

interface props {
	label: string
	value: string
	items: {
		value: string
		label: string
		icon?: OverridableComponent<SvgIconTypeMap> & { muiName: string }
	}[]
	onChange: (value: string) => void
}

export default function SelectItem({ label, value, items, onChange }: props) {
	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
			<InputLabel id='select-label'>{label}</InputLabel>
			<Select
				labelId='select-label'
				id='select-small'
				label={label}
				value={value}
				onChange={(e) => onChange(e.target.value as string)}
			>
				{items.map((item, index) => (
					<MenuItem key={index} value={item.value}>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							{item.icon ? <item.icon fontSize='small' /> : null}
							{item.label}
						</Box>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}
