import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() nationalFlag: string = '台灣';
  @Input() nationalCh: string = '台灣';
  @Input() nationalEn: string = 'Taiwan';
  @Input() capitalCh: string = '台北';
  @Input() capitalEn: string = 'taipei';
  @Input() population: number = 0;
  @Input() language: string = '';
  @Input() continent: string = '';
  @Input() wikiLink: string = '';
  open: boolean = true;
  isFlipped: boolean = false;

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
  constructor() {}

  ngOnInit(): void {}
 
}
