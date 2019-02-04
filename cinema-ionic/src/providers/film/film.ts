import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {ComplexFilm} from "../../models/complex-film";
import {environment} from "../../environments/environment";
import {Actor} from "../../models/actor";

/*
  Generated class for the FilmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilmProvider {

  filmsList: ComplexFilm[] = [];

  constructor(public http: HttpClient) {
  }

  public getComplexFilms(): Observable<ComplexFilm[]> {
    const url = environment.api + 'Film/getComplexFilms';
    return this.http.get(url).pipe(map(films => films as ComplexFilm[]));

  }


  addComplexFilm(film: ComplexFilm) {
    const url = environment.api + 'Film/addComplexFilm';
    return this.http.post(url, film);
  }

  getComplexFilm(filmId : number): Observable<ComplexFilm> {
    const url = environment.api + 'Film/getComplexFilm/' + filmId;
    return this.http.get(url).pipe(map(film => film as ComplexFilm));
  }

  public updateComplexFilm(film: ComplexFilm) {
    const url = environment.api + 'Film/updateComplexFilm';
    return this.http.post(url, film);
  }

  public removeComplexFilm(filmId): Observable<string> {
    const url = environment.api + 'Film/removeComplexFilm/' + filmId;
    return this.http.get(url).pipe(map(message => message as string));
  }

  getComplexFilmsByActor(actorSelectedId: number) {
      const url = environment.api + 'Film/getComplexFilmsByActor/' + actorSelectedId;
      return this.http.get(url).pipe(map(films => films as ComplexFilm[]));
  }
}
