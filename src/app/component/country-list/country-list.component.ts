import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  continent: string = '';
  countries: any[] = [];
  count: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.continent = this.route.snapshot.paramMap.get('name') || '';
    // console.log('continent', this.continent);

    this.fetchCountries(this.continent);
  }

  private fetchCountries(continent: string): void {
    console.log('con', continent);
    // https://restcountries.com/v3.1/all
    let continentName = continent.toLowerCase().replace(' ', '');

    const url = `assets/json/${continentName}.json`;
    this.http.get<any[]>(url).subscribe((data) => {
      console.log(this.continent);
      this.count = data.length;
      // this.countries = data.filter((c) => c.region === this.continent);
      this.countries = data.filter(
        (c) => c.region === this.continent || c.subregion === this.continent
      );
      console.log('⏰', this.countries);
    });
  }
}
