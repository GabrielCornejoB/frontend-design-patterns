import { FilesUploadHandler } from '../files-upload.handler';
import { FilesUploadPayload } from '../files-upload-payload.model';

export class AddTimestampHandler extends FilesUploadHandler {
  override handle(payload: FilesUploadPayload): FilesUploadPayload {
    payload.result = payload.filesArray.map(file => ({
      ...file,
      name: `${new Date().toISOString()}-${file.name}`
    }))

    return super.handle(payload);
  }
}
