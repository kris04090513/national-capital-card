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
  wrongCount: number = 0;
  loading: boolean = true;
  message: string = '';
  isCorrect: boolean | null = null;

  // New properties
  gameState: 'menu' | 'playing' | 'result' = 'menu';
  selectedMode: 'standard' | 'infinite' = 'standard';
  selectedRegion: string = 'all';
  regions = [
    { value: 'all', label: '所有地區' },
    { value: 'asia', label: '亞洲' },
    { value: 'europe', label: '歐洲' },
    { value: 'africa', label: '非洲' },
    { value: 'americas', label: '美洲' },
    { value: 'oceania', label: '大洋洲' }
  ];
  
  timer: number = 0;
  timerInterval: any;
  questionCount: number = 0;
  wrongAnswers: any[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.loadAllCountries().subscribe(() => {
      this.loading = false;
    });
  }

  startGame(mode: 'standard' | 'infinite'): void {
    this.selectedMode = mode;
    this.quizService.setQuizConfig(this.selectedRegion);
    this.gameState = 'playing';
    this.score = 0;
    this.wrongCount = 0;
    this.questionCount = 0;
    this.wrongAnswers = [];
    this.timer = 0;
    this.startTimer();
    this.nextQuestion();
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  endGame(): void {
    this.stopTimer();
    this.gameState = 'result';
  }

  restart(): void {
    this.gameState = 'menu';
    this.stopTimer();
  }

  nextQuestion(): void {
    if (this.selectedMode === 'standard' && this.questionCount >= 10) {
      this.endGame();
      return;
    }

    this.questionCount++;
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
      this.wrongCount++;
      this.message = `答錯了！正確答案是 ${this.currentQuestion.correctAnswer}`;
      this.isCorrect = false;
      this.wrongAnswers.push({
        question: this.currentQuestion.question,
        correctAnswer: this.currentQuestion.correctAnswer,
        userAnswer: selectedOption
      });
    }

    setTimeout(() => {
      this.nextQuestion();
    }, 1500); // Slightly faster transition
  }
}
