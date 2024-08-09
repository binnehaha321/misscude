import { useCallback, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import {
	Box,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Paper,
	Stack,
	TextField,
	Tooltip,
	Typography
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import InfoIcon from '@mui/icons-material/Info'

import { ISignUp, SignUpValueProps, ValidateFormKey } from '../../types'
import { validate } from '../../utils/validate'
import { useSignup } from '../../hooks/useSignup'

type ShowPasswordType = 'firstTime' | 'reType'
type FormKeyValueProps = [ValidateFormKey, string][]

const Signup = () => {
	const [value, setValue] = useState<Partial<ISignUp>>({
		email: '',
		username: '',
		password: '',
		reTypePassword: ''
	})
	const [showPassword, setShowPassword] = useState<
		Record<ShowPasswordType, boolean>
	>({
		firstTime: false,
		reType: false
	})
	const [error, setError] = useState<Record<ValidateFormKey, string>>({
		email: '',
		username: '',
		password: '',
		reTypePassword: ''
	})

	const { onSignUp, isLoading } = useSignup()

	const onShowPassword = (type: ShowPasswordType) => {
		setShowPassword((prev) => ({ ...prev, [type]: !prev[type] }))
	}

	const executeValidation = useCallback(
		(
			formKeyValues: FormKeyValueProps,
			currentValues: Record<ValidateFormKey, string>
		) => {
			for (const [key, val] of formKeyValues) {
				const errorText = validate(key, val)
				setError((prev) => ({
					...prev,
					[key]: errorText
				}))

				if (
					String(currentValues.password) !==
					String(currentValues.reTypePassword)
				) {
					setError((prev) => ({
						...prev,
						reTypePassword: 'Mật khẩu không khớp'
					}))
				}
			}
			return (
				Object.values(currentValues).every((value) => value) &&
				currentValues.password === currentValues.reTypePassword
			)
		},
		[]
	)

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value: inputVal } = e.currentTarget as {
				name: ValidateFormKey
				value: string
			}

			setValue((prev) => {
				const newValues = {
					...prev,
					[name]: inputVal
				} as Record<ValidateFormKey, string>

				executeValidation([[name, inputVal]], newValues)
				return newValues
			})
		},
		[executeValidation]
	)
	const signup = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			const isAllValidated = executeValidation(
				Object.entries(value) as FormKeyValueProps,
				value as Record<ValidateFormKey, string>
			)

			if (isAllValidated) {
				await onSignUp(value as SignUpValueProps)
			}
		},
		[executeValidation, value, onSignUp]
	)

	return (
		<Stack
			width='100dvw'
			height='100dvh'
			justifyContent='center'
			alignItems='center'
			bgcolor='#eee'
		>
			<Paper
				elevation={4}
				sx={{ p: 2, m: 'auto', width: 400 }}
			>
				<Typography
					variant='h5'
					textAlign='center'
					mb={2}
					fontWeight={600}
				>
					Tạo tài khoản
				</Typography>
				<Box
					component='form'
					noValidate
					autoComplete='off'
					display='flex'
					flexDirection='column'
					onSubmit={signup}
				>
					<FormControl
						sx={{ mb: 2 }}
						variant='outlined'
						required
						error={!!error.email}
					>
						<InputLabel>Email</InputLabel>
						<OutlinedInput
							autoFocus
							required
							onChange={handleChange}
							value={value?.email}
							name='email'
							type='email'
							endAdornment={
								<InputAdornment position='end'>
									<Tooltip title='Email chỉ sẽ dùng để khôi phục mật khẩu'>
										<IconButton
											aria-label='more information'
											edge='end'
										>
											<InfoIcon />
										</IconButton>
									</Tooltip>
								</InputAdornment>
							}
							label='Email'
							// inputRef={passwordInputRef}
						/>
						{error.email && <FormHelperText>{error.email}</FormHelperText>}
					</FormControl>
					<TextField
						label='Tên tài khoản'
						variant='outlined'
						error={!!error.username}
						required
						helperText={error.username ? error?.username : ''}
						sx={{ mb: 2 }}
						onChange={handleChange}
						value={value?.username}
						name='username'
						// inputRef={usernameInputRef}
					/>
					<FormControl
						sx={{ mb: 2 }}
						variant='outlined'
						required
						error={!!error.password}
					>
						<InputLabel>Mật khẩu</InputLabel>
						<OutlinedInput
							required
							onChange={handleChange}
							value={value?.password}
							name='password'
							type={showPassword.firstTime ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => onShowPassword('firstTime')}
										edge='end'
									>
										{showPassword.firstTime ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							}
							label='Mật khẩu'
							// inputRef={passwordInputRef}
						/>
						{error.password && (
							<FormHelperText>{error.password}</FormHelperText>
						)}
					</FormControl>
					<FormControl
						sx={{ mb: 2 }}
						variant='outlined'
						required
						error={!!error.reTypePassword}
					>
						<InputLabel>Xác nhận mật khẩu</InputLabel>
						<OutlinedInput
							required
							onChange={handleChange}
							value={value?.reTypePassword}
							name='reTypePassword'
							type={showPassword.reType ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => onShowPassword('reType')}
										edge='end'
									>
										{showPassword.reType ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label='Xác nhận mật khẩu'
							// inputRef={passwordInputRef}
						/>
						{error.reTypePassword && (
							<FormHelperText>{error.reTypePassword}</FormHelperText>
						)}
					</FormControl>
					<LoadingButton
						variant='contained'
						type='submit'
						loading={isLoading}
					>
						Nhớ tui đi
					</LoadingButton>
				</Box>
			</Paper>
		</Stack>
	)
}

export default Signup
