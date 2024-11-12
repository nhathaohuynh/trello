import Person from '@mui/icons-material/Person'
import Security from '@mui/icons-material/Security'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Appbar from '~/components/appbar'
import { PATH_APP } from '~/utils/constants'
import { Account } from './components/account'
import SecurityComponent from './components/security'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

const Setting = () => {
	const location = useLocation()
	const defaultValue = location.pathname.includes('/account') ? 0 : 1
	const navigate = useNavigate()
	const [activeTab, setActiveTab] = useState(defaultValue)

	const handleChange = (_: React.SyntheticEvent, selectedTab: number) => {
		navigate(
			selectedTab === 0 ? PATH_APP.SETTING_ACCOUNT : PATH_APP.SETTING_SECURITY,
		)
		setActiveTab(selectedTab)
	}
	return (
		<>
			<Appbar />
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={activeTab}
						onChange={handleChange}
						aria-label='tabs-profile'
						sx={{
							px: 3,
							height: '60px',
							button: {
								minWidth: 'unset',
								textTransform: 'none',
								p: 0,
								px: 2,
								fontSize: '14px',
								fontWeight: '500',
							},
						}}
					>
						<Tab
							icon={<Person />}
							iconPosition='start'
							label='Account'
							{...a11yProps(0)}
							sx={{ marginRight: 5 }}
						/>
						<Tab
							icon={<Security />}
							iconPosition='start'
							label='Security'
							{...a11yProps(1)}
						/>
					</Tabs>
				</Box>
				<CustomTabPanel value={activeTab} index={0}>
					<Account />
				</CustomTabPanel>
				<CustomTabPanel value={activeTab} index={1}>
					<SecurityComponent />
				</CustomTabPanel>
			</Box>
		</>
	)
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	)
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

export default Setting
