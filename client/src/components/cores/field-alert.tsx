import Alert from '@mui/material/Alert'
import { FieldError, FieldValues } from 'react-hook-form'

interface FieldErrorAlertProps {
	errors: FieldValues | undefined // or you can use FieldErrors if you want to be more strict
	fieldName: string
}

const FieldErrorAlert: React.FC<FieldErrorAlertProps> = ({
	errors,
	fieldName,
}) => {
	if (!errors || !errors[fieldName]) return null

	const fieldError = errors[fieldName] as FieldError

	return (
		<Alert
			severity='error'
			sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}
		>
			{fieldError?.message}
		</Alert>
	)
}

export default FieldErrorAlert
