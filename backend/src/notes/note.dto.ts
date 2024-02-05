export class CreateNoteDto {
  title: string;
  text?: string;
}

export class UpdateNoteDto {
  title?: string;
  text?: string;
}
