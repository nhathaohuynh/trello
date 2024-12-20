// TrungQuanDev: https://youtube.com/@trungquandev
import TextField from '@mui/material/TextField'
import { useState } from 'react'

// Một Trick xử lý css khá hay trong việc làm UI UX khi cần ẩn hiện một cái input: Hiểu đơn giản là thay vì phải tạo biến State để chuyển đổi qua lại giữa thẻ Input và Text thông thường thì chúng ta sẽ CSS lại cho cái thẻ Input trông như text bình thường, chỉ khi click và focus vào nó thì style lại trở về như cái input ban đầu.
// Controlled Input trong MUI: https://mui.com/material-ui/react-text-field/#uncontrolled-vs-controlled
interface ToggleFocusInputProps {
	value: string
	onChangedValue: (value: string) => void
	inputFontSize?: string
	color: (theme: any) => 'white' | 'black'
}

function ToggleFocusInput({
	value,
	onChangedValue,
	inputFontSize = '14px',
	color,
	...props
}: ToggleFocusInputProps) {
	const [inputValue, setInputValue] = useState(value)

	// Blur là khi chúng ta không còn Focus vào phần tử nữa thì sẽ trigger hành động ở đây.
	const triggerBlur = () => {
		// Support Trim cái dữ liệu State inputValue cho đẹp luôn sau khi blur ra ngoài
		setInputValue(inputValue.trim())

		// Nếu giá trị không có gì thay đổi hoặc Nếu user xóa hết nội dung thì set lại giá trị gốc ban đầu theo value từ props và return luôn không làm gì thêm
		if (!inputValue || inputValue.trim() === value) {
			setInputValue(value)
			return
		}

		onChangedValue(inputValue)
	}

	return (
		<TextField
			id='toggle-focus-input-controlled'
			fullWidth
			variant='outlined'
			size='small'
			value={inputValue}
			onChange={(event) => {
				setInputValue(event.target.value)
			}}
			onBlur={triggerBlur}
			{...props}
			sx={{
				'& input': {
					fontSize: inputFontSize,
					fontWeight: '500',
					color: color,
				},
				'& .MuiOutlinedInput-root': {
					backgroundColor: 'transparent',
					'& fieldset': { borderColor: 'transparent' },
				},
				'& .MuiOutlinedInput-root:hover': {
					borderColor: 'transparent',
					'& fieldset': { borderColor: 'transparent' },
				},
				'& .MuiOutlinedInput-root.Mui-focused': {
					backgroundColor: (theme) =>
						theme.palette.mode === 'dark' ? 'transparent' : 'transparent',
					'& fieldset': { border: 'none' },
				},
				'& .MuiOutlinedInput-input': {
					px: '6px',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
				},
			}}
		/>
	)
}

export default ToggleFocusInput
