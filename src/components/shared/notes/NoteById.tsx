import React, { useEffect } from 'react'
import { useGetById } from './hooks/useGetById'
import { SquareX } from 'lucide-react'

interface NoteByIdProps {
	id: string
	isOpen: boolean
	closeModal: () => void
	openNote: boolean
}

export const NoteById: React.FC<NoteByIdProps> = ({ id, isOpen, closeModal, openNote }) => {
	const { items, refetch } = useGetById(id)

	useEffect(() => {
		if (id) {
			refetch()
		}
	}, [id, refetch])

	if (!isOpen) return null

	return (
		<div>
			{openNote && (
				<div className='absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-35 p-20'>
					<div className='absolute bottom-10 bg-[#1e1e1e] rounded-xl p-[24px] w-10/12 left-1/2 -translate-x-1/2 z-50 text-white min-h-52 flex flex-col justify-center'>
						<button onClick={closeModal} className='absolute top-2 right-2 text-white'><SquareX /></button>
						{items ? (
							<>
								<div className='flex items-center justify-between'>
									<h2 className='text-2xl font-bold mb-5'>
										{items.title}
									</h2>
									<p className='text-white/80'>
										{items.updatedAt
											? new Date(items.updatedAt).toLocaleDateString('ru-RU', {
												day: 'numeric',
												month: 'numeric',
												year: 'numeric',
											})
											: 'Дата не указана'}
									</p>
								</div>
								<p>{items.content}</p>
							</>
						) : (
							<p>Загрузка...</p>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
