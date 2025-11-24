import { Component } from '@angular/core';
import { LanguageService, Language } from './service/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'national-capital-card';
  dataTime: string = new Date().toLocaleString();

  constructor(public languageService: LanguageService) {}

  setLanguage(lang: string) {
    this.languageService.setLanguage(lang as Language);
  }
}
