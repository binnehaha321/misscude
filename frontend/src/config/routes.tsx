import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Post from '../pages/Post'
import PostEdit from '../pages/PostEdit'
import NotFound from '../components/NotFound'
import SignIn from '../pages/Auth/SignIn'
import Signup from '../pages/Auth/Signup'
import ProtectedLayout from '../layout/ProtectedLayout'
import PublicLayout from '../layout/PublicLayout'

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedLayout>
				<Home />
			</ProtectedLayout>
		),
		index: true
	},
	{
		path: '/post/:id',
		element: (
			<ProtectedLayout>
				<Post />
			</ProtectedLayout>
		)
	},
	{
		path: '/post/:id/edit',
		element: (
			<ProtectedLayout>
				<PostEdit />
			</ProtectedLayout>
		)
	},
	{
		path: '/sign-in',
		element: (
			<PublicLayout>
				<SignIn />
			</PublicLayout>
		)
	},
	{
		path: '/sign-up',
		element: (
			<PublicLayout>
				<Signup />
			</PublicLayout>
		)
	},
	{
		path: '*',
		element: <NotFound />
	}
])
