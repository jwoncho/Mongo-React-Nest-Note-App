import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto } from './note.dto'; // Define DTOs for create and update operations

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getNotes() {
    return this.notesService.findAll();
  }

  @Get(':noteId')
  async getNote(@Param('noteId') noteId: string) {
    return this.notesService.findOne(noteId);
  }

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Patch(':noteId')
  async updateNote(
    @Param('noteId') noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(noteId, updateNoteDto);
  }

  @Delete(':noteId')
  async deleteNote(@Param('noteId') noteId: string) {
    return this.notesService.delete(noteId);
  }
}
