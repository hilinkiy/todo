import type { INoteResponse, TypeNoteFormState } from '@/types/note.types'

import { axiosWithAuth } from '@/api/interceptors'

class NoteService {
	private BASE_URL = '/user/notes'

	async getNotes() {
		const response = await axiosWithAuth.get<INoteResponse[]>(this.BASE_URL)
		return response
	}

	async createNote(data: TypeNoteFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateNote(id: string, data: TypeNoteFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteNote(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}

	async getById(id: string) {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const noteService = new NoteService()
