'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import styles from './Modal.module.scss'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useCreateNote } from '../notes/hooks/useCreateNote'
import { toast } from 'sonner'
import { useUpdateNote } from '../notes/hooks/useUpdateNote'
import { TypeNoteFormState } from '@/types/note.types'
import { useTranslations } from 'next-intl'

export function Modal({
	closeModal,
	isOpen,
	isEdit = false,
	note = { id: '', title: '', content: '' },
}: {
	closeModal: () => void
	isOpen: boolean
	isEdit?: boolean
	note?: TypeNoteFormState & { id: string }
}) {
	const t = useTranslations('modal')
	const [title, setTitle] = useState(note?.title || '')
	const [content, setContent] = useState(note?.content || '')

	const { createNote } = useCreateNote()
	const { updateTask } = useUpdateNote()

	useEffect(() => {
		if (isEdit) {
			setTitle(note.title || '')
			setContent(note.content || '')
		} else {
			setTitle('')
			setContent('')
		}
	}, [isEdit])

	const handleAddNote = async () => {
		try {
			if (title && content) {
				await createNote({ title, content })
				closeModal()
				setTitle("")
				setContent("")
			} else {
				toast.error('Please make sure that you fill all fields')
			}
		} catch (error) {
			console.error('Error adding note:', error)
		}
	}

	const handleUpdateTask = async () => {
		try {
			if (title && content) {
				await updateTask({ id: note!.id, data: { title, content } })
				closeModal()
				toast.success('Note updated successfully!')
			} else {
				toast.error('Please make sure that you fill all fields')
			}
		} catch (error) {
			toast.error(`Something went wrong: ${error}`)
			console.log(error)
		}
	}

	return (
		<div>
			{isOpen && (
				<div className={styles.modals}>
					<div className={cn(styles.block, 'z-50')}>
						<h2 className={styles.title}>{isEdit ? `${t('changeNote')}` : `${t('addNote')}`}</h2>
						<div className={styles.inputs}>
							<Label className='text-white text-xl'>{t('title')}</Label>
							<Input
								id='title'
								placeholder={t('titlePlaceholder')}
								type='text'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className='bg-transparent border-white border-2 text-white py-6'
							/>
							<Label className='text-white text-md'>{t('content')}</Label>
							<Textarea
								id='content'
								placeholder={t('contentPlaceholder')}
								value={content}
								onChange={(e) => setContent(e.target.value)}
								className='bg-transparent border-white border-2 text-white'
							/>
						</div>
						<div className={styles.buttons}>
							<button className={cn(styles.button, styles.cancel)} onClick={closeModal}>
								{t('cancel')}
							</button>
							<button
								className={cn(styles.button, styles.add)}
								onClick={isEdit ? handleUpdateTask : handleAddNote}
							>
								{isEdit ? `${t('change')}` : `${t('add')}`}
							</button>
						</div>
					</div>
					<div className={styles.close} onClick={closeModal}></div>
				</div>
			)}
		</div>
	)
}
