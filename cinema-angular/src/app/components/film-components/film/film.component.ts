import {Component, Input, OnInit} from '@angular/core';
import {Film} from '../../../models/film';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {FilmService} from '../../../services/film.service';
import {Actor} from '../../../models/actor';
import {ComplexFilm} from '../../../models/complex-film';
import {ActorService} from '../../../services/actor.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  @Input()
  private id: number;

  public filmComplex: ComplexFilm;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private  filmService: FilmService) {
    this.id = 0;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((id2) => this.id = +id2.get('id'));
    this.filmService.getComplexFilm(this.id).subscribe( (value) => {
      this.filmComplex = value;
    });
  }

  removeFilm(filmComplex: ComplexFilm) {
    this.filmService.removeComplexFilm(filmComplex).subscribe(() => {
        window.location.href = 'films';
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
