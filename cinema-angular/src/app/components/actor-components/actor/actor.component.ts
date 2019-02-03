import {Component, Input, OnInit} from '@angular/core';
import {Actor} from '../../../models/actor';
import {ActorService} from '../../../services/actor.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  @Input()
  actor: Actor;
  @Input()
  showDelete: boolean;

  constructor(private actorService: ActorService) { }

  ngOnInit() {
    if (this.showDelete !== false) {
      this.showDelete = true;
    }
  }

  removeActor(actor: Actor) {
    this.actorService.delete(actor).subscribe(      () => {

      },
      (error) => {
        console.log(error.messages);
      },
      () => {
        window.location.href = 'actors';
      });
  }

}
