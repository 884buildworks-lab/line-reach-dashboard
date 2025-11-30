'use client';

import { Statistics } from '@/types/municipality';
import { FiTrendingUp, FiActivity, FiArrowUp, FiArrowDown, FiDatabase } from 'react-icons/fi';

interface StatsDisplayProps {
  stats: Statistics;
  excludedCount: number;
}

export default function StatsDisplay({ stats, excludedCount }: StatsDisplayProps) {
  const statItems = [
    {
      label: '平均登録率',
      value: `${stats.average.toFixed(2)}%`,
      gradient: 'from-blue-500 to-blue-600',
      icon: FiTrendingUp,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      label: '中央値',
      value: `${stats.median.toFixed(2)}%`,
      gradient: 'from-green-500 to-green-600',
      icon: FiActivity,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      label: '最大値',
      value: `${stats.max.toFixed(2)}%`,
      gradient: 'from-purple-500 to-purple-600',
      icon: FiArrowUp,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      label: '最小値',
      value: `${stats.min.toFixed(2)}%`,
      gradient: 'from-orange-500 to-orange-600',
      icon: FiArrowDown,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      label: '対象自治体数',
      value: `${stats.count}件`,
      gradient: 'from-gray-600 to-gray-700',
      icon: FiDatabase,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600'
    },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl mb-6 border border-gray-100 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-purple-600">📊</span>
          統計情報
        </h2>
        {excludedCount > 0 && (
          <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold animate-pulse">
            {excludedCount}件を除外中
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="group hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`bg-gradient-to-br ${item.gradient} text-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden`}>
                {/* 背景装飾 */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>

                {/* アイコン */}
                <div className={`${item.iconBg} ${item.iconColor} w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="text-xl" />
                </div>

                {/* 値 */}
                <div className="text-3xl font-bold mb-1 relative z-10">{item.value}</div>

                {/* ラベル */}
                <div className="text-sm opacity-90 relative z-10">{item.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
