import { PostsCommand } from './posts.command';
import { PostsStoreService } from '../posts-store/posts-store.service';
import { PostsHttpService } from '../posts-http/posts-http.service';
import { catchError, delay, EMPTY, switchMap, tap } from 'rxjs';

export class GetOnePostCommand extends PostsCommand {
  constructor(
    store: PostsStoreService,
    readonly http: PostsHttpService,
  ) {
    super(store);
  }

  override execute() {
    this.store.effect(($) =>
      $.pipe(
        tap(() => this.store.patchState({ isLoading: true })),
        switchMap(() => this.getRandomPostId()),
        switchMap((postId: number) =>
          this.http.getOne(postId).pipe(
            delay(1500),
            tap(() => this.store.patchState({ isLoading: false })),
            catchError((err) => {
              console.error(err);
              return EMPTY;
            }),
            tap({
              next: (res) => this.store.patchState({ post: res }),
            }),
          ),
        ),
      ),
    )();
  }
}
