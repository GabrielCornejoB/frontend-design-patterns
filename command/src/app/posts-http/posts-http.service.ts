import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { PostRequestBody } from '../models/post-request-body.model';

@Injectable({
  providedIn: 'root',
})
export class PostsHttpService {
  readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  getOne(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${postId}`);
  }

  create(requestBody: PostRequestBody): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}`, requestBody);
  }

  delete(postId: number) {
    return this.http.delete(`${this.baseUrl}/${postId}`);
  }
}
