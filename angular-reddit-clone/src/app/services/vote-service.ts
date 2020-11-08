import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Vote } from '../models/vote-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private apiURL: string = `${environment.apiURL}/votes`

  constructor(private httpClient: HttpClient) { }

  vote(vote: Vote): Observable<any> {
    return this.httpClient.post(this.apiURL, vote);
  }
}
