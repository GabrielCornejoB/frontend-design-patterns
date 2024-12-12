import { FilesUploadHandler } from '../files-upload.handler';
import { FilesUploadPayload } from '../files-upload-payload.model';

export class FileSizeValidationHandler extends FilesUploadHandler {
  maxFileSizeInBytes: number = 5_000_000;

  override handle(payload: FilesUploadPayload): FilesUploadPayload {
    const areFilesSizesValid = payload.filesArray.every(({size}) => size < this.maxFileSizeInBytes);
    if (!areFilesSizesValid) {
      payload.error = new Error("The maximum file size is 5MB")
    }

    return super.handle(payload);
  }
}
