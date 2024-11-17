import { FilesUploadHandler } from '../files-upload.handler';
import { FilesUploadPayload } from '../files-upload-payload.model';

export class ToFileArrayHandler extends FilesUploadHandler {
  override handle(payload: FilesUploadPayload): FilesUploadPayload {
    const filesArray: File[] = [];
    for (let i = 0; i < payload.originalFiles.length; i++) {
      filesArray.push(payload.originalFiles[i])
    }
    payload.filesArray = filesArray;

    return super.handle(payload);
  }
}
