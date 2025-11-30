'use client';

import { Municipality } from '@/types/municipality';
import { exportToCSV } from '@/lib/csvExporter';
import { FiDownload } from 'react-icons/fi';

interface ExportButtonProps {
  data: Municipality[];
  fileName?: string;
}

export default function ExportButton({ data, fileName }: ExportButtonProps) {
  const handleExport = () => {
    exportToCSV(data, fileName);
  };

  return (
    <button
      onClick={handleExport}
      disabled={data.length === 0}
      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 font-semibold"
    >
      <FiDownload className="text-lg" />
      CSVエクスポート ({data.length}件)
    </button>
  );
}
