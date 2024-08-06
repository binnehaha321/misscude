import { useParams } from 'react-router-dom'

const PostEdit = () => {
	const { id } = useParams()

	return <div>edit on {id}</div>
}

export default PostEdit
