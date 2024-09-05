import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { INoteResponse } from '@/types/note.types'

import { noteService } from '@/services/note.service'

export function useNotes() {
	const { data, refetch } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => noteService.getNotes()
	})

	const [items, setItems] = useState<INoteResponse[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems, refetch }
}
