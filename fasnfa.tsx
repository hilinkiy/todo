import { useState } from 'react'
import { LayoutGrid, List, Pencil, Trash2 } from 'lucide-react'
import styles from './Notes.module.scss'
import { useNotes } from './hooks/useNotes'
import { Modal } from '../modal/Modal'
import { useDeleteNote } from './hooks/useDeleteNote'
import { TypeNoteFormState } from '@/types/note.types'
import { NoteById } from './NoteById'

export function Notes() {
	const { items, refetch } = useNotes()
	const [isGrid, setIsGrid] = useState(true)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedNote, setSelectedNote] = useState<TypeNoteFormState & { id: string } | null>(null)
	const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)

	const changeView = () => {
		setIsGrid(prev => !prev)
	}

	const openEditModal = (note?: TypeNoteFormState & { id: string }) => {
		if (note) {
			setSelectedNote(note)
		} else {
			setIsModalOpen(false)
		}
		setSelectedNoteId(null)
	}

	const closeEditModal = () => {
		setSelectedNote(null)
	}

	const openNoteById = (id: string) => {
		setSelectedNoteId(id)
		setSelectedNote(null)
	}

	const closeNoteById = () => {
		setSelectedNoteId(null)
	}

	const { deleteNote } = useDeleteNote()

	const handleDelete = async (id: string) => {
		await deleteNote(id)
		setSelectedNoteId(null)
		refetch()
	}

	return (
		<div>
			<div className='flex items-center justify-between mb-7'>
				<h1 className='text-white text-3xl mb-5'>Notes</h1>
				<button className='bg-transparent border-2 border-border rounded-xl p-3 text-white text-xl' onClick={changeView}>
					{isGrid ? (
						<div className='flex items-center justify-center gap-2'>
							<LayoutGrid /> Сетка
						</div>
					) : (
						<div className='flex items-center justify-center gap-2'>
							<List /> Колонны
						</div>
					)}
				</button>
			</div>
			<div className={isGrid ? styles.grid : styles.row}>
				{items?.length ? (
					items.map(note => (
						<div key={note.id} className={styles.note} onClick={() => openNoteById(note.id)}>
							<div className={styles.head}>
								<h3 className={styles.title}>{note.title}</h3>
								<p className={styles.date}>
									{note.updatedAt
										? new Date(note.updatedAt).toLocaleDateString('ru-RU', {
											day: 'numeric',
											month: 'numeric',
											year: 'numeric',
										})
										: 'Дата не указана'}
								</p>
							</div>
							<p className={styles.content}>{note.content}</p>
							<div className={styles.buttons}>
								<button
									onClick={() => openEditModal(note)}
									className={styles.edit}
								>
									<Pencil size={20} className='text-green-500' />
									<span className="edit">Посмотреть</span>
								</button>
								<button
									onClick={() => handleDelete(note.id)}
									className={styles.delete}
								>
									<Trash2 size={20} className='text-red-600' />
									<span className="delete">Удалить</span>
								</button>
							</div>
						</div>
					))
				) : (
					<p className='text-white'>Нет доступных заметок.</p>
				)}

				<Modal
					isOpen={!!selectedNote}
					closeModal={closeEditModal}
					isEdit={!!selectedNote}
					note={selectedNote}
				/>

				<NoteById
					isOpen={!!selectedNoteId}
					id={selectedNoteId!}
					closeModal={closeNoteById}
				/>
			</div>
		</div>
	)
}
