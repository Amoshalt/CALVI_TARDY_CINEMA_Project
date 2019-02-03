import { Component, OnInit } from '@angular/core';
import {Actor} from '../../../models/actor';
import {ActorService} from '../../../services/actor.service';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrls: ['./actor-form.component.css']
})
export class ActorFormComponent implements OnInit {

  private actor: Actor;

  constructor(private actorService: ActorService) { }

  ngOnInit() {
    this.actor = new Actor('', '', '');
  }

  valider(form): boolean {
    if (!form.valid) {
      window.alert('Des champs required sont vides');
      return false;
    }
    this.actorService.addActor(this.actor).subscribe(
      () => {

      },
      (error) => {
        console.log(error.messages);
        return false;
      },
      () => {
        window.location.href = 'actors';
      }
    );
    return true;
  }

}
