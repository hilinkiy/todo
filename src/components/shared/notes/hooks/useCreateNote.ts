import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeNoteFormState } from '@/types/note.types'

import { noteService } from '@/services/note.service'

export function useCreateNote() {
	const queryClient = useQueryClient()

	const { mutate: createNote } = useMutation({
		mutationKey: ['create task'],
		mutationFn: (data: TypeNoteFormState) => noteService.createNote(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		}
	})

	return { createNote }
}
