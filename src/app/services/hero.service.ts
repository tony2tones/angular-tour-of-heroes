import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from "../hero";
import { HEROES } from "../mock-heroes";
import { MessageService } from "../services/message.service";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  constructor(private http: HttpClient ,private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  getHero(id:number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=> this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

private handleError<T>(opertaion = 'opertaion', result?: T) {
    return (error:any): Observable<T> => {
    this.log(`${opertaion} failed: ${error.message}`);
    return of(result as T);
    }
  };
 

}
