import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

export interface Question {
  type: 'multiple-choice' | 'matching' | 'true-false';
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

  constructor(private http: HttpClient) {}

  loadAllCountries(): Observable<any[]> {
    const requests = this.continents.map((c) =>
      this.http.get<any[]>(`assets/python/${c}.json`)
    );
    return forkJoin(requests).pipe(
      map((results) => {
        this.allCountries = results.flat();
        return this.allCountries;
      })
    );
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

  private getRandomCountry(): any {
    return this.allCountries[Math.floor(Math.random() * this.allCountries.length)];
  }

  private shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
