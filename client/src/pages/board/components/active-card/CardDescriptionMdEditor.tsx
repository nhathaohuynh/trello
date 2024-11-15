import { Save } from '@mui/icons-material'
import EditNoteIcon from '@mui/icons-material/EditNote'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'
import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
import rehypeSanitize from 'rehype-sanitize'

/**
 * Vài ví dụ Markdown từ lib
 * https://codesandbox.io/embed/markdown-editor-for-react-izdd6?fontsize=14&hidenavigation=1&theme=dark
 */

interface CardDescriptionMdEditorProps {
	description: string | null
	handelUpdateDescription: (description: string) => void
}
function CardDescriptionMdEditor({
	description,
	handelUpdateDescription,
}: CardDescriptionMdEditorProps) {
	// Lấy giá trị 'dark', 'light' hoặc 'system' mode từ MUI để support phần Markdown bên dưới: data-color-mode={mode}
	// https://www.npmjs.com/package/@uiw/react-md-editor#support-dark-modenight-mode
	const { mode } = useColorScheme()

	// State xử lý chế độ Edit và chế độ View
	const [markdownEditMode, setMarkdownEditMode] = useState(false)
	// State xử lý giá trị markdown khi chỉnh sửa
	const [cardDescription, setCardDescription] = useState(description || '')

	const updateCardDescription = () => {
		setMarkdownEditMode(false)
		if (!cardDescription.trim()) return
		if (cardDescription !== description) {
			handelUpdateDescription(cardDescription)
		}
	}

	return (
		<Box sx={{ mt: -4 }}>
			{markdownEditMode ? (
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<Button
						sx={{ alignSelf: 'flex-end' }}
						onClick={updateCardDescription}
						className='interceptor-loading'
						type='button'
						variant='contained'
						size='small'
						color='info'
					>
						<Save
							sx={{
								fontSize: '20px',
							}}
						/>
					</Button>
					<Box data-color-mode={mode}>
						<MDEditor
							value={cardDescription}
							onChange={(e) => setCardDescription(e || '')}
							previewOptions={{ rehypePlugins: [[rehypeSanitize]] }} // https://www.npmjs.com/package/@uiw/react-md-editor#security
							height={400}
							preview='edit' // Có 3 giá trị để set tùy nhu cầu ['edit', 'live', 'preview']
							// hideToolbar={true}
						/>
					</Box>
				</Box>
			) : (
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					<Button
						sx={{ alignSelf: 'flex-end' }}
						onClick={() => setMarkdownEditMode(true)}
						type='button'
						className='interceptor-loading'
						variant='contained'
						color='info'
						size='small'
					>
						<EditNoteIcon />
					</Button>
					<Box data-color-mode={mode}>
						<MDEditor.Markdown
							source={cardDescription}
							style={{
								whiteSpace: 'pre-wrap',
								padding: cardDescription ? '10px' : '0px',
								border: cardDescription
									? '0.5px solid rgba(0, 0, 0, 0.2)'
									: 'none',
								borderRadius: '8px',
							}}
						/>
					</Box>
				</Box>
			)}
		</Box>
	)
}

export default CardDescriptionMdEditor
