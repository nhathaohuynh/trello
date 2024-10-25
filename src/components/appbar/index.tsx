import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import LightMode from '@mui/icons-material/LightMode'
import SettingsBrightness from '@mui/icons-material/SettingsBrightness'
import { useColorScheme } from '@mui/material'
import Box from '@mui/material/Box'
import SelectItem from '../cores/select'

function Appbar() {
	const { mode, setMode } = useColorScheme()
	const items = [
		{ value: 'light', label: 'Light', icon: LightMode },
		{ value: 'dark', label: 'Dark', icon: DarkModeOutlined },
		{ value: 'system', label: 'System', icon: SettingsBrightness },
	]
	const handleOnChnage = (value: string) => {
		setMode(value as 'light' | 'dark' | 'system')
	}
	return (
		<Box
			sx={{
				backgroundColor: 'primary.light',
				width: '100%',
				height: (theme) => theme.appSetting.appBarHeight,
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<SelectItem
				label='Mode'
				value={mode ?? 'light'}
				items={items}
				onChange={handleOnChnage}
			/>
		</Box>
	)
}

export default Appbar
