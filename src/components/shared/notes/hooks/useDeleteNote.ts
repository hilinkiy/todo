import { useMutation, useQueryClient } from '@tanstack/react-query'

import { noteService } from '@/services/note.service'

export function useDeleteNote() {
	const queryClient = useQueryClient()

	const { mutate: deleteNote, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete task'],
		mutationFn: (id: string) => noteService.deleteNote(id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		}
	})

	return { deleteNote, isDeletePending }
}
