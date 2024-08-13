import { createContext, useContext, useState } from 'react'
import { Image } from '@types'

interface IPostContext {
	openNewPostModal: () => void
	closeNewPostModal: () => void
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

export const PostContext = createContext<IPostContext>({
	isOpenNewPostModal: false,
	openNewPostModal: () => undefined,
	closeNewPostModal: () => undefined,
	isOpenPostGallery: false,
	setOpenPostGallery: () => undefined,
	crrentImages: [],
	setCurrentImages: () => undefined,
	currentIndex: 0,
	setCurrentIndex: () => undefined,
	openGallery: () => undefined,
	closeGallery: () => undefined
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

	const openNewPostModal = () => {
		setOpenNewPostModal(true)
	}

	const closeNewPostModal = () => {
		setOpenNewPostModal(false)
	}

	return (
		<PostContext.Provider
			value={{
				isOpenNewPostModal,
				openNewPostModal,
				closeNewPostModal,
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
