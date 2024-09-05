'use client'

import { useState, useEffect } from 'react'
import { LayoutGrid, List, Pencil, Trash2 } from 'lucide-react'
import styles from './Notes.module.scss'
import { useNotes } from './hooks/useNotes'
import { Modal } from '../modal/Modal'
import { useDeleteNote } from './hooks/useDeleteNote'
import { TypeNoteFormState } from '@/types/note.types'
import { NoteById } from './NoteById'
import { useTranslations } from 'next-intl'
import { usePathname, useSearchParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

export function Notes() {
  const t = useTranslations("main")
  const { items, refetch } = useNotes()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGrid, setIsGrid] = useState(true)
  const [selectedNote, setSelectedNote] = useState<TypeNoteFormState & { id: string } | null>(null)
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [openNote, setOpenNote] = useState(false)

  useEffect(() => {
    const savedViewMode = localStorage.getItem('viewMode')
    if (savedViewMode) {
      setIsGrid(savedViewMode === 'grid')
    }
  }, [])

  const changeView = () => {
    setIsGrid(prev => {
      const newGridState = !prev
      localStorage.setItem('viewMode', newGridState ? 'grid' : 'list')
      return newGridState
    })
  }

  const closeNoteById = () => {
    setSelectedNoteId(null)
  }

  const openModal = async (note?: TypeNoteFormState & { id: string }) => {
    if (note) {
      await setSelectedNote(note)
    } else {
      await setSelectedNote(null)
    }
    await setIsModalOpen(true)
    setSelectedNoteId(null)
    setOpenNote(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedNote(null)
  }

  const openNoteById = (id: string) => {
    setSelectedNoteId(id)
    setOpenNote(true)
  }

  const { deleteNote } = useDeleteNote()

  const handleDelete = async (id: string) => {
    await deleteNote(id)
    setOpenNote(false)
    refetch()
  }

  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  if (isLoading) {
    return (
      <div>
        <div className='flex items-center justify-between'>
          <Skeleton className="h-[36px] w-[210px] mb-5 bg-[#424242]" />
          <Skeleton className="h-[56px] w-[115px] mb-5 bg-[#424242]" />
        </div>
        <div className={isGrid ? styles.grid : styles.row}>
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} className="h-40 w-full mb-5 bg-[#424242]" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='flex items-center justify-between mb-7'>
        <h1 className='text-white text-3xl mb-5'>
          {t('notes')}
        </h1>
        <button className='bg-transparent border-2 border-border rounded-xl p-3 text-white text-xl' onClick={changeView}>
          {isGrid ? (
            <div className='flex items-center justify-center gap-2'>
              <LayoutGrid /> {t('grid')}
            </div>
          ) : (
            <div className='flex items-center justify-center gap-2'>
              <List /> {t('list')}
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
                    : `${t('noDate')}`}
                </p>
              </div>
              <p className={styles.content}>{note.content}</p>
              <div className={styles.buttons}>
                <button
                  onClick={() => openModal(note)}
                  className={styles.edit}
                >
                  <Pencil size={20} className='text-green-500' />
                  <span className="edit">{t('change')}</span>
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className={styles.delete}
                >
                  <Trash2 size={20} className='text-red-600' />
                  <span className="delete">{t('delete')}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className='text-white'>Нет доступных заметок.</p>
        )}

        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          isEdit={!!selectedNote}
          note={selectedNote}
        />

        <NoteById
          isOpen={!!selectedNoteId}
          id={selectedNoteId!}
          closeModal={closeNoteById}
          openNote={openNote}
        />
      </div>
    </div>
  )
}