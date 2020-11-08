import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommentPayload } from '../models/comment.payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiURL: string = `${environment.apiURL}/comments`

  constructor(private httpClient: HttpClient) {}

  save(comment: CommentPayload) {
    return this.httpClient.post<CommentPayload>(this.apiURL, comment);
  }

  findAll(): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(`${this.apiURL}`);
  }

  findById(id: number): Observable<CommentPayload> {
    return this.httpClient.get<CommentPayload>(`${this.apiURL}/${id}`);
  }
  
  findByPostId(id: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(`${this.apiURL}/by-post/${id}`);
  }

  findByUsername(username: string): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(`${this.apiURL}/by-user/${username}`);
  }
}
