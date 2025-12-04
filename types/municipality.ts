// 人口規模区分
export type PopulationCategory = '都道府県' | '市' | '町' | '村';

// 地方ブロック
export type RegionBlock =
  | '北海道・東北'
  | '関東'
  | '中部'
  | '近畿'
  | '中国'
  | '四国'
  | '九州・沖縄';

// 自治体データ
export interface Municipality {
  municipality_code: string;
  municipality_name: string;
  prefecture: string;
  account_name: string;
  friends_count: number;
  population: number;
  registration_rate: number;
  population_category: PopulationCategory;
  updated_at: string;
  line_url?: string;
}

// フィルター状態
export interface FilterState {
  prefecture?: string;
  region?: RegionBlock;
  populationCategories?: PopulationCategory[]; // 複数選択可能に変更
  populationRange?: {
    min?: number;
    max?: number;
  };
}

// 統計値
export interface Statistics {
  average: number;
  median: number;
  max: number;
  min: number;
  count: number;
}

// 都道府県リスト
export const PREFECTURES = [
  '北海道',
  '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県',
  '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
  '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県',
  '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
] as const;

// 地方ブロックマッピング
export const REGION_MAPPING: Record<RegionBlock, readonly string[]> = {
  '北海道・東北': ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
  '関東': ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'],
  '中部': ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'],
  '近畿': ['三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'],
  '中国': ['鳥取県', '島根県', '岡山県', '広島県', '山口県'],
  '四国': ['徳島県', '香川県', '愛媛県', '高知県'],
  '九州・沖縄': ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'],
} as const;

// 人口規模区分リスト
export const POPULATION_CATEGORIES: PopulationCategory[] = [
  '都道府県',
  '市',
  '町',
  '村',
];

// 地方ブロックリスト
export const REGION_BLOCKS: RegionBlock[] = [
  '北海道・東北',
  '関東',
  '中部',
  '近畿',
  '中国',
  '四国',
  '九州・沖縄',
];
