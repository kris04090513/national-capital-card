import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
continent: string = '';
  countries: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.continent = this.route.snapshot.paramMap.get('name') || '';
    this.fetchCountries();
  }

  private fetchCountries(): void {
    this.http.get<any[]>('https://restcountries.com/v3.1/all')
      .subscribe(data => {
        // console.log(data)
        this.countries = data.filter(c => c.region === this.continent);
      });
  }
}
