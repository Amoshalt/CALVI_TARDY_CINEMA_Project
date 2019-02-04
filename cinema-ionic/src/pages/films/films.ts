import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ComplexFilm} from "../../models/complex-film";
import {FilmProvider} from "../../providers/film/film";
import {FilmPage} from "../film/film";
import {AddFilmPage} from "../add-film/add-film";
import {ActorProvider} from "../../providers/actor/actor";
import {Actor} from "../../models/actor";

/**
 * Generated class for the FilmsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-films',
  templateUrl: 'films.html',
})
export class FilmsPage {

  films: ComplexFilm[];
  filmSearched: string;
  resourcesLoaded: boolean;
  actors: Actor[];
  actorSelectedId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public filmProvider: FilmProvider, public actorProvider: ActorProvider) {
    this.filmSearched = '';
    this.films = [];
    this.resourcesLoaded = false;
    this.filmProvider.getComplexFilms().subscribe( value => {
      this.resourcesLoaded = true;
      this.films = value.sort((a, b) => {
        if (a.filmEntity.title < b.filmEntity.title) { return -1; }
        if (a.filmEntity.title > b.filmEntity.title) { return 1; }
        return 0;
      });
    });
    this.actorProvider.getActors().subscribe(value => {
      this.actors = value.sort((a: Actor, b: Actor) => {
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) { return 1; }
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) { return 1; }
        return 0;
      });
    });
  }

  ionViewDidLoad() {
  }

  goToDetail(film: ComplexFilm){
    this.navCtrl.push(FilmPage,{ film: film });
  }


  addFilm(){
    this.navCtrl.push(AddFilmPage);
  }

  refreshFilms() {

    this.films = [];
    this.resourcesLoaded = false;
    this.filmProvider.getComplexFilmsByActor(this.actorSelectedId).subscribe(value => {
      this.resourcesLoaded = true;
      this.films = value.sort((a, b) => {
        if (a.filmEntity.title < b.filmEntity.title) { return -1; }
        if (a.filmEntity.title > b.filmEntity.title) { return 1; }
        return 0;
      });
    });
  }
}
