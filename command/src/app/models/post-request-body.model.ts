import { Post } from './post.model';

export type PostRequestBody = Omit<Post, 'id'>;
