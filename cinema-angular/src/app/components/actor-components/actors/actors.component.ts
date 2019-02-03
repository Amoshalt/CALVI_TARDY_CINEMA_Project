import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Actor} from '../../../models/actor';
import {ActorService} from '../../../services/actor.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  private actors: Actor[];
  private actorSearched: String;

  @Output() actorChange: EventEmitter<Actor> =   new EventEmitter();

  constructor(private actorServ: ActorService) {
  }

  ngOnInit() {
    this.actorSearched = '';
    this.actorServ.getActors().subscribe( value => {
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

  returnActor(actor: Actor) {
    this.actorChange.emit(actor);
  }
}


