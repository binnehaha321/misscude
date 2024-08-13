import {
	Link as RouterLink,
	LinkProps as ReactLinkProps
} from 'react-router-dom'
import { Link, LinkProps as MUILinkProps } from '@mui/material'

const LinkRouter: React.FC<ReactLinkProps & MUILinkProps> = (props) => {
	return (
		<Link
			component={RouterLink}
			{...props}
		>
			{props.children}
		</Link>
	)
}

export default LinkRouter
