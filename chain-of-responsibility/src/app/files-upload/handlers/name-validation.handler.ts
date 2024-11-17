import { FilesUploadHandler } from '../files-upload.handler';
import { FilesUploadPayload } from '../files-upload-payload.model';

export class NameValidationHandler extends FilesUploadHandler {
  override handle(payload: FilesUploadPayload): FilesUploadPayload {
    const areFilesNamesValid = payload.filesArray.every(({name}) => name.startsWith("image-"));
    if (!areFilesNamesValid) {
      payload.error = new Error("Files' names must start with 'image-'")
    }

    return super.handle(payload);
  }
}
