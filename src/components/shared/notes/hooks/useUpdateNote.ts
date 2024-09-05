import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeNoteFormState } from '@/types/note.types'

import { noteService } from '@/services/note.service'

export function useUpdateNote(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateTask } = useMutation({
		mutationKey: ['update task', key],
		mutationFn: ({ id, data }: { id: string; data: TypeNoteFormState }) =>
			noteService.updateNote(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		}
	})

	return { updateTask }
}
