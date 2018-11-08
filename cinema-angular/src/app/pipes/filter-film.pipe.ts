import { Pipe, PipeTransform } from '@angular/core';
import {Film} from '../models/film';

@Pipe({
  name: 'filterFilm'
})
export class FilterFilmPipe implements PipeTransform {

  transform(filmList: Film[], currentValue: String): any {
    if (currentValue) {
      return filmList.filter(function (film: Film) {
        return film.title.trimLeft().toLowerCase().trimLeft().includes(currentValue.trimLeft().toLowerCase()) ||
        film.description.trimLeft().toLowerCase().trimLeft().includes(currentValue.trimLeft().toLowerCase());
      });
    }
    return filmList;
  }

}