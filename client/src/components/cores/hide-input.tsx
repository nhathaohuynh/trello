import React, { forwardRef, useImperativeHandle, useRef } from 'react'

interface VisuallyHiddenInputProps {
	onFileSelect?: (file: File) => void
}

const VisuallyHiddenInput = forwardRef(
	({ onFileSelect }: VisuallyHiddenInputProps, ref) => {
		const inputRef = useRef<HTMLInputElement | null>(null)

		const handleButtonClick = () => {
			inputRef.current?.click()
		}

		const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0]
			if (file && onFileSelect) {
				onFileSelect(file)
			}
		}

		useImperativeHandle(ref, () => ({
			triggerFileInput: handleButtonClick,
		}))

		return (
			<div>
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					style={{ display: 'none' }}
					onChange={handleFileChange}
				/>
			</div>
		)
	},
)

export default VisuallyHiddenInput
