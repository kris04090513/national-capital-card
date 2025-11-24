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

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private continents = ['asia', 'europe', 'africa', 'americas', 'oceania'];
  private allCountries: any[] = [];
  private filteredCountries: any[] = [];

  constructor(private http: HttpClient) {}

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
    const correctAnswer = country.translations?.zho?.common || country.name.common;
    const options = [correctAnswer];

    while (options.length < 4) {
      const randomOption = this.getRandomCountry().translations?.zho?.common || this.getRandomCountry().name.common;
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }

    return {
      type: 'multiple-choice',
      question: '這面旗幟屬於哪個國家？',
      flagUrl: country.flags.svg,
      options: this.shuffleArray(options),
      correctAnswer: correctAnswer,
      countryName: correctAnswer // Add for review
    };
  }

  generateMatchingQuestion(): Question {
    const country = this.getRandomCountry();
    const capital = country.capital?.[0] || '未知';
    const countryName = country.translations?.zho?.common || country.name.common;
    const options = [capital];

    while (options.length < 4) {
      const randomCapital = this.getRandomCountry().capital?.[0];
      if (randomCapital && !options.includes(randomCapital)) {
        options.push(randomCapital);
      }
    }

    return {
      type: 'matching',
      question: `${countryName} 的首都為何？`,
      options: this.shuffleArray(options),
      correctAnswer: capital,
    };
  }

  generateTrueFalseQuestion(): Question {
    const country = this.getRandomCountry();
    const isCorrect = Math.random() > 0.5;
    const countryName = country.translations?.zho?.common || country.name.common;
    let displayedCapital = country.capital?.[0] || '未知';

    if (!isCorrect) {
      displayedCapital = this.getRandomCountry().capital?.[0] || '未知';
    }

    return {
      type: 'true-false',
      question: `${countryName} 的首都是 ${displayedCapital} 嗎？`,
      options: ['是', '否'],
      correctAnswer: isCorrect ? '是' : '否',
    };
  }

  generateContinentQuestion(): Question {
    const country = this.getRandomCountry();
    const countryName = country.translations?.zho?.common || country.name.common;
    const correctContinent = this.getContinentTranslation(country.region);
    
    // Options are fixed: Asia, Europe, Africa, Americas, Oceania
    const options = ['亞洲', '歐洲', '非洲', '美洲', '大洋洲'];

    return {
      type: 'continent',
      question: `${countryName} 位於哪一個洲？`,
      flagUrl: country.flags.svg,
      options: options,
      correctAnswer: correctContinent,
    };
  }

  generateReverseFlagQuestion(): Question {
    const country = this.getRandomCountry();
    const countryName = country.translations?.zho?.common || country.name.common;
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
      question: `哪一面是 ${countryName} 的國旗？`,
      options: this.shuffleArray(options),
      correctAnswer: correctFlag,
    };
  }

  private getContinentTranslation(region: string): string {
    const map: { [key: string]: string } = {
      'Asia': '亞洲',
      'Europe': '歐洲',
      'Africa': '非洲',
      'Americas': '美洲',
      'Oceania': '大洋洲',
      'Antarctic': '南極洲'
    };
    return map[region] || region;
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
