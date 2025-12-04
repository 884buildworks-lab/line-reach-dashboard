import Dashboard from '@/components/Dashboard';
import { loadMunicipalityData, getLatestDataFile, getAvailableDataFiles } from '@/lib/dataLoader';
import { Municipality } from '@/types/municipality';

export default async function Home() {
  // 利用可能なデータファイルを取得
  const availableFiles = getAvailableDataFiles();

  // サンプルデータを使用（実際のデータファイルが存在する場合はそれを読み込む）
  let data: Municipality[] = [];
  let latestFile = '';

  try {
    latestFile = getLatestDataFile();
    data = await loadMunicipalityData(latestFile);
  } catch (error) {
    console.error('Failed to load data:', error);
    // サンプルデータ
    data = [];
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 animate-fadeIn">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              LINE自治体普及率ダッシュボード
            </h1>
            <p className="text-white/90 text-lg">
              全国の自治体におけるLINE公式アカウントの友だち数と人口データを可視化
            </p>
          </div>
        </header>

        {data.length === 0 || availableFiles.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-12 text-center border border-gray-100">
            <p className="text-gray-600 mb-4 text-lg">
              データファイルが見つかりません
            </p>
            <p className="text-sm text-gray-500">
              スクレイピングスクリプトを実行してデータを生成してください
            </p>
          </div>
        ) : (
          <Dashboard
            initialData={data}
            initialFile={latestFile}
            availableFiles={availableFiles}
          />
        )}
      </div>
    </main>
  );
}
