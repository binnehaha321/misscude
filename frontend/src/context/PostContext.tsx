import { createContext, useContext, useState } from 'react'
import { Image } from '../types'

interface IPost {
	setOpenNewPostModal: React.Dispatch<React.SetStateAction<boolean>>
	isOpenNewPostModal: boolean
	setOpenPostGallery: React.Dispatch<React.SetStateAction<boolean>>
	isOpenPostGallery: boolean
	crrentImages: Image[]
	setCurrentImages: React.Dispatch<React.SetStateAction<Image[]>>
	currentIndex: number
	setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
	openGallery: (images: Image[], index: number) => void
	closeGallery: () => void
}

export const PostContext = createContext<IPost>({
	isOpenNewPostModal: false,
	setOpenNewPostModal: () => {},
	isOpenPostGallery: false,
	setOpenPostGallery: () => {},
	crrentImages: [],
	setCurrentImages: () => {},
	currentIndex: 0,
	setCurrentIndex: () => {},
	openGallery: () => {},
	closeGallery: () => {}
})

export const usePost = () => useContext(PostContext)

export default function PostProvider({ children }: React.PropsWithChildren) {
	const [isOpenNewPostModal, setOpenNewPostModal] = useState(false)
	const [isOpenPostGallery, setOpenPostGallery] = useState(false)
	const [crrentImages, setCurrentImages] = useState<Image[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)

	const openGallery = (images: Image[], index: number) => {
		setCurrentImages(images)
		setCurrentIndex(index)
		setOpenPostGallery(true)
	}

	const closeGallery = () => {
		setOpenPostGallery(false)
	}

	return (
		<PostContext.Provider
			value={{
				isOpenNewPostModal,
				setOpenNewPostModal,
				isOpenPostGallery,
				setOpenPostGallery,
				crrentImages,
				setCurrentImages,
				currentIndex,
				setCurrentIndex,
				openGallery,
				closeGallery
			}}
		>
			{children}
		</PostContext.Provider>
	)
}
