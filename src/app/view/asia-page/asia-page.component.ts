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
      natCh: '臺灣',
      natEn: 'Taiwan',
      capCh: '臺北',
      capEn: 'Taipei',
      flag: 'TW',
    },
    {
      natCh: '中國',
      natEn: 'China',
      capCh: '北京',
      capEn: 'Beijing',
      flag: 'CN',
    },
    {
      natCh: '印度',
      natEn: 'India',
      capCh: '新德里',
      capEn: 'New Delhi',
      flag: 'IN',
    },
    {
      natCh: '日本',
      natEn: 'Japan',
      capCh: '東京',
      capEn: 'Tokyo',
      flag: 'JP',
    },
    {
      natCh: '韩国',
      natEn: 'South Korea',
      capCh: '首爾',
      capEn: 'Seoul',
      flag: 'KR',
    },
    {
      natCh: '俄羅斯',
      natEn: 'Russia',
      capCh: '莫斯科',
      capEn: 'Moscow',
      flag: 'RU',
    },
    {
      natCh: '印尼',
      natEn: 'Indonesia',
      capCh: '雅加達',
      capEn: 'Jakarta',
      flag: 'ID',
    },
    {
      natCh: '巴基斯坦',
      natEn: 'Pakistan',
      capCh: '伊斯蘭堡',
      capEn: 'Islamabad',
      flag: 'PK',
    },
    {
      natCh: '孟加拉國',
      natEn: 'Bangladesh',
      capCh: '達卡',
      capEn: 'Dhaka',
      flag: 'BD',
    },
    {
      natCh: '土耳其',
      natEn: 'Turkey',
      capCh: '安卡拉',
      capEn: 'Ankara',
      flag: 'TR',
    },
    {
      natCh: '伊朗',
      natEn: 'Iran',
      capCh: '德黑蘭',
      capEn: 'Tehran',
      flag: 'IR',
    },
    {
      natCh: '伊拉克',
      natEn: 'Iraq',
      capCh: '巴格達',
      capEn: 'Baghdad',
      flag: 'IQ',
    },
    {
      natCh: '沙特阿拉伯',
      natEn: 'Saudi Arabia',
      capCh: '利雅得',
      capEn: 'Riyadh',
      flag: 'SA',
    },
    {
      natCh: '阿聯酋',
      natEn: 'UAE',
      capCh: '阿布達比',
      capEn: 'Abu Dhabi',
      flag: 'AE',
    },
    {
      natCh: '以色列',
      natEn: 'Israel',
      capCh: '耶路撒冷（爭議）',
      capEn: 'Jerusalem (Disputed)',
      flag: 'IL',
    },
    {
      natCh: '泰國',
      natEn: 'Thailand',
      capCh: '曼谷',
      capEn: 'Bangkok',
      flag: 'TH',
    },
    {
      natCh: '越南',
      natEn: 'Vietnam',
      capCh: '河內',
      capEn: 'Hanoi',
      flag: 'VN',
    },
    {
      natCh: '菲律賓',
      natEn: 'Philippines',
      capCh: '馬尼拉',
      capEn: 'Manila',
      flag: 'PH',
    },
    {
      natCh: '馬來西亞',
      natEn: 'Malaysia',
      capCh: '吉隆坡',
      capEn: 'Kuala Lumpur',
      flag: 'MY',
    },
    {
      natCh: '新加坡',
      natEn: 'Singapore',
      capCh: '新加坡',
      capEn: 'Singapore',
      flag: 'SG',
    },
    {
      natCh: '孟買',
      natEn: 'Mumbai',
      capCh: '未知',
      capEn: 'Unknown',
      flag: '', // 孟買是印度城市，沒有國家代碼
    },
    {
      natCh: '塞爾維亞',
      natEn: 'Serbia',
      capCh: '貝爾格勒',
      capEn: 'Belgrade',
      flag: 'RS',
    },
    {
      natCh: '哈薩克斯坦',
      natEn: 'Kazakhstan',
      capCh: '努爾蘇丹',
      capEn: 'Nur-Sultan',
      flag: 'KZ',
    },
    {
      natCh: '黎巴嫩',
      natEn: 'Lebanon',
      capCh: '貝魯特',
      capEn: 'Beirut',
      flag: 'LB',
    },
    {
      natCh: '斯里蘭卡',
      natEn: 'Sri Lanka',
      capCh: '科倫坡',
      capEn: 'Colombo',
      flag: 'LK',
    },
    {
      natCh: '尼泊爾',
      natEn: 'Nepal',
      capCh: '加德滿都',
      capEn: 'Kathmandu',
      flag: 'NP',
    },
  ];
  ngOnInit(): void {}
  getLowerCaseFlag(flag: string): string {
    return flag.toLowerCase();
  }
}
