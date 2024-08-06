import { REGEX } from '../constants'
import { ValidateFormKey } from '../types'

const { USERNAME, EMAIL, PASSWORD } = REGEX

const isEmpty = (value: string) => !value.trim()

export const matchedPassword = (pw: string, rePw: string) => pw === rePw

export const validate = (key: ValidateFormKey, value: string): string => {
	let error = ''

	switch (key) {
		case 'email': {
			if (isEmpty(value.trim())) {
				error = 'Email không được để trống'
			} else if (!new RegExp(EMAIL).test(value)) {
				error = 'Email không hợp lệ'
			}
			break
		}
		case 'username': {
			if (isEmpty(value.trim())) {
				error = 'Tên tài khoản không được để trống'
			} else if (!new RegExp(USERNAME).test(value)) {
				error = 'Tên tài khoản tối thiểu 6 ký tự'
			}
			break
		}
		case 'password': {
			if (isEmpty(value.trim())) {
				error = 'Mật khẩu không được để trống'
			} else if (!new RegExp(PASSWORD).test(value)) {
				error = 'Mật khẩu gồm 8 ký tự: chữ (hoa/ thường), số, ký tự đặc biệt'
			}
			break
		}
		case 'reTypePassword': {
			if (isEmpty(value.trim())) {
				error = 'Xác nhận mật khẩu không được để trống'
			} else if (!new RegExp(PASSWORD).test(value)) {
				error = 'Mật khẩu gồm 8 ký tự: chữ (hoa/ thường), số, ký tự đặc biệt'
			}
			break
		}
		default: {
			return 'Invalid validation key'
		}
	}

	return error
}
