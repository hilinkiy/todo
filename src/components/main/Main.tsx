'use client'

import { useState } from 'react'
import { Modal } from '../shared/modal/Modal'
import { OpenModalButton } from '../shared/OpenModalButton'
import { Notes } from '../shared/notes/Notes'

export function Main() {
	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	return (
		<div className='px-20 py-5 overflow-y-auto'>
			<OpenModalButton openModal={openModal} />
			<Modal closeModal={closeModal} isOpen={isOpen} />
			<Notes />
		</div>
	)
}