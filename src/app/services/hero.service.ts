import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Hero } from "../hero";
import { HEROES } from "../mock-heroes";
import { MessageService } from "../services/message.service";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: Fetched Heroes');
    return of(HEROES);
  }

  getHero(id:number): Observable<Hero> {
    this.messageService.add(`HeroService: Fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
