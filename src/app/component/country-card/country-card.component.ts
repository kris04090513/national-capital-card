import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../../service/language.service';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
})
export class CountryCardComponent {
  @Input() countries: any[] = [];
  @Output() countryClick = new EventEmitter<any>();

  constructor(public languageService: LanguageService) {}

  onCardClick(country: any): void {
    this.countryClick.emit(country);
  }

  getCountryName(country: any): string {
    return this.languageService.getCountryName(country);
  }

  formatPopulation(population: number): string {
    if (!population) return this.languageService.translate('label.noData');
    return population.toLocaleString();
  }

  getLanguages(languages: any): string {
    if (!languages) return this.languageService.translate('label.noData');
    return Object.values(languages).join(', ');
  }

  getSubregionColor(subregion: string): string {
    const colorMap: { [key: string]: string } = {
      'Northern Europe': '#FFB6C1',
      'Western Europe': '#87CEEB',
      'Southern Europe': '#98FB98',
      'Southeast Europe': '#98EE47',
      'Eastern Europe': '#DDA0DD',
      'Central Europe': '#F0E68C',
      'Northern Africa': '#F0E68C',
      'Western Africa': '#E6E6FA',
      'Middle Africa': '#FFA07A',
      'Eastern Africa': '#B0E0E6',
      'Southern Africa': '#FFDAB9',
      'North America': '#FFC0CB',
      'Central America': '#90EE90',
      Caribbean: '#FFD700',
      'South America': '#FFA500',
      'Central Asia': '#D8BFD8',
      'Eastern Asia': '#FF69B4',
      'Southern Asia': '#20B2AA',
      'South-Eastern Asia': '#FF6347',
      'Western Asia': '#BA55D3',
      'Australia and New Zealand': '#7FFFD4',
      Melanesia: '#FF7F50',
      Micronesia: '#6495ED',
      Polynesia: '#FF1493',
    };
    return colorMap[subregion] || '#E0E0E0';
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

  getWikiLink(country: any): string {
    const name = country.translations?.zho?.common || country.name.common;
    return `https://zh.wikipedia.org/wiki/${name}`;
  }
}
