import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

export interface Question {
  type: 'multiple-choice' | 'matching' | 'true-false' | 'continent' | 'reverse-flag';
  question: string;
  options?: string[];
  correctAnswer: string;
  flagUrl?: string;
  countryName?: string;
}

import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private continents = ['asia', 'europe', 'africa', 'americas', 'oceania'];
  private allCountries: any[] = [];
  private filteredCountries: any[] = [];

  constructor(private http: HttpClient, private languageService: LanguageService) {}

  loadAllCountries(): Observable<any[]> {
    const requests = this.continents.map((c) =>
      this.http.get<any[]>(`assets/python/${c}.json`)
    );
    return forkJoin(requests).pipe(
      map((results) => {
        this.allCountries = results.flat();
        this.filteredCountries = [...this.allCountries]; // Default to all
        return this.allCountries;
      })
    );
  }

  setQuizConfig(region: string): void {
    if (region === 'all') {
      this.filteredCountries = [...this.allCountries];
    } else {
      // region in JSON is capitalized (e.g., "Asia"), but our input might be lowercase
      // The JSON data has "region": "Asia", "Europe", etc.
      // Let's handle case insensitivity just in case
      const targetRegion = region.toLowerCase();
      this.filteredCountries = this.allCountries.filter(
        (c) => c.region.toLowerCase() === targetRegion
      );
    }
  }

  generateMultipleChoiceQuestion(): Question {
    const country = this.getRandomCountry();
    const correctAnswer = this.languageService.getCountryName(country);
    const options = [correctAnswer];

    while (options.length < 4) {
      const randomOption = this.languageService.getCountryName(this.getRandomCountry());
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }

    return {
      type: 'multiple-choice',
      question: this.languageService.translate('q.flag'),
      flagUrl: country.flags.svg,
      options: this.shuffleArray(options),
      correctAnswer: correctAnswer,
      countryName: correctAnswer
    };
  }

  generateMatchingQuestion(): Question {
    const country = this.getRandomCountry();
    const capital = country.capital?.[0] || '未知';
    const countryName = this.languageService.getCountryName(country);
    const options = [capital];

    while (options.length < 4) {
      const randomCapital = this.getRandomCountry().capital?.[0];
      if (randomCapital && !options.includes(randomCapital)) {
        options.push(randomCapital);
      }
    }

    return {
      type: 'matching',
      question: `${countryName} ${this.languageService.translate('q.capital')}`,
      options: this.shuffleArray(options),
      correctAnswer: capital,
    };
  }

  generateTrueFalseQuestion(): Question {
    const country = this.getRandomCountry();
    const isCorrect = Math.random() > 0.5;
    const countryName = this.languageService.getCountryName(country);
    let displayedCapital = country.capital?.[0] || '未知';

    if (!isCorrect) {
      displayedCapital = this.getRandomCountry().capital?.[0] || '未知';
    }

    return {
      type: 'true-false',
      question: `${countryName} ${this.languageService.translate('q.capital_check')} ${displayedCapital} ?`,
      options: [this.languageService.translate('bool.yes'), this.languageService.translate('bool.no')],
      correctAnswer: isCorrect ? this.languageService.translate('bool.yes') : this.languageService.translate('bool.no'),
    };
  }

  generateContinentQuestion(): Question {
    const country = this.getRandomCountry();
    const countryName = this.languageService.getCountryName(country);
    const correctContinent = this.getContinentTranslation(country.region);
    
    const options = [
      this.languageService.translate('quiz.region.asia'),
      this.languageService.translate('quiz.region.europe'),
      this.languageService.translate('quiz.region.africa'),
      this.languageService.translate('quiz.region.americas'),
      this.languageService.translate('quiz.region.oceania')
    ];

    return {
      type: 'continent',
      question: `${countryName} ${this.languageService.translate('q.continent')}`,
      flagUrl: country.flags.svg,
      options: options,
      correctAnswer: correctContinent,
    };
  }

  generateReverseFlagQuestion(): Question {
    const country = this.getRandomCountry();
    const countryName = this.languageService.getCountryName(country);
    const correctFlag = country.flags.svg;
    
    const options = [correctFlag];
    while (options.length < 4) {
      const randomFlag = this.getRandomCountry().flags.svg;
      if (!options.includes(randomFlag)) {
        options.push(randomFlag);
      }
    }

    return {
      type: 'reverse-flag',
      question: `${this.languageService.translate('q.reverse_flag')} ${countryName} ${this.languageService.translate('q.reverse_flag_suffix')}`,
      options: this.shuffleArray(options),
      correctAnswer: correctFlag,
    };
  }

  private getContinentTranslation(region: string): string {
    const map: { [key: string]: string } = {
      'Asia': 'quiz.region.asia',
      'Europe': 'quiz.region.europe',
      'Africa': 'quiz.region.africa',
      'Americas': 'quiz.region.americas',
      'Oceania': 'quiz.region.oceania',
      'Antarctic': 'quiz.region.antarctic' // Add if needed
    };
    return this.languageService.translate(map[region] || region);
  }

  private getRandomCountry(): any {
    if (this.filteredCountries.length === 0) {
      // Fallback if something goes wrong or filter is empty
      return this.allCountries[Math.floor(Math.random() * this.allCountries.length)];
    }
    return this.filteredCountries[Math.floor(Math.random() * this.filteredCountries.length)];
  }

  private shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
