import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { VerificationTokenAPI } from '~/apis/user.api'
import Loading from '~/components/cores/loading'
import { PATH_APP } from '~/utils/constants'

const VerificationToken = () => {
	const [searchParams] = useSearchParams()
	const { email, token } = Object.fromEntries(searchParams)
	const [verified, setVerified] = useState(false)

	useEffect(() => {
		VerificationTokenAPI({ email, token }).then(() => {
			setVerified(true)
		})
	}, [email, token])

	if (!email && !token) {
		return <Navigate to={PATH_APP.TO_NOT_FOUND} />
	}

	if (!verified) {
		return (
			<Loading message='In progress verification... Please wait a second' />
		)
	}

	return (
		<Navigate to={`${PATH_APP.LOGIN}?verifiedEmail=${email}`} replace={true} />
	)
}

export default VerificationToken
