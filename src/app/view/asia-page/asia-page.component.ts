import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asia-page',
  templateUrl: './asia-page.component.html',
  styleUrls: ['./asia-page.component.scss'],
})
export class AsiaPageComponent implements OnInit {
  constructor() {}
  list = [
    {
      natCh: '中国',
      natEn: 'China',
      capCh: '北京',
      capEn: 'Beijing',
    },
    {
      natCh: '印度',
      natEn: 'India',
      capCh: '新德里',
      capEn: 'New Delhi',
    },
    {
      natCh: '日本',
      natEn: 'Japan',
      capCh: '東京',
      capEn: 'Tokyo',
    },
    {
      natCh: '韩国',
      natEn: 'South Korea',
      capCh: '首爾',
      capEn: 'Seoul',
    },
    {
      natCh: '俄羅斯',
      natEn: 'Russia',
      capCh: '莫斯科',
      capEn: 'Moscow',
    },
    {
      natCh: '印尼',
      natEn: 'Indonesia',
      capCh: '雅加達',
      capEn: 'Jakarta',
    },
    {
      natCh: '巴基斯坦',
      natEn: 'Pakistan',
      capCh: '伊斯蘭堡',
      capEn: 'Islamabad',
    },
    {
      natCh: '孟加拉國',
      natEn: 'Bangladesh',
      capCh: '達卡',
      capEn: 'Dhaka',
    },
    {
      natCh: '土耳其',
      natEn: 'Turkey',
      capCh: '安卡拉',
      capEn: 'Ankara',
    },
    {
      natCh: '伊朗',
      natEn: 'Iran',
      capCh: '德黑蘭',
      capEn: 'Tehran',
    },
    {
      natCh: '伊拉克',
      natEn: 'Iraq',
      capCh: '巴格達',
      capEn: 'Baghdad',
    },
    {
      natCh: '沙特阿拉伯',
      natEn: 'Saudi Arabia',
      capCh: '利雅得',
      capEn: 'Riyadh',
    },
    {
      natCh: '阿聯酋',
      natEn: 'UAE',
      capCh: '阿布達比',
      capEn: 'Abu Dhabi',
    },
    {
      natCh: '以色列',
      natEn: 'Israel',
      capCh: '耶路撒冷（爭議）',
      capEn: 'Jerusalem (Disputed)',
    },
    {
      natCh: '泰國',
      natEn: 'Thailand',
      capCh: '曼谷',
      capEn: 'Bangkok',
    },
    {
      natCh: '越南',
      natEn: 'Vietnam',
      capCh: '河內',
      capEn: 'Hanoi',
    },
    {
      natCh: '菲律賓',
      natEn: 'Philippines',
      capCh: '馬尼拉',
      capEn: 'Manila',
    },
    {
      natCh: '馬來西亞',
      natEn: 'Malaysia',
      capCh: '吉隆坡',
      capEn: 'Kuala Lumpur',
    },
    {
      natCh: '新加坡',
      natEn: 'Singapore',
      capCh: '新加坡',
      capEn: 'Singapore',
    },
    {
      natCh: '孟買',
      natEn: 'Mumbai',
      capCh: '未知',
      capEn: 'Unknown',
    },
    {
      natCh: '塞爾維亞',
      natEn: 'Serbia',
      capCh: '貝爾格勒',
      capEn: 'Belgrade',
    },
    {
      natCh: '哈薩克斯坦',
      natEn: 'Kazakhstan',
      capCh: '努爾蘇丹',
      capEn: 'Nur-Sultan',
    },
    {
      natCh: '黎巴嫩',
      natEn: 'Lebanon',
      capCh: '貝魯特',
      capEn: 'Beirut',
    },
    {
      natCh: '斯里蘭卡',
      natEn: 'Sri Lanka',
      capCh: '科倫坡',
      capEn: 'Colombo',
    },
    {
      natCh: '尼泊爾',
      natEn: 'Nepal',
      capCh: '加德滿都',
      capEn: 'Kathmandu',
    },
  ];
  ngOnInit(): void {}
}
