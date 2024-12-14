import { Injectable } from '@angular/core';
import { PostsState } from '../models/posts-state.model';
import { ComponentStore } from '@ngrx/component-store';
import { PostsHttpService } from '../posts-http/posts-http.service';
import { GetPostsCommand } from '../commands/get-posts.command';
import { PostsCommand } from '../commands/posts.command';

@Injectable()
export class PostsStoreService extends ComponentStore<PostsState> {
  stream$ = this.select((state) => state);

  getAllAction: PostsCommand;

  constructor(private readonly http: PostsHttpService) {
    super({
      posts: null,
      isLoading: false,
    });
    this.getAllAction = new GetPostsCommand(this, this.http);
  }
}
