import { Injectable } from '@angular/core';
import { GuessableWord } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WordService {
  constructor(private readonly httpClient: HttpClient) { }
  
  getRandomWord(): Observable<GuessableWord> {
    return this.httpClient.get<GuessableWord>('http://localhost:3000/hangman');
  }
}
