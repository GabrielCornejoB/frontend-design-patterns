export class FilesUploadPayload {
  result: File[] | null = null;
  error: Error | null = null;
  filesArray: File[] = []
  readonly originalFiles: FileList;

  constructor(originalFiles: FileList) {
    this.originalFiles = originalFiles;
  }
}
