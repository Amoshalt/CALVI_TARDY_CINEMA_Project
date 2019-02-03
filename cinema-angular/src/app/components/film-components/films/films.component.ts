import {Component, Input, OnInit} from '@angular/core';
import {FilmService} from '../../../services/film.service';
import {Film} from '../../../models/film';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';
import {ComplexFilm} from '../../../models/complex-film';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  @Input()
  cat: Category;

  private complexFilms: ComplexFilm[];
  private filmSearched: string;
  private categories: Category[];
  private resourcesLoaded: boolean;

  constructor(private filmService: FilmService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.filmSearched = '';
    this.resourcesLoaded = false;
    this.filmService.getComplexFilms().subscribe( value => {
      this.resourcesLoaded = true;
      this.complexFilms = value;
    });
    this.categoryService.getCategories().subscribe(value => {
      this.categories = value;
    });

  }
  categoryChangeHandler(category: Category) {
    this.resourcesLoaded = false;
    this.complexFilms = null;
    if (category === null) {
      this.filmService.getComplexFilms().subscribe(value => {
        this.resourcesLoaded = true;
        this.complexFilms = value;
      });
    } else {
      this.filmService.getComplexFilmsByCategoryId(category.categoryId).subscribe( value => {
        this.resourcesLoaded = true;
        this.complexFilms = value;
      });
    }
  }
}
