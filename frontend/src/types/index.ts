import { AlertColor, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export type MUIIconProps = OverridableComponent<SvgIconTypeMap<object, 'svg'>>

export type Image = {
	filename: string
	url: string
	_id: string
}

export interface ICheckinData {
	_id?: string
	title: string
	date: string
	location: string
	images: File[] | Image[]
	createdBy: string
}

export interface IToastContent {
	status: AlertColor
	message: string
	isOpen?: boolean
}

export interface IUser {
	_id?: string
	email: string
	username: string
	password: string
	avatar: string
}

export interface ISignUp extends IUser {
	reTypePassword: string
}

export type ValidateFormKey =
	| 'email'
	| 'username'
	| 'password'
	| 'reTypePassword'

export type SignUpValueProps = Record<
	Exclude<ValidateFormKey, 'rePassword'>,
	string
>

export interface IMenuItem {
	text: string
	icon: MUIIconProps
}
