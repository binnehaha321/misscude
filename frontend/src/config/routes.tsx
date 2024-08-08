import { createBrowserRouter } from 'react-router-dom'

// pages
import App from '../App'
import Post from '../pages/Post'
import PostEdit from '../pages/PostEdit'
import NotFound from '../components/NotFound'
import SignIn from '../pages/Auth/SignIn'
import Signup from '../pages/Auth/Signup'
import Error from '../pages/Error'

// layouts
import ProtectedLayout from '../layout/ProtectedLayout'
import PublicLayout from '../layout/PublicLayout'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <ProtectedLayout />,
		errorElement: <Error />,
		children: [
			{ index: true, element: <App /> },
			{ path: 'post/:id', element: <Post /> },
			{ path: 'post/:id/edit', element: <PostEdit /> }
		]
	},
	{
		path: '/',
		element: <PublicLayout />,
		children: [
			{ path: 'sign-in', element: <SignIn /> },
			{ path: 'sign-up', element: <Signup /> }
		]
	},
	{
		path: '*',
		element: <NotFound />
	}
])
