import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../../service/language.service';

@Component({
  selector: 'app-country-popup',
  templateUrl: './country-popup.component.html',
  styleUrls: ['./country-popup.component.scss'],
})
export class CountryPopupComponent {
  @Input() country: any;
  @Input() mapImage: string = '';
  @Output() closePopup = new EventEmitter<void>();

  constructor(public languageService: LanguageService) {}

  close(): void {
    this.closePopup.emit();
  }

  onOverlayClick(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('popup-overlay')) {
      this.close();
    }
  }

  getCountryName(): string {
    return this.languageService.getCountryName(this.country);
  }

  formatPopulation(population: number): string {
    if (!population) return this.languageService.translate('label.noData');
    return population.toLocaleString();
  }

  getLanguages(): string {
    if (!this.country?.languages)
      return this.languageService.translate('label.noData');
    return Object.values(this.country.languages).join(', ');
  }

  getSubregionTranslation(subregion: string): string {
    const translationMap: { [key: string]: string } = {
      'Northern Europe': '北歐',
      'Western Europe': '西歐',
      'Southern Europe': '南歐',
      'Southeast Europe': '東南歐',
      'Eastern Europe': '東歐',
      'Central Europe': '中歐',
      'Northern Africa': '北非',
      'Western Africa': '西非',
      'Middle Africa': '中非',
      'Eastern Africa': '東非',
      'Southern Africa': '南非',
      'North America': '北美',
      'Central America': '中美洲',
      Caribbean: '加勒比海',
      'South America': '南美洲',
      'Central Asia': '中亞',
      'Eastern Asia': '東亞',
      'Southern Asia': '南亞',
      'South-Eastern Asia': '東南亞',
      'Western Asia': '西亞',
      'Australia and New Zealand': '澳洲與紐西蘭',
      Melanesia: '美拉尼西亞',
      Micronesia: '密克羅尼西亞',
      Polynesia: '玻里尼西亞',
    };
    return translationMap[subregion] || subregion;
  }

  getWikiLink(): string {
    const name =
      this.country.translations?.zho?.common || this.country.name.common;
    return `https://zh.wikipedia.org/wiki/${name}`;
  }

  formatArea(area: number): string {
    if (!area) return this.languageService.translate('label.noData');
    return area.toLocaleString() + ' km²';
  }
}
