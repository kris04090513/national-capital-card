import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {
 private map: L.Map | undefined;
ngOnInit(): void {
    this.initMap();
    this.loadGeoJson();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [20, 0], // 世界中心點
      zoom: 2,
      minZoom: 2,
      maxZoom: 5
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadGeoJson(): void {
    /*
    https://github.com/datasets/geo-boundaries-world-110m/blob/main/countries.geojson?short_path=2fcecba
    */
    fetch('assets/json/world-continents.geojson')
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data, {
          style: (feature) => ({
            color: '#ffffff',
            weight: 1,
            fillColor: feature ? this.getContinentColor(feature.properties.continent) : '#cccccc',
            fillOpacity: 0.6
          }),
          onEachFeature: (feature, layer) => {
            layer.on('click', () => {
              window.location.href = `/continent/${feature.properties.continent}`;
            });
          }
        }).addTo(this.map!);
      })
      .catch(error => console.error('Error loading GeoJSON:', error));
  }

  private getContinentColor(continent: string): string {
    const colors: Record<string, string> = {
      Asia: '#ff5733',
      Europe: '#33ff57',
      Africa: '#5733ff',
      NorthAmerica: '#ffd700',
      SouthAmerica: '#ff33a8',
      Oceania: '#33a8ff',
      Antarctica: '#ffffff'
    };
    return colors[continent] || '#cccccc';
  }
}
