import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actor} from '../models/actor';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Film} from '../models/film';
import {ComplexFilm} from '../models/complex-film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private type: String;

  constructor(public http: HttpClient) {
    this.type = 'Film/';
  }

  getFilms(): Observable<Film[]> {
    const url = environment.api + this. type + 'getFilms';
    return this.http.get(url).pipe(map(films => films as Film[]));
  }

  getComplexFilms(): Observable<ComplexFilm[]> {
    const url = environment.api + this. type + 'getComplexFilms';
    return this.http.get(url).pipe(map(films => films as ComplexFilm[]));
  }

  getComplexFilmsByCategoryId(id: number): Observable<ComplexFilm[]> {
    const url = environment.api + this. type + 'getComplexFilmsByCategory/' + id;
    return this.http.get(url).pipe(map(films => films as ComplexFilm[]));
  }

  getComplexFilm(id: number): Observable<ComplexFilm> {
    const url = environment.api + this. type + 'getComplexFilm/' + id;
    return this.http.get(url).pipe(map(film => film as ComplexFilm));
  }

  addComplexFilm(film: ComplexFilm) {
    const url = environment.api + this. type + 'addComplexFilm';
    return this.http.post(url, film);
  }

  updateComplexFilm(film: ComplexFilm) {
    const url = environment.api + this. type + 'updateComplexFilm';
    return this.http.post(url, film);
  }

  removeComplexFilm(filmComplex: ComplexFilm) {
    const url = environment.api + 'Film/removeComplexFilm/' + filmComplex.filmEntity.filmId;
    return this.http.get(url).pipe(map(message => message as string))
  }
}
