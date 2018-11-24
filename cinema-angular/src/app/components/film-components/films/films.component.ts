import {Component, Input, OnInit} from '@angular/core';
import {FilmService} from '../../../services/film.service';
import {Film} from '../../../models/film';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';
import {forEach} from '@angular/router/src/utils/collection';
import {ComplexFilm} from '../../../models/complex-film';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  @Input()
  cat: Category;

  private _films: Film[];
  private complexFilms: ComplexFilm[];
  private filmSearched: string;
  private categories: Category[];

  private category: Category;

  constructor(private filmService: FilmService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.filmSearched = '';
    this.filmService.getFilms().subscribe( value => {
      this._films = value;
    });
    this.filmService.getComplexFilms().subscribe( value => {
      this.complexFilms = value;
    });
    this.categoryService.getCategories().subscribe(value => {
      this.categories = value;
    });

  }
  categoryChangeHandler(count: number) {
    if (count === 0) {
      this.filmService.getComplexFilms().subscribe(value => {
        this.complexFilms = value;
      });
    } else {
      this.filmService.getComplexFilmsByCategoryId(count).subscribe( value => {
        this.complexFilms = value;
      });
    }
  }

  reloadPage(test: number) {
    this.filmService.getComplexFilmsByCategoryId(test).subscribe( value => {
      this.complexFilms = value;
    });
  }
}
