import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilesUpload, FilesUploadPayload } from './files-upload';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly initialValue = {
    type: "info",
    message: "This is an example of the \"Chain Of Responsibility\" design pattern in a frontend development scenario.\n" +
      "Here we'll do the following chain: Receive the files, validate their name, their extension,\n" +
      "their size, and lastly add a timestamp to the files' names."
  } as const;

  status$ = new BehaviorSubject<{ type: "info" | "error" | "success", message: string }>(this.initialValue);

  @ViewChild('dropzone')
  fileInput!: ElementRef<HTMLInputElement>;

  handleInputEvent(event: Event) {
    const inputEvent = event as InputEvent;
    const inputElement = inputEvent.target as HTMLInputElement
    const fileList = inputElement.files as FileList;

    const {result, error} = FilesUpload.handle(new FilesUploadPayload(fileList));

    if (error) {
      this.status$.next({
        type: "error",
        message: error.message
      })
      return;
    }

    if (result) {
      this.status$.next({
        type: "success",
        message: "Files load succeeded"
      })
    }
  }

  resetAlert() {
    this.status$.next(this.initialValue)
  }
}
