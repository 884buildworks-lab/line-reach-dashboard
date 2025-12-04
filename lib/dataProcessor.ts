import { Municipality, FilterState, Statistics, REGION_MAPPING } from '@/types/municipality';

/**
 * フィルター条件に基づいてデータを絞り込む
 *
 * @param data - 元データ
 * @param filters - フィルター条件
 * @returns フィルター済みデータ
 */
export function filterMunicipalityData(
  data: Municipality[],
  filters: FilterState
): Municipality[] {
  return data.filter(item => {
    // 都道府県フィルター
    if (filters.prefecture && item.prefecture !== filters.prefecture) {
      return false;
    }

    // 地方ブロックフィルター
    if (filters.region) {
      const prefecturesInRegion = REGION_MAPPING[filters.region];
      if (!prefecturesInRegion.includes(item.prefecture)) {
        return false;
      }
    }

    // 人口規模フィルター（複数選択対応）
    if (filters.populationCategories && filters.populationCategories.length > 0) {
      if (!filters.populationCategories.includes(item.population_category)) {
        return false;
      }
    }

    // 人口範囲フィルター
    if (filters.populationRange) {
      const { min, max } = filters.populationRange;
      if (min !== undefined && item.population < min) {
        return false;
      }
      if (max !== undefined && item.population > max) {
        return false;
      }
    }

    // 登録率範囲フィルター
    if (filters.registrationRateRange) {
      const { min, max } = filters.registrationRateRange;
      if (min !== undefined && item.registration_rate < min) {
        return false;
      }
      if (max !== undefined && item.registration_rate > max) {
        return false;
      }
    }

    return true;
  });
}

/**
 * 統計値を計算する
 *
 * @param data - データ配列
 * @param excludedIds - 除外する自治体コードのSet
 * @returns 統計値
 */
export function calculateStatistics(
  data: Municipality[],
  excludedIds: Set<string> = new Set()
): Statistics {
  // 除外設定を反映
  const targetData = data.filter(item => !excludedIds.has(item.municipality_code));

  if (targetData.length === 0) {
    return {
      average: 0,
      median: 0,
      max: 0,
      min: 0,
      count: 0
    };
  }

  // 登録率の配列を取得
  const rates = targetData.map(item => item.registration_rate);

  // 平均値
  const average = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;

  // 中央値
  const sortedRates = [...rates].sort((a, b) => a - b);
  const mid = Math.floor(sortedRates.length / 2);
  const median = sortedRates.length % 2 === 0
    ? (sortedRates[mid - 1] + sortedRates[mid]) / 2
    : sortedRates[mid];

  // 最大値・最小値
  const max = Math.max(...rates);
  const min = Math.min(...rates);

  return {
    average: Number(average.toFixed(2)),
    median: Number(median.toFixed(2)),
    max: Number(max.toFixed(2)),
    min: Number(min.toFixed(2)),
    count: targetData.length
  };
}

/**
 * データをソートする
 *
 * @param data - データ配列
 * @param sortKey - ソートするキー
 * @param sortOrder - ソート順序（'asc' | 'desc'）
 * @returns ソート済みデータ
 */
export function sortMunicipalityData(
  data: Municipality[],
  sortKey: keyof Municipality,
  sortOrder: 'asc' | 'desc' = 'asc'
): Municipality[] {
  return [...data].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue, 'ja')
        : bValue.localeCompare(aValue, 'ja');
    }

    return 0;
  });
}
