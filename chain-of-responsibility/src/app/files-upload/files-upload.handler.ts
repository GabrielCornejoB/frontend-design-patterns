import { FilesUploadPayload } from './files-upload-payload.model';

export abstract class FilesUploadHandler {
  next: FilesUploadHandler | null = null;

  constructor(next: FilesUploadHandler | null) {
    this.next = next;
  }

  handle(payload: FilesUploadPayload): FilesUploadPayload {
    if (this.next && !payload.error) {
      return this.next.handle(payload);
    }

    return payload;
  }
}
