import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Actor} from '../models/actor';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private httpHeaders: HttpHeaders;
  private options;
  constructor(public http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin' : 'http://localhost'
    });
    this.options = {
      headers: this.httpHeaders
    };
  }

  getActors(): Observable<Actor[]> {
    const url = environment.api + 'Actor/getActors';
    return this.http.get(url).pipe(map(actors => actors as Actor[]));
  }

  getActor(id: number): Observable<Actor> {
    const url = environment.api + 'acteur/' + id;
    return this.http.get<Actor>(url).pipe(map(actor => actor as Actor));
  }

  delete(actor: Actor) {
    const url = environment.api + '/Actor/removeActor';
    return this.http.post(url, actor);
  }

  addActor(actor: Actor): Observable<Object> {
    const url = environment.api + '/Actor/addActor';
    return this.http.post(url, actor);
  }
}
