import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../service/language.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(
    private router: Router,
    public languageService: LanguageService,
  ) {}

  ngOnInit(): void {}

  startExplore(): void {
    this.router.navigate(['/map']);
  }
}
