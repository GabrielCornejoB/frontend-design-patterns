import { AddTimestampHandler } from './handlers/add-timestamp.handler';
import { FileSizeValidationHandler } from './handlers/file-size-validation.handler';
import { ExtensionValidationHandler } from './handlers/extension-validation.handler';
import { NameValidationHandler } from './handlers/name-validation.handler';
import { ToFileArrayHandler } from './handlers/to-file-array.handler';
import { NotEmptyValidationHandler } from './handlers/not-empty-validation.handler';
import { NotNullValidationHandler } from './handlers/not-null-validation.handler';

const addTimestamp = new AddTimestampHandler(null);
const fileSize = new FileSizeValidationHandler(addTimestamp);
const extensionValidation = new ExtensionValidationHandler(fileSize);
const nameValidation = new NameValidationHandler(extensionValidation);
const toArray = new ToFileArrayHandler(nameValidation);
const notEmpty = new NotEmptyValidationHandler(toArray);
const notNull = new NotNullValidationHandler(notEmpty);

export const FilesUpload = notNull;
export * from "./files-upload-payload.model";
