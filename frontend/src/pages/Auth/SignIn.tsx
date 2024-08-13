import { useEffect, useMemo, useRef, useState } from 'react'
import {
	Box,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Typography
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { IUser } from '@types'
import { useSignIn } from '@hooks/useSignIn'
import LinkRouter from '@components/common/LinkRouter'

interface ErrorAuth {
	name?: 'username' | 'password'
	text: string
}

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [value, setValue] = useState<Partial<IUser>>({
		username: '',
		password: ''
	})
	const { onSignIn, isLoading } = useSignIn()
	const [error, setError] = useState<ErrorAuth | null>(null)
	const usernameInputRef = useRef<HTMLInputElement | null>(null)
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const hasUsername = useMemo(() => {
		return error?.name === 'username' && !!error.text
	}, [error])
	const hasPassword = useMemo(() => {
		return error?.name === 'password' && !!error.text
	}, [error])

	const onShowPassword = () => {
		setShowPassword((prev) => !prev)
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value: inputVal } = e.currentTarget
		setValue((prev) => ({
			...prev,
			[name]: inputVal
		}))
	}

	const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!value?.username?.trim()) {
			if (usernameInputRef?.current) {
				usernameInputRef?.current.focus()
			}
			setError({
				name: 'username',
				text: 'Nhập tên tài khoản'
			})
			return
		} else if (!value?.password?.trim()) {
			if (passwordInputRef?.current) {
				passwordInputRef.current.focus()
			}
			setError({
				name: 'password',
				text: 'Nhập mật khẩu'
			})
			return
		}

		await onSignIn(value)
	}

	useEffect(() => {
		if (value?.username?.trim()) {
			setError({ name: 'username', text: '' })
		}
		if (value?.password?.trim()) {
			setError({ name: 'password', text: '' })
		}
	}, [value])

	return (
		<>
			<Typography
				variant='h5'
				textAlign='center'
				mb={2}
				fontWeight={600}
			>
				Đăng nhập
			</Typography>
			<Box
				component='form'
				noValidate
				autoComplete='off'
				display='flex'
				flexDirection='column'
				onSubmit={signIn}
			>
				<TextField
					label='Tên tài khoản'
					variant='outlined'
					error={hasUsername}
					required
					helperText={hasUsername ? error?.text : ''}
					autoFocus
					sx={{ mb: 2 }}
					onChange={handleChange}
					value={value?.username}
					name='username'
					inputRef={usernameInputRef}
				/>
				<FormControl
					sx={{ mb: 2 }}
					variant='outlined'
					error={hasPassword}
					required
				>
					<InputLabel>Mật khẩu</InputLabel>
					<OutlinedInput
						required
						onChange={handleChange}
						value={value?.password}
						name='password'
						type={showPassword ? 'text' : 'password'}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={onShowPassword}
									edge='end'
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label='Mật khẩu'
						inputRef={passwordInputRef}
					/>
					{hasPassword && <FormHelperText>{error?.text}</FormHelperText>}
				</FormControl>
				<LinkRouter
					to='/sign-up'
					variant='body1'
					fontWeight={400}
					textAlign='right'
					mb={1.5}
				>
					Tạo tài khoản
				</LinkRouter>
				<LoadingButton
					variant='contained'
					type='submit'
					loading={isLoading}
				>
					Cho tui zô
				</LoadingButton>
			</Box>
		</>
	)
}

export default SignIn
