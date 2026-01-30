import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss'],
})
export class WorldMapComponent implements OnInit, OnDestroy {
  private map: L.Map | undefined;
  private geoJsonLayer: L.GeoJSON | undefined;
  private geoJsonData: any;

  isCountryMode = false;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.initMap();
    this.loadGeoJson();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 5,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
  }

  private loadGeoJson(): void {
    fetch('assets/json/world-continents.geojson')
      .then((response) => response.json())
      .then((data) => {
        this.geoJsonData = data;
        this.renderGeoJson();
      })
      .catch((error) => console.error('Error loading GeoJSON:', error));
  }

  private renderGeoJson(): void {
    if (!this.map || !this.geoJsonData) return;

    // Remove existing layer if any
    if (this.geoJsonLayer) {
      this.map.removeLayer(this.geoJsonLayer);
    }

    this.geoJsonLayer = L.geoJSON(this.geoJsonData, {
      style: (feature) => this.getFeatureStyle(feature),
      onEachFeature: (feature, layer) => {
        // Always bind click for navigation
        layer.on('click', () => {
          this._router.navigate(['continent/', feature.properties.continent]);
        });

        // Add tooltip in country mode
        if (this.isCountryMode) {
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
        }
      },
    }).addTo(this.map);
  }

  private getFeatureStyle(feature: any): L.PathOptions {
    if (this.isCountryMode) {
      return {
        color: '#ffffff',
        weight: 1,
        fillColor: this.getRandomColor(feature.properties.name),
        fillOpacity: 0.7,
      };
    } else {
      return {
        color: '#ffffff',
        weight: 1,
        fillColor: feature
          ? this.getContinentColor(feature.properties.continent)
          : '#cccccc',
        fillOpacity: 0.6,
      };
    }
  }

  onToggleDisplayMode(): void {
    this.renderGeoJson();
  }

  private getContinentColor(continent: string): string {
    const colors: Record<string, string> = {
      Asia: '#ff5733',
      Europe: '#33ff57',
      Africa: '#5733ff',
      NorthAmerica: '#ffd700',
      SouthAmerica: '#ff33a8',
      Oceania: '#33a8ff',
      Antarctica: '#ffffff',
    };
    return colors[continent] || '#cccccc';
  }

  private getRandomColor(seed: string): string {
    // Generate a consistent color based on country name
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  }
}
