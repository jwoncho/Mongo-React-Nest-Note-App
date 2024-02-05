import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto } from './note.dto';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    getNotes(): Promise<import("./note.schema").Note[]>;
    getNote(noteId: string): Promise<import("./note.schema").Note>;
    createNote(createNoteDto: CreateNoteDto): Promise<import("./note.schema").Note>;
    updateNote(noteId: string, updateNoteDto: UpdateNoteDto): Promise<import("./note.schema").Note>;
    deleteNote(noteId: string): Promise<void>;
}
