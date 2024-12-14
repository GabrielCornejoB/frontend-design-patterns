import { Post } from './post.model';

export type PostsState = {
  posts: Post[] | null;
  isLoading: boolean;
};
