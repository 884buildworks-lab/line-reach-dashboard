import Papa from 'papaparse';
import { Municipality } from '@/types/municipality';

/**
 * CSVファイルから自治体データを読み込む
 *
 * @param fileName - データファイル名（例: "2024-11.csv"）
 * @returns 自治体データの配列
 */
export async function loadMunicipalityData(fileName: string): Promise<Municipality[]> {
  try {
    // サーバーサイドではファイルシステムから、クライアントサイドではfetchで取得
    let csvText: string;

    if (typeof window === 'undefined') {
      // サーバーサイド（ビルド時）- ファイルシステムから読み込み
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(process.cwd(), 'public', 'data', fileName);

      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${fileName}`);
      }

      csvText = fs.readFileSync(filePath, 'utf-8');
    } else {
      // クライアントサイド - fetchで取得
      const basePath = process.env.NODE_ENV === 'production' ? '/line-reach-dashboard' : '';
      const response = await fetch(`${basePath}/data/${fileName}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
      }

      csvText = await response.text();
    }

    return new Promise((resolve, reject) => {
      Papa.parse<Municipality>(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            console.error('CSV parsing errors:', results.errors);
          }

          // データの検証とマッピング
          const validData = results.data
            .filter(row => validateMunicipalityData(row))
            .map((row, index) => mapToMunicipality(row, index));

          resolve(validData);
        },
        error: (error: Error) => {
          reject(new Error(`CSV parsing error: ${error.message}`));
        }
      });
    });
  } catch (error) {
    console.error('Error loading municipality data:', error);
    throw error;
  }
}

/**
 * 自治体データの妥当性を検証
 */
function validateMunicipalityData(row: any): boolean {
  return (
    // municipality_codeは空でも許容（後で生成する）
    row.municipality_name &&
    row.prefecture &&
    row.account_name &&
    typeof row.friends_count === 'number' &&
    typeof row.population === 'number' &&
    typeof row.registration_rate === 'number'
  );
}

/**
 * CSVデータをMunicipality型にマッピング
 */
function mapToMunicipality(row: any, index: number): Municipality {
  // municipality_codeが空の場合は、インデックスから生成
  const municipalityCode = row.municipality_code
    ? String(row.municipality_code)
    : String(index + 1).padStart(6, '0');

  // population_categoryのマッピング（簡略版から正式版へ）
  const populationCategory = normalizePopulationCategory(row.population_category);

  return {
    municipality_code: municipalityCode,
    municipality_name: String(row.municipality_name),
    prefecture: String(row.prefecture),
    account_name: String(row.account_name),
    friends_count: Number(row.friends_count),
    population: Number(row.population),
    registration_rate: Number(row.registration_rate),
    population_category: populationCategory,
    updated_at: String(row.updated_at),
    line_url: row.line_url ? String(row.line_url) : undefined
  };
}

/**
 * population_categoryを正規化
 * CSVの簡略版（「市」「町村」）を正式版にマッピング
 */
function normalizePopulationCategory(category: string): any {
  // 既に正式版の場合はそのまま返す
  if (['政令指定都市', '中核市', '一般市', '町村'].includes(category)) {
    return category;
  }

  // 簡略版から正式版へのマッピング
  const categoryMap: Record<string, string> = {
    '市': '一般市',
    '町村': '町村',
    '特別区': '一般市'
  };

  return categoryMap[category] || '一般市';
}

/**
 * 利用可能なデータファイル一覧を取得
 *
 * @returns データファイル名の配列（例: ["2024-11.csv", "2024-12.csv"]）
 */
export function getAvailableDataFiles(): string[] {
  if (typeof window === 'undefined') {
    // サーバーサイド - ファイルシステムから取得
    try {
      const fs = require('fs');
      const path = require('path');
      const dataDir = path.join(process.cwd(), 'public', 'data');

      if (!fs.existsSync(dataDir)) {
        return [];
      }

      return fs.readdirSync(dataDir)
        .filter((file: string) => file.endsWith('.csv'))
        .sort()
        .reverse();
    } catch (error) {
      console.error('Error reading data directory:', error);
      return [];
    }
  }

  // クライアントサイド - ハードコードされたリスト
  // TODO: マニフェストファイルから動的に取得
  return [
    '2025-12-03.csv'
  ];
}

/**
 * 最新のデータファイル名を取得
 *
 * @returns 最新のデータファイル名
 */
export function getLatestDataFile(): string {
  const files = getAvailableDataFiles();
  if (files.length === 0) {
    throw new Error('No data files available');
  }

  // ファイル名の降順でソートして最新を取得
  return files.sort().reverse()[0];
}
