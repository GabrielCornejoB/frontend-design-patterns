import { PostsStoreService } from '../posts-store/posts-store.service';
import { filter, map, Observable, take } from 'rxjs';
import { Post } from '../models/post.model';

export abstract class PostsCommand {
  store: PostsStoreService;

  protected constructor(store: PostsStoreService) {
    this.store = store;
  }

  abstract execute(payload: unknown): void;

  getRandomPostId(): Observable<number> {
    return this.store
      .select((s) => s.posts)
      .pipe(
        take(1),
        filter((posts): posts is Post[] => posts !== null),
        map((posts) => posts[Math.floor(Math.random() * posts.length)].id),
      );
  }
}
