import { PencilLine } from 'lucide-react'

export function OpenModalButton({ openModal }: { openModal: () => void }) {
	return (
		<div className='p-4 rounded-lg bg-white fixed bottom-5 right-5 cursor-pointer' onClick={openModal}>
			<PencilLine />
		</div>
	)
}