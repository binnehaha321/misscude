import { createBrowserRouter } from 'react-router-dom'
// pages
import Home from '../pages/Home'
import Post from '../pages/Post'
import PostEdit from '../pages/PostEdit'
import NotFound from '../components/NotFound'
import SignIn from '../pages/Auth/SignIn'
import Signup from '../pages/Auth/Signup'
import Error from '../pages/Error'
// layouts
import ProtectedLayout from '../layout/ProtectedLayout'
import PublicLayout from '../layout/PublicLayout'
import App from '../App'
export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				element: <ProtectedLayout />,
				children: [
					{ path: '/', index: true, element: <Home /> },
					{ path: 'post/:id', element: <Post /> },
					{ path: 'post/:id/edit', element: <PostEdit /> }
				]
			},
			{
				element: <PublicLayout />,
				children: [
					{ path: 'sign-in', element: <SignIn /> },
					{ path: 'sign-up', element: <Signup /> }
				]
			},
			{ path: '*', element: <NotFound /> }
		]
	}
])
