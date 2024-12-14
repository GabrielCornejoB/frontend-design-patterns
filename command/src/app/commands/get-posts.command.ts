import { PostsCommand } from './posts.command';
import { PostsStoreService } from '../posts-store/posts-store.service';
import { catchError, delay, EMPTY, switchMap, tap } from 'rxjs';
import { PostsHttpService } from '../posts-http/posts-http.service';

export class GetPostsCommand extends PostsCommand {
  constructor(
    store: PostsStoreService,
    readonly http: PostsHttpService,
  ) {
    super(store);
  }

  override execute(): void {
    this.store.effect(($) =>
      $.pipe(
        tap(() => this.store.patchState({ isLoading: true })),
        switchMap(() =>
          this.http.getAll().pipe(
            delay(1500),
            tap(() => this.store.patchState({ isLoading: false })),
            catchError((err) => {
              console.error(err);
              return EMPTY;
            }),
            tap({ next: (res) => this.store.patchState({ posts: res }) }),
          ),
        ),
      ),
    )();
  }
}
