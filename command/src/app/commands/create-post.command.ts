import { PostsCommand } from './posts.command';
import { PostsStoreService } from '../posts-store/posts-store.service';
import { PostsHttpService } from '../posts-http/posts-http.service';
import { catchError, delay, EMPTY, switchMap, tap } from 'rxjs';

export class CreatePostCommand extends PostsCommand {
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
        switchMap(() =>
          this.http
            .create({
              userId: 1,
              title: 'Test Post',
              body: 'I am a test post',
            })
            .pipe(
              delay(1500),
              tap(() => this.store.patchState({ isLoading: false })),
              catchError((err) => {
                console.error(err);
                return EMPTY;
              }),
              tap({
                next: (res) =>
                  this.store.patchState((state) => ({
                    ...state,
                    post: null,
                    posts: [res, ...(state?.posts || [])],
                  })),
              }),
            ),
        ),
      ),
    )();
  }
}
