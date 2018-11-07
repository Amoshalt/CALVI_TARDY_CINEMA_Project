import {Component, Input, OnInit} from '@angular/core';
import {Actor} from '../models/actor';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  @Input()
  actor: Actor;

  constructor() { }

  ngOnInit() {
  }

}
