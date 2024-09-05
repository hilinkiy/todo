import type { IBase } from './root.types'

export interface INoteResponse extends IBase {
	title: string
	content: string
}

export type TypeNoteFormState = Partial<Omit<INoteResponse, 'id' | 'updatedAt'>>
