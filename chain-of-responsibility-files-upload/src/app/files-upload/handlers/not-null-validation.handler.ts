import { FilesUploadHandler } from '../files-upload.handler';
import { FilesUploadPayload } from '../files-upload-payload.model';

export class NotNullValidationHandler extends FilesUploadHandler {
  override handle(payload: FilesUploadPayload): FilesUploadPayload {
    if (payload.originalFiles === null) {
      payload.error = new Error("Null values sent instead of files")
    }

    return super.handle(payload);
  }
}
