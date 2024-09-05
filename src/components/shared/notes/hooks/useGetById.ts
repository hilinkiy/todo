import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

import { noteService } from '@/services/note.service'

interface INoteResponse {
	id: string
	title: string
	content: string
	updatedAt: string
}

export function useGetById(id: string) {
	const { data, refetch } = useQuery({
		queryKey: ['get note by id', id],
		queryFn: () => noteService.getById(id),
		enabled: !!id,
	})
	const [items, setItems] = useState<INoteResponse | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, refetch }
}
