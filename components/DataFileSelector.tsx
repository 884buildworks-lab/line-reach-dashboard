'use client';

import { FiCalendar, FiDatabase } from 'react-icons/fi';

interface DataFileSelectorProps {
  selectedFile: string;
  availableFiles: string[];
  onFileChange: (fileName: string) => void;
}

/**
 * データファイル選択コンポーネント
 * 月次CSVデータを切り替えるためのドロップダウン
 */
export default function DataFileSelector({
  selectedFile,
  availableFiles,
  onFileChange,
}: DataFileSelectorProps) {
  /**
   * ファイル名から表示用の日付文字列を生成
   * 例: "2024-11.csv" → "2024年11月"
   */
  const formatFileName = (fileName: string): string => {
    const match = fileName.match(/(\d{4})-(\d{2})\.csv/);
    if (match) {
      const [, year, month] = match;
      return `${year}年${month}月`;
    }
    return fileName;
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-100 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <FiCalendar className="text-purple-600 text-xl" />
          <label htmlFor="data-file-select" className="text-sm font-semibold text-gray-700">
            データ期間:
          </label>
        </div>
        <select
          id="data-file-select"
          value={selectedFile}
          onChange={(e) => onFileChange(e.target.value)}
          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white hover:border-purple-300 transition-all font-medium"
        >
          {availableFiles.map((file) => (
            <option key={file} value={file}>
              {formatFileName(file)}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
          <FiDatabase className="text-purple-600" />
          <span className="text-sm font-semibold text-purple-700">
            {availableFiles.length}件のデータ
          </span>
        </div>
      </div>
    </div>
  );
}
