'use client';

import { useState } from 'react';
import { Municipality, FilterState } from '@/types/municipality';
import { filterMunicipalityData, calculateStatistics } from '@/lib/dataProcessor';
import FilterPanel from './FilterPanel';
import MunicipalityScatterChart from './MunicipalityScatterChart';
import StatsDisplay from './StatsDisplay';

interface VisualizationDashboardProps {
  initialData: Municipality[];
}

export default function VisualizationDashboard({ initialData }: VisualizationDashboardProps) {
  const [filters, setFilters] = useState<FilterState>({});

  // フィルタリングされたデータ
  const filteredData = filterMunicipalityData(initialData, filters);

  // 統計を計算
  const stats = calculateStatistics(filteredData);

  return (
    <div className="space-y-6">
      {/* フィルターパネル */}
      <FilterPanel filters={filters} onFilterChange={setFilters} />

      {/* 統計表示 */}
      <StatsDisplay stats={stats} excludedCount={0} />

      {/* 散布図 */}
      {filteredData.length > 0 ? (
        <MunicipalityScatterChart data={filteredData} />
      ) : (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-12 text-center border border-gray-100">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-lg font-semibold text-gray-600 mb-2">
            フィルター条件に一致するデータがありません
          </p>
          <p className="text-sm text-gray-500">
            フィルター条件を変更してください
          </p>
        </div>
      )}
    </div>
  );
}
