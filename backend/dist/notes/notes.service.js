"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const note_schema_1 = require("./note.schema");
let NotesService = class NotesService {
    constructor(noteModel) {
        this.noteModel = noteModel;
    }
    async findAll() {
        return this.noteModel.find().exec();
    }
    async findOne(id) {
        const note = await this.noteModel.findById(id).exec();
        if (!note) {
            throw new common_1.NotFoundException('Note not found');
        }
        return note;
    }
    async create(createNoteDto) {
        const newNote = new this.noteModel(createNoteDto);
        return newNote.save();
    }
    async update(id, updateNoteDto) {
        const existingNote = await this.noteModel.findById(id).exec();
        if (!existingNote) {
            throw new common_1.NotFoundException('Note not found');
        }
        if (updateNoteDto.title !== undefined) {
            existingNote.title = updateNoteDto.title;
        }
        if (updateNoteDto.text !== undefined) {
            existingNote.text = updateNoteDto.text;
        }
        return existingNote.save();
    }
    async delete(id) {
        const result = await this.noteModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Note not found');
        }
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(note_schema_1.Note.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NotesService);
//# sourceMappingURL=notes.service.js.map