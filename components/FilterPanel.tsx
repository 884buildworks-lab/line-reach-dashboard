'use client';

import { FilterState, PREFECTURES, REGION_BLOCKS, POPULATION_CATEGORIES } from '@/types/municipality';
import { FiMapPin, FiMap, FiUsers, FiTrendingUp, FiRefreshCw } from 'react-icons/fi';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const handlePrefectureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || undefined;
    onFilterChange({ ...filters, prefecture: value, region: undefined });
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || undefined;
    onFilterChange({ ...filters, region: value as any, prefecture: undefined });
  };

  const handleCategoryChange = (category: string) => {
    const currentCategories = filters.populationCategories || [];
    const newCategories = currentCategories.includes(category as any)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category as any];

    onFilterChange({
      ...filters,
      populationCategories: newCategories.length > 0 ? newCategories : undefined
    });
  };

  const handlePopulationMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? undefined : Number(e.target.value);
    onFilterChange({
      ...filters,
      populationRange: {
        ...filters.populationRange,
        min: value
      }
    });
  };

  const handlePopulationMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? undefined : Number(e.target.value);
    onFilterChange({
      ...filters,
      populationRange: {
        ...filters.populationRange,
        max: value
      }
    });
  };

  const handleRegistrationRateMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? undefined : Number(e.target.value);
    onFilterChange({
      ...filters,
      registrationRateRange: {
        ...filters.registrationRateRange,
        min: value
      }
    });
  };

  const handleRegistrationRateMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? undefined : Number(e.target.value);
    onFilterChange({
      ...filters,
      registrationRateRange: {
        ...filters.registrationRateRange,
        max: value
      }
    });
  };

  const handleReset = () => {
    onFilterChange({});
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl mb-6 border border-gray-100 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-purple-600">🔍</span>
          フィルター
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* 都道府県フィルター */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FiMapPin className="text-purple-600" />
            都道府県
          </label>
          <select
            value={filters.prefecture || ''}
            onChange={handlePrefectureChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white hover:border-purple-300 transition-all"
            disabled={!!filters.region}
          >
            <option value="">すべて</option>
            {PREFECTURES.map(pref => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
        </div>

        {/* 地方ブロックフィルター */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FiMap className="text-purple-600" />
            地方ブロック
          </label>
          <select
            value={filters.region || ''}
            onChange={handleRegionChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white hover:border-purple-300 transition-all"
            disabled={!!filters.prefecture}
          >
            <option value="">すべて</option>
            {REGION_BLOCKS.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {/* 自治体区分フィルター */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FiUsers className="text-purple-600" />
            自治体区分
          </label>
          <div className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
            {POPULATION_CATEGORIES.map(category => (
              <label key={category} className="flex items-center cursor-pointer group/item hover:bg-white px-2 py-1 rounded-lg transition-all">
                <input
                  type="checkbox"
                  checked={filters.populationCategories?.includes(category) || false}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover/item:text-purple-600 transition-colors">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 人口フィルター */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FiTrendingUp className="text-purple-600" />
            人口
          </label>
          <div className="space-y-2">
            <div>
              <label htmlFor="population-min" className="block text-xs text-gray-600 mb-1 ml-1">
                下限
              </label>
              <input
                id="population-min"
                type="number"
                min="0"
                step="1000"
                value={filters.populationRange?.min ?? ''}
                onChange={handlePopulationMinChange}
                placeholder="例: 10000"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-purple-300 transition-all"
              />
            </div>
            <div>
              <label htmlFor="population-max" className="block text-xs text-gray-600 mb-1 ml-1">
                上限
              </label>
              <input
                id="population-max"
                type="number"
                min="0"
                step="1000"
                value={filters.populationRange?.max ?? ''}
                onChange={handlePopulationMaxChange}
                placeholder="例: 30000"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-purple-300 transition-all"
              />
            </div>
          </div>
        </div>

        {/* 登録率フィルター */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FiTrendingUp className="text-purple-600" />
            登録率 (%)
          </label>
          <div className="space-y-2">
            <div>
              <label htmlFor="rate-min" className="block text-xs text-gray-600 mb-1 ml-1">
                下限
              </label>
              <input
                id="rate-min"
                type="number"
                min="0"
                max="100"
                step="1"
                value={filters.registrationRateRange?.min ?? ''}
                onChange={handleRegistrationRateMinChange}
                placeholder="例: 50"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-purple-300 transition-all"
              />
            </div>
            <div>
              <label htmlFor="rate-max" className="block text-xs text-gray-600 mb-1 ml-1">
                上限
              </label>
              <input
                id="rate-max"
                type="number"
                min="0"
                max="100"
                step="1"
                value={filters.registrationRateRange?.max ?? ''}
                onChange={handleRegistrationRateMaxChange}
                placeholder="例: 100"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-purple-300 transition-all"
              />
            </div>
          </div>
        </div>

        {/* リセットボタン */}
        <div className="flex items-end">
          <button
            onClick={handleReset}
            className="w-full px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 font-semibold"
          >
            <FiRefreshCw className="text-lg" />
            すべてクリア
          </button>
        </div>
      </div>
    </div>
  );
}
