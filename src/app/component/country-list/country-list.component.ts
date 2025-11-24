import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  continent: string = '';
  countries: any[] = [];
  filteredCountries: any[] = [];
  count: number = 0;
  selectedSubregion: string = 'all';
  subregions: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.continent = this.route.snapshot.paramMap.get('name') || '';
    this.fetchCountries(this.continent);
  }

  private fetchCountries(continent: string): void {
    console.log('con', continent);
    // https://restcountries.com/v3.1/all
    let continentName = continent.toLowerCase().replace(' ', '');

    const url = `assets/python/${continentName}.json`;
    // const url = `${environment.apiUrl}/countries/${this.continent}`;
    this.http.get<any[]>(url).subscribe((data) => {
      console.log(this.continent);
      this.count = data.length;
      // this.countries = data.filter((c) => c.region === this.continent);
      this.countries = data.filter(
        (c) => c.region === this.continent || c.subregion === this.continent
      );
      this.filteredCountries = [...this.countries];
      this.updateSubregions();
    });
  }

  updateSubregions(): void {
    const uniqueSubregions = new Set(
      this.countries.map((country) => country.subregion)
    );
    this.subregions = ['all', ...Array.from(uniqueSubregions).sort()];
  }

  onSubregionChange(): void {
    if (this.selectedSubregion === 'all') {
      this.filteredCountries = [...this.countries];
    } else {
      this.filteredCountries = this.countries.filter(
        (country) => country.subregion === this.selectedSubregion
      );
    }
    this.count = this.filteredCountries.length;
  }

  getSubregionColor(subregion: string): string {
    const colorMap: { [key: string]: string } = {
      'Northern Europe': '#FFB6C1', // Light pink
      'Western Europe': '#87CEEB', // Sky blue
      'Southern Europe': '#98FB98', // Pale green
      'Southeast Europe': '#98EE47', //
      'Eastern Europe': '#DDA0DD', // Plum
      'Central Europe': '#F0E68C', // Khaki
      'Northern Africa': '#F0E68C', // Khaki
      'Western Africa': '#E6E6FA', // Lavender
      'Middle Africa': '#FFA07A', // Light salmon
      'Eastern Africa': '#B0E0E6', // Powder blue
      'Southern Africa': '#FFDAB9', // Peach puff
      'North America': '#FFC0CB', // Pink
      'Central America': '#90EE90', // Light green
      Caribbean: '#FFD700', // Gold
      'South America': '#FFA500', // Orange
      'Central Asia': '#D8BFD8', // Thistle
      'Eastern Asia': '#FF69B4', // Hot pink
      'Southern Asia': '#20B2AA', // Light sea green
      'South-Eastern Asia': '#FF6347', // Tomato
      'Western Asia': '#BA55D3', // Medium orchid
      'Australia and New Zealand': '#7FFFD4', // Aquamarine
      Melanesia: '#FF7F50', // Coral
      Micronesia: '#6495ED', // Cornflower blue
      Polynesia: '#FF1493', // Deep pink
    };

    return colorMap[subregion] || '#E0E0E0'; // Default gray color if subregion not found
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

    return translationMap[subregion] || subregion; // Return original if translation not found
  }
}
