import { Component } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';

import { RouterOutlet } from '@angular/router';
import { PostsStoreService } from './posts-store/posts-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgClass],
  providers: [PostsStoreService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'command';

  constructor(readonly store: PostsStoreService) {}
}
