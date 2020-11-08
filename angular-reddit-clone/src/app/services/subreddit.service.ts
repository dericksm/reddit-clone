import { SubredditModel } from './../models/subreddit-model';
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class SubredditService {

  private apiURL: string = `${environment.apiURL}/subreddit`;

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<SubredditModel[]> {
    return this.httpClient.get<SubredditModel[]>(`${this.apiURL}`);
  }

  findById(id: number): Observable<SubredditModel> {
    return this.httpClient.get<SubredditModel>(`${this.apiURL}/${id}`);
  }

  save(subreddit: SubredditModel) {
    return this.httpClient.post<SubredditModel>(this.apiURL, subreddit);
  }
}
