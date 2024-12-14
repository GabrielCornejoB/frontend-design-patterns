import { PostsStoreService } from '../posts-store/posts-store.service';

export abstract class PostsCommand {
  store: PostsStoreService;

  protected constructor(store: PostsStoreService) {
    this.store = store;
  }

  abstract execute(payload: unknown): void;
}
