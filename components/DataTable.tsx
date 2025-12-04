'use client';

import { useState } from 'react';
import { Municipality } from '@/types/municipality';
import { sortMunicipalityData } from '@/lib/dataProcessor';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

interface DataTableProps {
  data: Municipality[];
  excludedIds: Set<string>;
  onExcludedChange: (id: string, excluded: boolean) => void;
}

type SortKey = keyof Municipality;
type SortOrder = 'asc' | 'desc';

export default function DataTable({ data, excludedIds, onExcludedChange }: DataTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('registration_rate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const sortedData = sortMunicipalityData(data, sortKey, sortOrder);

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) {
      return <span className="inline ml-1 text-white/50">⇅</span>;
    }
    return sortOrder === 'asc'
      ? <FiChevronUp className="inline ml-1 text-white" />
      : <FiChevronDown className="inline ml-1 text-white" />;
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-fadeIn">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
            <tr>
              <th className="px-4 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                除外
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => handleSort('municipality_name')}
              >
                自治体名 <SortIcon column="municipality_name" />
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => handleSort('prefecture')}
              >
                都道府県 <SortIcon column="prefecture" />
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                アカウント名
              </th>
              <th
                className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => handleSort('friends_count')}
              >
                友だち数 <SortIcon column="friends_count" />
              </th>
              <th
                className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => handleSort('population')}
              >
                人口 <SortIcon column="population" />
              </th>
              <th
                className="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => handleSort('registration_rate')}
              >
                登録率 <SortIcon column="registration_rate" />
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => handleSort('population_category')}
              >
                自治体区分 <SortIcon column="population_category" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sortedData.map((item, index) => {
              const isExcluded = excludedIds.has(item.municipality_code);
              return (
                <tr
                  key={item.municipality_code}
                  className={`
                    ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    hover:bg-purple-50 transition-colors
                    ${isExcluded ? 'opacity-40' : ''}
                  `}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={isExcluded}
                      onChange={(e) => onExcludedChange(item.municipality_code, e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {item.municipality_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.prefecture}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.account_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right font-medium">
                    {item.friends_count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right font-medium">
                    {item.population.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700">
                      {item.registration_rate.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      {item.population_category}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-lg font-semibold">データがありません</p>
          <p className="text-sm mt-2">フィルター条件を変更してください</p>
        </div>
      )}
    </div>
  );
}
