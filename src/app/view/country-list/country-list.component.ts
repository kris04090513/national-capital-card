import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../../service/language.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit, AfterViewInit, OnDestroy {
  continent: string = '';
  countries: any[] = [];
  filteredCountries: any[] = [];
  count: number = 0;
  selectedSubregion: string = 'all';
  subregions: string[] = [];

  // View mode and sorting
  viewMode: 'card' | 'list' = 'card';
  sortBy: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Popup
  selectedCountry: any = null;
  countryMapImage: string = '';

  // Continent map properties
  private continentMap: L.Map | undefined;
  private geoJsonData: any = null;
  showContinentMap: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.continent = this.route.snapshot.paramMap.get('name') || '';
    this.fetchCountries(this.continent);
  }

  ngAfterViewInit(): void {
    // Initialize continent map after view is ready
    setTimeout(() => this.initContinentMap(), 100);
  }

  ngOnDestroy(): void {
    if (this.continentMap) {
      this.continentMap.remove();
    }
  }

  private initContinentMap(): void {
    if (!this.showContinentMap) return;

    this.continentMap = L.map('continent-map', {
      center: [20, 0],
      zoom: 2,
      minZoom: 1,
      maxZoom: 6,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.continentMap);

    this.loadContinentGeoJson();
  }

  private loadContinentGeoJson(): void {
    fetch('assets/json/world-continents.geojson')
      .then((response) => response.json())
      .then((data) => {
        // Filter features by current continent
        const continentFeatures = data.features.filter(
          (f: any) => f.properties.continent === this.continent,
        );

        if (continentFeatures.length === 0) return;

        const filteredData: GeoJSON.FeatureCollection = {
          type: 'FeatureCollection',
          features: continentFeatures,
        };

        const geoJsonLayer = L.geoJSON(filteredData, {
          style: (feature) => ({
            color: '#ffffff',
            weight: 1.5,
            fillColor: this.getRandomColor(feature?.properties.name || ''),
            fillOpacity: 0.7,
          }),
          onEachFeature: (feature, layer) => {
            const countryName = feature.properties.name || 'Unknown';
            const isoCode = (feature.properties.iso_a2 || '').toLowerCase();
            const flagUrl = isoCode
              ? `https://flagcdn.com/24x18/${isoCode}.png`
              : '';

            const tooltipContent = flagUrl
              ? `<img src="${flagUrl}" alt="flag" style="margin-right: 6px; vertical-align: middle;" /><span>${countryName}</span>`
              : `<span>${countryName}</span>`;

            layer.bindTooltip(tooltipContent, {
              permanent: false,
              direction: 'top',
              className: 'country-tooltip',
            });
          },
        }).addTo(this.continentMap!);

        // Fit map to continent bounds
        const bounds = geoJsonLayer.getBounds();
        if (bounds.isValid()) {
          this.continentMap?.fitBounds(bounds, { padding: [20, 20] });
        }
      })
      .catch((error) => console.error('Error loading GeoJSON:', error));
  }

  private getRandomColor(seed: string): string {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 65%, 55%)`;
  }

  private fetchCountries(continent: string): void {
    console.log('con', continent);
    let continentName = continent.toLowerCase().replace(' ', '');

    const url = `assets/python/${continentName}.json`;
    this.http.get<any[]>(url).subscribe((data) => {
      console.log(this.continent);
      this.count = data.length;
      this.countries = data.filter(
        (c) => c.region === this.continent || c.subregion === this.continent,
      );
      this.filteredCountries = [...this.countries];
      this.updateSubregions();
    });
  }

  updateSubregions(): void {
    const uniqueSubregions = new Set(
      this.countries.map((country) => country.subregion),
    );
    this.subregions = ['all', ...Array.from(uniqueSubregions).sort()];
  }

  onSubregionChange(): void {
    if (this.selectedSubregion === 'all') {
      this.filteredCountries = [...this.countries];
    } else {
      this.filteredCountries = this.countries.filter(
        (country) => country.subregion === this.selectedSubregion,
      );
    }
    this.count = this.filteredCountries.length;
    this.sortCountries();
  }

  // View mode toggle
  setViewMode(mode: 'card' | 'list'): void {
    this.viewMode = mode;
  }

  // Sorting
  onSortChange(): void {
    this.sortCountries();
  }

  onTableSortChange(event: {
    sortBy: string;
    direction: 'asc' | 'desc';
  }): void {
    this.sortBy = event.sortBy;
    this.sortDirection = event.direction;
    this.sortCountries();
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortCountries();
  }

  private sortCountries(): void {
    const dir = this.sortDirection === 'asc' ? 1 : -1;
    this.filteredCountries.sort((a, b) => {
      let valA: any, valB: any;
      switch (this.sortBy) {
        case 'name':
          valA = this.getCountryName(a).toLowerCase();
          valB = this.getCountryName(b).toLowerCase();
          break;
        case 'population':
          valA = a.population || 0;
          valB = b.population || 0;
          break;
        case 'region':
          valA = a.subregion || '';
          valB = b.subregion || '';
          break;
        default:
          return 0;
      }
      if (valA < valB) return -1 * dir;
      if (valA > valB) return 1 * dir;
      return 0;
    });
  }

  getCountryName(country: any): string {
    return this.languageService.getCountryName(country);
  }

  // Popup
  openCountryPopup(country: any): void {
    this.selectedCountry = country;
    this.captureCountryMapImage(country);
  }

  closeCountryPopup(): void {
    this.selectedCountry = null;
    this.countryMapImage = '';
  }

  private captureCountryMapImage(country: any): void {
    // Generate a simple map image URL using static map API
    const lat = country.latlng?.[0] || 0;
    const lng = country.latlng?.[1] || 0;
    // Use OpenStreetMap static image
    this.countryMapImage = `https://static-maps.yandex.ru/1.x/?ll=${lng},${lat}&z=4&l=map&size=200,120&lang=en_US`;
  }

  formatPopulation(population: number): string {
    if (!population) return this.languageService.translate('label.noData');
    return population.toLocaleString();
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

  getLanguages(languages: any): string {
    if (!languages) return '未知';
    return Object.values(languages).join(', ');
  }

  getWikiLink(country: any): string {
    const name = country.translations?.zho?.common || country.name.common;
    return `https://zh.wikipedia.org/wiki/${name}`;
  }
}
