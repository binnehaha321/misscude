import React, {
	lazy,
	memo,
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'
import {
	Backdrop,
	Box,
	Fade,
	IconButton,
	Modal,
	Stack,
	Typography
} from '@mui/material'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import { EmojiClickData } from 'emoji-picker-react'

import { ICheckinData, IUser } from '@types'
import { useNewPost } from '@hooks/usePost'
import { usePost } from '@context/PostContext'
import { useToast } from '@context/ToastContext'
import { useAuth } from '@context/AuthContext'
import { getUser } from '@utils/auth'

const TitleSection = lazy(() => import('./Title'))
const LocationSection = lazy(() => import('./Location'))
const DateSection = lazy(() => import('./Date'))
const SupportTitle = lazy(() => import('./SupportTitle'))
const UploadImages = lazy(() => import('./UploadImages'))
const PreviewModal = lazy(() => import('../Preview/PreviewModal'))
const Preview = lazy(() => import('../Preview/Preview'))
const FormButton = lazy(() => import('./FormButton'))

import styles from './style.module.css'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80dvw',
	maxWidth: 600,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	boxSizing: 'border-box'
}

const initialCheckinDataValues = {
	title: '',
	date: new Date().toLocaleDateString('en-CA', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}),
	location: '',
	images: [],
	createdBy: ''
}

const CheckinForm = () => {
	// hooks
	const [checkinData, setCheckinData] = useState<ICheckinData>(
		initialCheckinDataValues
	)
	const [formStep, setFormStep] = useState(1)
	const [images, setImages] = useState<File[]>([])
	const [preview, setPreview] = useState<string | null>('')

	const { addNewPost, isLoading } = useNewPost()
	const { closeNewPostModal, isOpenNewPostModal } = usePost()
	const { openToast } = useToast()
	const { token } = useAuth()
	const user = useMemo(() => {
		if (token) {
			return getUser()
		}
	}, [token]) as unknown as IUser

	// ref
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)
	const uploadRef = useRef<HTMLInputElement | null>(null)
	const formData = useRef<FormData>(new FormData())

	// methods
	const validateContent = useCallback(() => {
		openToast({
			message: 'Vui lòng nhập dữ liệu',
			status: 'error'
		})
		return
	}, [openToast])

	const nextStep = () => {
		if (formStep > 2 || formStep < 1) return
		switch (formStep) {
			case 1:
				if (!checkinData?.title) {
					return validateContent()
				}
				break
			case 2:
				if (!checkinData?.location) {
					return validateContent()
				}
				break
			case 3:
				if (!checkinData?.date) {
					return validateContent()
				}
				break
			default:
				return
		}
		setFormStep((prev) => prev + 1)
	}

	const prevStep = () => {
		if (formStep > 1) setFormStep((prev) => prev - 1)
		return
	}

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			const { name, value } = e.currentTarget
			const files = uploadRef?.current?.files
			if (files && name === 'images') {
				const fileArray = Array.from(files).map((file) => {
					formData?.current.append(
						'images',
						file,
						file?.name.toLocaleLowerCase().split(' ').join('-')
					)
					return file
				})
				setImages((prevImages) => prevImages.concat(fileArray))

				setCheckinData((prev) => ({
					...prev,
					images: fileArray
				}))
				Array.from(files).map((file) => URL.revokeObjectURL(String(file))) // Cleanup
			} else {
				const preparedData = {
					[name]: value,
					createdBy: user?.username
				}
				setCheckinData((prev) => {
					if (prev[name as keyof ICheckinData] === value) return prev
					return {
						...prev,
						...preparedData
					}
				})
			}
		},
		[user]
	)

	const setEmoji = ({ emoji }: EmojiClickData) => {
		const { title } = checkinData
		const cursor = textareaRef?.current?.selectionStart
		const text = title.slice(0, cursor) + emoji + title.slice(cursor)
		setCheckinData((prev) => ({
			...prev,
			title: text
		}))
	}

	const resetForm = () => {
		setCheckinData(initialCheckinDataValues)
		setFormStep(1)
		setImages([])
	}
	// submit form
	const submitNewPost = useCallback(async () => {
		formData?.current.append('title', checkinData?.title)
		formData?.current.append('location', checkinData?.location)
		formData?.current.append('date', checkinData?.date)
		formData?.current.append('createdBy', checkinData?.createdBy)

		const res = await addNewPost(formData.current)
		if (res?.status === 201) {
			closeNewPostModal()
			openToast({ message: 'Đã post bài mới!', status: 'success' })

			resetForm()
		}
		formData.current.forEach((_, key) => formData.current.delete(key))
	}, [addNewPost, checkinData, closeNewPostModal, openToast])

	const removeFile = useCallback((file: File) => {
		setImages((prevImages) => {
			const updatedImages = prevImages.filter((img) => img.name !== file.name)
			// Update formData
			formData.current = new FormData()
			updatedImages.forEach((file) => {
				formData.current.append(
					'images',
					file,
					file?.name.toLocaleLowerCase().split(' ').join('-')
				)
			})
			return updatedImages
		})
	}, [])

	// side effect
	useEffect(() => {
		if (textareaRef.current) {
			const textarea = textareaRef.current
			const inputLength = textarea.value.length
			textarea.setSelectionRange(inputLength, inputLength)
			textarea.focus()
		}
	}, [formStep])

	return (
		<>
			<Modal
				key='new-post-modal'
				aria-labelledby='new-post-modal'
				aria-describedby='add-a-new-post'
				open={isOpenNewPostModal}
				onClose={(_event, reason) => {
					if (reason === 'backdropClick' && isLoading) return
					closeNewPostModal()
				}}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500
					}
				}}
			>
				<form>
					<Fade
						in={isOpenNewPostModal}
						style={{ border: 'none', borderRadius: 10 }}
						onEntered={() => textareaRef?.current?.focus()}
					>
						<Box
							sx={style}
							position='relative'
						>
							<Suspense fallback={<p>Chờ tui xíu... 😅</p>}>
								{formStep > 1 && (
									<IconButton
										sx={{ display: 'block' }}
										className={styles.prevStep}
										onClick={prevStep}
									>
										<ArrowBackIosNewRoundedIcon />
									</IconButton>
								)}
								{formStep === 1 && (
									<Stack
										gap={1}
										aria-description='form-step'
									>
										<Typography variant='h6'>Mô tả về chuyến đi</Typography>
										<TitleSection
											onChange={handleChange}
											value={checkinData?.title}
											textareaRef={textareaRef}
											name='title'
											required
										/>
										<Box
											ml='auto'
											mb={2}
										>
											<SupportTitle onSetEmoji={setEmoji} />
											<UploadImages
												onChange={handleChange}
												ref={uploadRef}
												name='images'
											/>
										</Box>
										<Suspense fallback={<p>Đang tải ảnh lên...</p>}>
											<Preview
												images={images}
												removeFile={removeFile}
												setPreview={setPreview}
											/>
										</Suspense>
									</Stack>
								)}
								{formStep === 2 && (
									<LocationSection
										onChange={handleChange}
										value={checkinData?.location}
										name='location'
										autoFocus
										required
									/>
								)}
								{formStep === 3 && (
									<DateSection
										value={checkinData?.date}
										onChange={handleChange}
										name='date'
										required
									/>
								)}
								<Suspense fallback={<p>Tải nút...</p>}>
									<FormButton
										formStep={formStep}
										isLoading={isLoading}
										onNext={nextStep}
										onSubmitNewPost={submitNewPost}
									/>
								</Suspense>
							</Suspense>
						</Box>
					</Fade>
				</form>
			</Modal>
			{preview && (
				<Suspense fallback={<p>Đang tải ảnh xem trước...</p>}>
					<PreviewModal
						image={preview}
						openPreview={!!preview}
						closePreview={() => setPreview(null)}
					/>
				</Suspense>
			)}
		</>
	)
}
export default memo(CheckinForm)
