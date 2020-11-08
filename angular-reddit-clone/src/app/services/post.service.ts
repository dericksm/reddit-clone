import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../models/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 
  private apiURL: string = `${environment.apiURL}/posts`

  constructor(private httpClient: HttpClient) { }

  save(post: CreatePostPayload) {
    return this.httpClient.post<CreatePostPayload>(this.apiURL, post);
  }

  findAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.apiURL}`);
  }

  findById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.apiURL}/${id}`);
  }

  findByUsername(username: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.apiURL}/by-user/${username}`);
  }

  // finishProcess(id: number) {
  //   return this.http.get(`${this.apiURL}/${id}/finish-process`);
  // }
  
  // addFedback(process: Process) {
  //   return this.http.put(`${this.apiURL}/${process.id}/add-feedback`, process);
  // }

  // addResponsibleClients(id, responsibleClients) {
  //   return this.http.put(`${this.apiURL}/${id}/responsible-clients`, responsibleClients);
  // }
}
