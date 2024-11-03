import multer from 'multer'

const Storage = multer.diskStorage({
	// destination: 'src/uploads',
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
})

export const upload = multer({
	storage: Storage
	// limits: {
	// 	fileSize: 2 * 1024 * 1024 // 2 MB
	// }
}).array('images', process.env.MAX_FILE_COUNT)
