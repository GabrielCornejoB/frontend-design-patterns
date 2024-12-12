import { FilesUploadHandler } from '../files-upload.handler';
import { FilesUploadPayload } from '../files-upload-payload.model';

export class ExtensionValidationHandler extends FilesUploadHandler {
  override handle(payload: FilesUploadPayload): FilesUploadPayload {
    const areExtensionsValid = payload.filesArray.every(({name}) =>
      name.endsWith(".png") || name.endsWith(".jpg") || name.endsWith(".jpeg")
    );
    console.log(payload.filesArray)
    if (!areExtensionsValid) {
      payload.error = new Error("Files must be PNG, JPG or JPEG")
    }

    return super.handle(payload);
  }
}
