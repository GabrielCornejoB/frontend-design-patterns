import { FilesUploadHandler } from '../files-upload.handler';
import { FilesUploadPayload } from '../files-upload-payload.model';

export class NotEmptyValidationHandler extends FilesUploadHandler {
  override handle(payload: FilesUploadPayload): FilesUploadPayload {
    if (payload.originalFiles.length === 0) {
      payload.error = new Error("0 files where uploaded");
    }

    return super.handle(payload);
  }
}
