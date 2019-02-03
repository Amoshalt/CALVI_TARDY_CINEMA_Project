import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Actor} from "../../models/actor";
import {ActorProvider} from "../../providers/actor/actor";
import {AddFilmPage} from "../add-film/add-film";
import {AddActorPage} from "../add-actor/add-actor";
import {CreateActorPage} from "../create-actor/create-actor";

/**
 * Generated class for the ActorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actors',
  templateUrl: 'actors.html',
})
export class ActorsPage {

  items: Actor[];
  actorSearched: string;

  constructor(public navCtrl: NavController, public actorProvider: ActorProvider, public navParams: NavParams) {
    this.actorSearched = '';
    this.items = [];
    this.actorProvider.getActors().subscribe( value => {
      this.items = value;
    });
  }

  ionViewDidLoad() {
  }

  public removeActor(actor: Actor) {
    this.actorProvider.removeActor(actor).subscribe(      () => {

      },
      (error) => {
        console.log(error.messages);
      },
      () => {
        this.navCtrl.push(ActorsPage);
      });
  }


  addActor(){
    this.navCtrl.push(CreateActorPage);
  }
}
