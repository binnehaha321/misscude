import { cn } from '@utils/cn'

const effectParent = 'bg-slate-100 rounded-md motion-safe:animate-pulse'
const effectChild = 'bg-slate-300 rounded-md motion-safe:animate-pulse'

const SinglePostSkeleton = () => {
	return (
		<div
			className={cn(
				'flex flex-col gap-y-3 w-full max-w-[680px] p-6 mx-auto',
				effectParent
			)}
		>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<div className={cn('rounded-md w-10 h-10', effectChild)} />
					<div className={cn('w-[200px] h-10', effectChild)} />
				</div>
				<div className={cn('w-10 h-10', effectChild)} />
			</div>
			<div className={cn('w-full h-[200px]', effectChild)} />
			<div className='flex justify-between items-center'>
				<div className={cn('w-[48%] h-10', effectChild)} />
				<div className={cn('w-[48%] h-10', effectChild)} />
			</div>
			<div className={cn('w-full h-20', effectChild)} />
		</div>
	)
}

export { SinglePostSkeleton }
