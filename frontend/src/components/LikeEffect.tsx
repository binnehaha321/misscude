import { useLayoutEffect, useRef, useState, useCallback } from 'react'
import avatar from '@assets/labubu.webp' // Ensure the path is correct

const LikeEffect = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [avatarLoaded, setAvatarLoaded] = useState<boolean>(false)
	const [hearts, setHearts] = useState<any[]>([])

	// Resize canvas function
	const resizeCanvas = useCallback(() => {
		const canvas = canvasRef.current
		if (canvas) {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}
	}, [])

	useLayoutEffect(() => {
		const canvas = canvasRef.current
		const context = canvas?.getContext('2d')

		if (!canvas || !context) return

		resizeCanvas() // Initial resize
		window.addEventListener('resize', resizeCanvas)

		const avatarImage = new Image()
		avatarImage.src = avatar
		avatarImage.onload = () => setAvatarLoaded(true)

		// Create heart
		function createHeart(x: number, y: number) {
			return {
				x,
				y,
				size: 200 + Math.random() * 20,
				alpha: 1,
				dx: Math.random() * 2 - 1,
				dy: Math.random() * -2 - 1
			}
		}

		// Animate hearts
		function animateHearts() {
			if (!canvas || !context) return

			context.clearRect(0, 0, canvas.width, canvas.height)

			hearts.forEach((heart) => {
				context.save()
				context.globalAlpha = heart.alpha
				if (avatarLoaded) {
					context.drawImage(
						avatarImage,
						heart.x - heart.size / 2,
						heart.y - heart.size / 2,
						heart.size,
						heart.size
					)
				}
				context.restore()

				heart.x += heart.dx
				heart.y += heart.dy
				heart.alpha -= 0.02

				if (heart.alpha <= 0) {
					// Remove heart from array
					setHearts((prevHearts) => prevHearts.filter((h) => h !== heart))
				}
			})

			if (hearts.length > 0) {
				requestAnimationFrame(animateHearts)
			}
		}

		// Handle draw on canvas
		function handleDraw(event: MouseEvent) {
			const x = event.clientX
			const y = event.clientY
			const newHearts = Array.from({ length: 20 }, () => createHeart(x, y))
			setHearts(newHearts)
			animateHearts()

			// Stop animation after 6 seconds
			setTimeout(() => {
				setHearts([])
			}, 3000)
		}

		// Only start the animation if isLike becomes true
		const handleClick = (event: MouseEvent) => {
			handleDraw(event)
		}
		canvas.addEventListener('click', handleClick)

		// Trigger the animation at the center of the canvas
		const centerX = canvas.width / 2
		const centerY = canvas.height / 2
		handleDraw({ clientX: centerX, clientY: centerY } as MouseEvent)

		// Clean up event listener
		return () => {
			canvas.removeEventListener('click', handleClick)
			window.removeEventListener('resize', resizeCanvas)
		}
	}, [avatarLoaded, hearts, resizeCanvas]) // Use callback for resizeCanvas to avoid infinite loop

	return (
		<canvas
			ref={canvasRef}
			className={hearts.length ? 'fixed top-0 left-0 z-[999] h-dvh w-dvw' : ''}
		/>
	)
}

export default LikeEffect
