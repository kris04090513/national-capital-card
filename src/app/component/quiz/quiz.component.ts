import { Component, OnInit } from '@angular/core';
import { QuizService, Question } from '../../service/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  currentQuestion: Question | null = null;
  score: number = 0;
  loading: boolean = true;
  message: string = '';
  isCorrect: boolean | null = null;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.loadAllCountries().subscribe(() => {
      this.loading = false;
      this.nextQuestion();
    });
  }

  nextQuestion(): void {
    const randomType = Math.floor(Math.random() * 3);
    switch (randomType) {
      case 0:
        this.currentQuestion = this.quizService.generateMultipleChoiceQuestion();
        break;
      case 1:
        this.currentQuestion = this.quizService.generateMatchingQuestion();
        break;
      case 2:
        this.currentQuestion = this.quizService.generateTrueFalseQuestion();
        break;
    }
    this.message = '';
    this.isCorrect = null;
  }

  checkAnswer(selectedOption: string): void {
    if (!this.currentQuestion || this.isCorrect !== null) return;

    if (selectedOption === this.currentQuestion.correctAnswer) {
      this.score++;
      this.message = '答對了！';
      this.isCorrect = true;
    } else {
      this.message = `答錯了！正確答案是 ${this.currentQuestion.correctAnswer}`;
      this.isCorrect = false;
    }

    setTimeout(() => {
      this.nextQuestion();
    }, 2000);
  }
}
