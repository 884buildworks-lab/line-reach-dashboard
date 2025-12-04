import { loadMunicipalityData, getLatestDataFile } from '@/lib/dataLoader';
import { Municipality } from '@/types/municipality';
import MunicipalityScatterChart from '@/components/MunicipalityScatterChart';
import Link from 'next/link';
import { FiHome, FiBarChart2 } from 'react-icons/fi';

export default async function VisualizationPage() {
  // データを読み込む
  let data: Municipality[] = [];
  let latestFile = '';

  try {
    latestFile = getLatestDataFile();
    data = await loadMunicipalityData(latestFile);
  } catch (error) {
    console.error('Failed to load data:', error);
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <header className="mb-8 animate-fadeIn">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FiBarChart2 className="text-4xl text-white" />
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  データ可視化
                </h1>
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all font-semibold backdrop-blur-sm"
              >
                <FiHome />
                <span>ホームに戻る</span>
              </Link>
            </div>
            <p className="text-white/90 text-lg">
              自治体データを散布図で可視化 - 人口、友だち数、登録率の関係を分析
            </p>
            {latestFile && (
              <p className="text-white/70 text-sm mt-2">
                データ: {latestFile} ({data.length}件の自治体)
              </p>
            )}
          </div>
        </header>

        {/* 散布図 */}
        {data.length > 0 ? (
          <MunicipalityScatterChart data={data} />
        ) : (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-12 text-center border border-gray-100">
            <p className="text-gray-600 mb-4 text-lg">
              データファイルが見つかりません
            </p>
            <p className="text-sm text-gray-500">
              スクレイピングスクリプトを実行してデータを生成してください
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
