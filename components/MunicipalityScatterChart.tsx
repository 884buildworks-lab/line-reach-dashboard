'use client';

import { useState } from 'react';
import { Municipality } from '@/types/municipality';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  ZAxis,
} from 'recharts';

interface MunicipalityScatterChartProps {
  data: Municipality[];
}

type AxisOption = {
  key: keyof Municipality;
  label: string;
  formatter?: (value: number) => string;
};

const axisOptions: AxisOption[] = [
  { key: 'population', label: '人口', formatter: (v) => v.toLocaleString() },
  { key: 'friends_count', label: '友だち数', formatter: (v) => v.toLocaleString() },
  { key: 'registration_rate', label: '登録率 (%)', formatter: (v) => v.toFixed(2) },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: Municipality;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-bold text-purple-600 mb-2">{data.municipality_name}</p>
        <p className="text-sm text-gray-600">{data.prefecture}</p>
        <div className="mt-2 space-y-1 text-sm">
          <p>
            <span className="text-gray-500">人口:</span>{' '}
            <span className="font-medium">{data.population.toLocaleString()}人</span>
          </p>
          <p>
            <span className="text-gray-500">友だち数:</span>{' '}
            <span className="font-medium">{data.friends_count.toLocaleString()}人</span>
          </p>
          <p>
            <span className="text-gray-500">登録率:</span>{' '}
            <span className="font-medium">{data.registration_rate.toFixed(2)}%</span>
          </p>
          <p>
            <span className="text-gray-500">区分:</span>{' '}
            <span className="font-medium">{data.population_category}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function MunicipalityScatterChart({ data }: MunicipalityScatterChartProps) {
  const [xAxisKey, setXAxisKey] = useState<keyof Municipality>('population');
  const [yAxisKey, setYAxisKey] = useState<keyof Municipality>('registration_rate');

  const xAxisOption = axisOptions.find((opt) => opt.key === xAxisKey);
  const yAxisOption = axisOptions.find((opt) => opt.key === yAxisKey);

  // データを散布図用に変換
  const chartData = data.map((item) => ({
    ...item,
    x: Number(item[xAxisKey]),
    y: Number(item[yAxisKey]),
  }));

  return (
    <div className="space-y-6">
      {/* 軸選択UI */}
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">グラフ設定</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              X軸（横軸）
            </label>
            <select
              value={xAxisKey}
              onChange={(e) => setXAxisKey(e.target.value as keyof Municipality)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white hover:border-purple-300 transition-all font-medium"
            >
              {axisOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Y軸（縦軸）
            </label>
            <select
              value={yAxisKey}
              onChange={(e) => setYAxisKey(e.target.value as keyof Municipality)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white hover:border-purple-300 transition-all font-medium"
            >
              {axisOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 散布図 */}
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          {yAxisOption?.label} vs {xAxisOption?.label}
        </h3>
        <div className="w-full h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 60,
                left: 80,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="number"
                dataKey="x"
                name={xAxisOption?.label}
                tickFormatter={(value) => xAxisOption?.formatter?.(value) || value.toString()}
                stroke="#6b7280"
              >
                <Label
                  value={xAxisOption?.label}
                  position="bottom"
                  offset={40}
                  style={{ fontSize: '14px', fontWeight: 'bold', fill: '#374151' }}
                />
              </XAxis>
              <YAxis
                type="number"
                dataKey="y"
                name={yAxisOption?.label}
                tickFormatter={(value) => yAxisOption?.formatter?.(value) || value.toString()}
                stroke="#6b7280"
              >
                <Label
                  value={yAxisOption?.label}
                  angle={-90}
                  position="left"
                  offset={60}
                  style={{ fontSize: '14px', fontWeight: 'bold', fill: '#374151' }}
                />
              </YAxis>
              <ZAxis range={[50, 50]} />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter
                name="自治体"
                data={chartData}
                fill="#8b5cf6"
                fillOpacity={0.6}
                stroke="#7c3aed"
                strokeWidth={1}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-gray-600 text-center">
          データ数: {data.length}件の自治体
        </div>
      </div>
    </div>
  );
}
