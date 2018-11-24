import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Language} from '../../../models/language';
import {Category} from '../../../models/category';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.css']
})
export class LanguageDropdownComponent implements OnInit {

  @Input()
  languages: Language[];

  @Output() languageChange: EventEmitter<Language> =   new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  returnLanguage(language: Language) {
    console.log(language);
    this.languageChange.emit(language);
  }

}
