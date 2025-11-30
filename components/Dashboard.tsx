'use client';

import { useState, useEffect } from 'react';
import { Municipality, FilterState } from '@/types/municipality';
import { filterMunicipalityData, calculateStatistics } from '@/lib/dataProcessor';
import { loadMunicipalityData } from '@/lib/dataLoader';
import FilterPanel from './FilterPanel';
import StatsDisplay from './StatsDisplay';
import DataTable from './DataTable';
import ExportButton from './ExportButton';
import DataFileSelector from './DataFileSelector';
import { FiX } from 'react-icons/fi';

interface DashboardProps {
  initialData: Municipality[];
  initialFile: string;
  availableFiles: string[];
}

export default function Dashboard({ initialData, initialFile, availableFiles }: DashboardProps) {
  const [data, setData] = useState<Municipality[]>(initialData);
  const [selectedFile, setSelectedFile] = useState<string>(initialFile);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({});
  const [excludedIds, setExcludedIds] = useState<Set<string>>(new Set());

  // データファイル選択時の処理
  useEffect(() => {
    // 初期ファイルと同じ場合はロード不要
    if (selectedFile === initialFile) {
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const newData = await loadMunicipalityData(selectedFile);
        setData(newData);
        // フィルターと除外設定をクリア
        setFilters({});
        setExcludedIds(new Set());
      } catch (err) {
        console.error('Failed to load data:', err);
        setError(`データの読み込みに失敗しました: ${selectedFile}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedFile, initialFile]);

  // フィルター済みデータ
  const filteredData = filterMunicipalityData(data, filters);

  // 統計値（除外設定を反映）
  const statistics = calculateStatistics(filteredData, excludedIds);

  // エクスポート用データ（除外設定を反映）
  const exportData = filteredData.filter(item => !excludedIds.has(item.municipality_code));

  const handleExcludedChange = (id: string, excluded: boolean) => {
    setExcludedIds(prev => {
      const newSet = new Set(prev);
      if (excluded) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleClearExcluded = () => {
    setExcludedIds(new Set());
  };

  return (
    <div className="space-y-6">
      {/* データファイル選択 */}
      <DataFileSelector
        selectedFile={selectedFile}
        availableFiles={availableFiles}
        onFileChange={setSelectedFile}
      />

      {/* ローディング状態 */}
      {isLoading && (
        <div className="bg-blue-50/90 backdrop-blur-sm border-2 border-blue-300 rounded-2xl p-6 text-center shadow-lg animate-fadeIn">
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700"></div>
            <p className="text-blue-700 font-semibold">データを読み込んでいます...</p>
          </div>
        </div>
      )}

      {/* エラー表示 */}
      {error && (
        <div className="bg-red-50/90 backdrop-blur-sm border-2 border-red-300 rounded-2xl p-6 shadow-lg animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        </div>
      )}

      {/* フィルターパネル */}
      <FilterPanel filters={filters} onFilterChange={setFilters} />

      {/* 統計表示 */}
      <StatsDisplay stats={statistics} excludedCount={excludedIds.size} />

      {/* アクションボタン */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          {excludedIds.size > 0 && (
            <button
              onClick={handleClearExcluded}
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 font-semibold"
            >
              <FiX className="text-lg" />
              除外をクリア ({excludedIds.size}件)
            </button>
          )}
        </div>
        <ExportButton data={exportData} />
      </div>

      {/* データテーブル */}
      <DataTable
        data={filteredData}
        excludedIds={excludedIds}
        onExcludedChange={handleExcludedChange}
      />

      {/* データ件数表示 */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-100">
          <span className="text-sm font-semibold text-gray-700">
            表示中: <span className="text-purple-600">{filteredData.length}件</span>
          </span>
          <span className="text-gray-400">/</span>
          <span className="text-sm font-semibold text-gray-500">
            全 {data.length}件
          </span>
        </div>
      </div>
    </div>
  );
}
