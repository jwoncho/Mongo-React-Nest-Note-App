import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './note.schema';
import { CreateNoteDto, UpdateNoteDto } from './note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  // Find all notes
  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  // Find a single note by ID
  async findOne(id: string): Promise<Note> {
    const note = await this.noteModel.findById(id).exec();
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  // Create a new note
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const newNote = new this.noteModel(createNoteDto);
    return newNote.save();
  }

  // Update a note
  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const existingNote = await this.noteModel.findById(id).exec();
    if (!existingNote) {
      throw new NotFoundException('Note not found');
    }

    if (updateNoteDto.title !== undefined) {
      existingNote.title = updateNoteDto.title;
    }
    if (updateNoteDto.text !== undefined) {
      existingNote.text = updateNoteDto.text;
    }

    return existingNote.save();
  }

  // Delete a note
  async delete(id: string): Promise<void> {
    const result = await this.noteModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Note not found');
    }
  }
}
