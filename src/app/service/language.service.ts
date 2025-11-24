import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'zho' | 'eng' | 'jpn';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<Language>('zho');
  currentLang$ = this.currentLangSubject.asObservable();

  private dictionary: { [key: string]: { [key in Language]: string } } = {
    'app.title': { zho: 'National Capital Card', eng: 'National Capital Card', jpn: 'National Capital Card' },
    'app.subtitle': { zho: '探索世界各國，挑戰你的地理知識', eng: 'Explore the world, challenge your geography knowledge', jpn: '世界を探索し、地理の知識に挑戦しよう' },
    'btn.start': { zho: '開始探索', eng: 'Start Explore', jpn: '探索を開始' },
    'btn.home': { zho: '回首頁', eng: 'Home', jpn: 'ホーム' },
    'btn.back': { zho: '回到地圖', eng: 'Back to Map', jpn: '地図に戻る' },
    'btn.quiz': { zho: '進入測驗', eng: 'Quiz', jpn: 'クイズ' },
    'quiz.title': { zho: '互動問答遊戲', eng: 'Interactive Quiz', jpn: 'インタラクティブクイズ' },
    'quiz.score': { zho: '得分', eng: 'Score', jpn: 'スコア' },
    'quiz.correct': { zho: '答對', eng: 'Correct', jpn: '正解' },
    'quiz.wrong': { zho: '答錯', eng: 'Wrong', jpn: '不正解' },
    'quiz.time': { zho: '用時', eng: 'Time', jpn: '時間' },
    'quiz.end': { zho: '結束測驗', eng: 'End Quiz', jpn: '終了' },
    'quiz.result': { zho: '測驗結果', eng: 'Result', jpn: '結果' },
    'quiz.review': { zho: '錯題複習', eng: 'Review', jpn: '復習' },
    'quiz.your_answer': { zho: '您的回答', eng: 'Your Answer', jpn: 'あなたの回答' },
    'quiz.correct_answer': { zho: '正確答案', eng: 'Correct Answer', jpn: '正解' },
    'quiz.back_menu': { zho: '返回選單', eng: 'Back to Menu', jpn: 'メニューに戻る' },
    'quiz.mode.standard': { zho: '綜合測驗 (10題)', eng: 'Standard (10 Qs)', jpn: '標準 (10問)' },
    'quiz.mode.infinite': { zho: '無限試題模式', eng: 'Infinite Mode', jpn: '無限モード' },
    'quiz.region.all': { zho: '所有地區', eng: 'All Regions', jpn: '全地域' },
    'quiz.region.asia': { zho: '亞洲', eng: 'Asia', jpn: 'アジア' },
    'quiz.region.europe': { zho: '歐洲', eng: 'Europe', jpn: 'ヨーロッパ' },
    'quiz.region.africa': { zho: '非洲', eng: 'Africa', jpn: 'アフリカ' },
    'quiz.region.americas': { zho: '美洲', eng: 'Americas', jpn: 'アメリカ' },
    'quiz.region.oceania': { zho: '大洋洲', eng: 'Oceania', jpn: 'オセアニア' },
    'card.capital': { zho: '首都', eng: 'Capital', jpn: '首都' },
    'card.population': { zho: '人口', eng: 'Population', jpn: '人口' },
    'card.language': { zho: '語言', eng: 'Language', jpn: '言語' },
    'card.continent': { zho: '洲份', eng: 'Continent', jpn: '大陸' },
    'card.wiki': { zho: '維基百科', eng: 'Wikipedia', jpn: 'ウィキペディア' },
    'msg.correct': { zho: '答對了！', eng: 'Correct!', jpn: '正解！' },
    'msg.wrong': { zho: '答錯了！正確答案是', eng: 'Wrong! Correct answer is', jpn: '不正解！正解は' },
    'q.flag': { zho: '這面旗幟屬於哪個國家？', eng: 'Which country does this flag belong to?', jpn: 'この国旗はどの国のものですか？' },
    'q.capital': { zho: '的首都為何？', eng: "'s capital is?", jpn: 'の首都は？' },
    'q.capital_check': { zho: '的首都是', eng: "'s capital is", jpn: 'の首都は' },
    'q.continent': { zho: '位於哪一個洲？', eng: 'is located in which continent?', jpn: 'はどの大陸にありますか？' },
    'q.reverse_flag': { zho: '哪一面是', eng: 'Which is the flag of', jpn: 'どちらが' },
    'q.reverse_flag_suffix': { zho: '的國旗？', eng: '?', jpn: 'の国旗ですか？' },
    'bool.yes': { zho: '是', eng: 'Yes', jpn: 'はい' },
    'bool.no': { zho: '否', eng: 'No', jpn: 'いいえ' },
  };

  constructor() { }

  setLanguage(lang: Language) {
    this.currentLangSubject.next(lang);
  }

  getCurrentLanguage(): Language {
    return this.currentLangSubject.value;
  }

  translate(key: string): string {
    const lang = this.getCurrentLanguage();
    return this.dictionary[key]?.[lang] || key;
  }

  getCountryName(country: any): string {
    const lang = this.getCurrentLanguage();
    if (lang === 'zho') return country.translations?.zho?.common || country.name.common;
    if (lang === 'jpn') return country.translations?.jpn?.common || country.name.common;
    return country.name.common;
  }
}
