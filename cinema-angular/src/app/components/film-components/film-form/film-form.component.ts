import { Component, OnInit } from '@angular/core';
import {Category} from '../../../models/category';
import {Language} from '../../../models/language';
import {CategoryService} from '../../../services/category.service';
import {LanguageService} from '../../../services/language.service';
import {ComplexFilm} from '../../../models/complex-film';
import {Film} from '../../../models/film';
import {FilmService} from '../../../services/film.service';
import {Actor} from '../../../models/actor';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent implements OnInit {


  private film: ComplexFilm;
  private categories: Category[];
  private languages: Language[];
  private id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private filmService: FilmService,
              private categoryService: CategoryService,
              private languageService: LanguageService) { }

  ngOnInit() {

    this.route.paramMap.subscribe((id2) => this.id = +id2.get('id'));
    this.languages = <Array<Language>> new Array();
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
    this.categoryService.getCategories().subscribe(value => {
      this.categories = value;
    });
    this.languageService.getLanguages().subscribe(value => {
      this.languages = value;
    });

    if (this.id) {
      this.filmService.getComplexFilm(this.id).subscribe((value) => {
        this.film = value;
      });
    }
  }


  valider(form): boolean {
    if (!form.valid
      || !this.film.filmEntity.languageId
      || !this.film.filmEntity.originalLanguageId
      || this.film.actorEntityList.length === 0
      || this.film.categoryEntityList.length === 0) {
      window.alert('Please fill all the form.');
      return false;
    }
    
    if (+this.film.filmEntity.releaseYear > 2155  || +this.film.filmEntity.releaseYear < 1901) {
      window.alert('Release year must be higher than 1901 and lower than 2155');
      return false;
    }

    if (+this.film.filmEntity.length > 500 || +this.film.filmEntity.length < 0) {
      window.alert('Length must be higher than 0 and lower than 500');
      return false;
    }
    if (!this.id) {
      this.filmService.addComplexFilm(this.film).subscribe(
        () => {

        },
        (error) => {
          console.log(error.messages);
          return false;
        },
        () => {
          window.location.href = 'films';
        }
      );
    } else {
      this.filmService.updateComplexFilm(this.film).subscribe(
        () => {

        },
        (error) => {
          console.log(error.messages);
          return false;
        },
        () => {
          window.location.href = 'film/' + this.film.filmEntity.filmId;
        }
      );
    }
    return true;

  }

  categoryChangeHandler(category: Category) {
    if (category !== null && !this.film.categoryEntityList.includes(category)) {
      this.film.categoryEntityList.push(category);
    }
  }

  rmCat(category: Category) {
    const updatedArray = [];
    for (const el of this.film.categoryEntityList) {
      if (el !== category) {
        updatedArray.push(el);
      }
    }
    this.film.categoryEntityList = updatedArray;
  }

  actorChangeHandler(actor: Actor) {
    if (actor !== null && !this.film.actorEntityList.includes(actor)) {
      this.film.actorEntityList.push(actor);
    }
  }

  rmAct(actor: Actor) {
    const updatedArray = [];
    for (const el of this.film.actorEntityList) {
      if (el !== actor) {
        updatedArray.push(el);
      }
    }
    this.film.actorEntityList = updatedArray;
  }

  languageChangeHandler(language: Language) {
    if (language !== null) {
      this.film.filmEntity.languageId = language.languageId;
    }
  }

  rmLanguage() {
    this.film.filmEntity.languageId = null;
  }

  originalLanguageChangeHandler(language: Language) {
    if (language !== null) {
      this.film.filmEntity.originalLanguageId = language.languageId;
    }
  }

  rmOriginalLanguage() {
    this.film.filmEntity.originalLanguageId = null;
  }
}
