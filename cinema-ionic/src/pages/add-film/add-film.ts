import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AddCategoryPage} from "../add-category/add-category";
import {Category} from "../../models/category";
import {Film} from "../../models/film";
import {ComplexFilm} from "../../models/complex-film";
import {Actor} from "../../models/actor";
import {AddActorPage} from "../add-actor/add-actor";
import {FilmProvider} from "../../providers/film/film";
import {Language} from "../../models/language";
import {LanguageProvider} from "../../providers/language/language";
import {FilmPage} from "../film/film";

/**
 * Generated class for the AddFilmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-film',
  templateUrl: 'add-film.html',
})
export class AddFilmPage {

  film: ComplexFilm;
  filmtempon: ComplexFilm;
  languages: Language[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController, public filmProvider: FilmProvider, public languageProvider: LanguageProvider) {
  }

  ionViewDidLoad() {
  }
  ionViewWillEnter() {
    this.languageProvider.getLanguages().subscribe( value => {
      this.languages = value;
    });
    this.film = new ComplexFilm(
      new Film(
        null,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''), <Array<Actor>> new Array(), <Array<Category>> new Array());

    let film2 = this.navParams.get('film');
    if (film2) {
      this.film = film2;
    }
    this.filmtempon = this.film;
  }



  public addCategory() {
    let modal = this.modalController.create(AddCategoryPage, {'categories' : this.film.categoryEntityList });
    modal.onDidDismiss(data => {
      if (data) {
        for (let category of data) {
          if (!this.film.categoryEntityList.includes(category)) {
            this.film.categoryEntityList.push(category);
          }
        }
      }
    });
    modal.present();
  }

  public addActor() {
    let modal = this.modalController.create(AddActorPage,{'actors' : this.film.actorEntityList});
    modal.onDidDismiss(data => {
      if (data) {
        for (let actor of data) {
          if (!this.film.actorEntityList.includes(actor)) {
            this.film.actorEntityList.push(actor);
          }
        }
      }
    });
    modal.present();
  }

  public removeActor(actor : Actor) {
    this.film.actorEntityList = this.film.actorEntityList.filter(actorOfList => actorOfList !== actor);
  }

  public removeCategory(category : Category) {
    this.film.categoryEntityList = this.film.categoryEntityList.filter(categoryOfList => categoryOfList !== category);
  }

  public valider(form) : boolean {

    if (!form.valid
      || !this.film.filmEntity.languageId
      || !this.film.filmEntity.originalLanguageId
      || this.film.actorEntityList.length === 0
      || this.film.categoryEntityList.length === 0) {
      return false;
    }

    if (+this.film.filmEntity.releaseYear > 2155 || +this.film.filmEntity.releaseYear < 1901) {
      window.alert('Release year must be higher than 1901 and lower than 2155');
      return false;
    }

    if (+this.film.filmEntity.length > 500 || +this.film.filmEntity.length < 0 ) {
      window.alert('Length must be higher than 0 and lower than 500');
      return false;
    }

    this.languages.map(value => {
      if (value.languageId == this.film.filmEntity.languageId) {
        this.film.languageNormal = value;
      }
    });
    this.languages.map(value => {
      if (value.languageId == this.film.filmEntity.originalLanguageId) {
        this.film.languageVO = value;
      }
    });

    if (!this.film.filmEntity.filmId) {
      this.filmProvider.addComplexFilm(this.film).subscribe(
        () => {

        },
        (error) => {
          console.log(error.messages);
        },
        () => {
          this.navCtrl.push(FilmPage, {
            film: this.film
          });
        }
      );
    } else {
      this.filmProvider.updateComplexFilm(this.film).subscribe(
        () => {

        },
        (error) => {
          console.log(error.messages);
        },
        () => {
          this.navCtrl.push(FilmPage, {
          film: this.film
        });
        }
      );
    }
  }
}
