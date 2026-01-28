import { Municipality } from '@/types/municipality';

/**
 * データをCSVフォーマットに変換する
 *
 * @param data - エクスポートするデータ
 * @returns CSV文字列
 */
function convertToCSV(data: Municipality[]): string {
  if (data.length === 0) {
    return '';
  }

  // ヘッダー行
  const headers = [
    'municipality_code',
    'municipality_name',
    'prefecture',
    'account_name',
    'friends_count',
    'population',
    'registration_rate',
    'population_category',
    'updated_at'
  ];

  const csvRows = [headers.join(',')];

  // データ行
  for (const item of data) {
    const row = [
      item.municipality_code,
      escapeCSVField(item.municipality_name),
      escapeCSVField(item.prefecture),
      escapeCSVField(item.account_name),
      item.friends_count,
      item.population,
      item.registration_rate,
      escapeCSVField(item.population_category),
      item.updated_at
    ];
    csvRows.push(row.join(','));
  }

  return csvRows.join('\n');
}

/**
 * CSVフィールドをエスケープする
 *
 * @param field - エスケープするフィールド
 * @returns エスケープされたフィールド
 */
function escapeCSVField(field: string): string {
  // カンマ、改行、ダブルクォートを含む場合はダブルクォートで囲む
  if (field.includes(',') || field.includes('\n') || field.includes('"')) {
    // ダブルクォートを2つにエスケープ
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

/**
 * データをCSVファイルとしてエクスポート（ダウンロード）する
 *
 * @param data - エクスポートするデータ
 * @param fileName - ファイル名（デフォルト: filtered_data_YYYYMMDD.csv）
 */
export function exportToCSV(data: Municipality[], fileName?: string): void {
  if (data.length === 0) {
    alert('エクスポートするデータがありません');
    return;
  }

  // ファイル名の生成
  const defaultFileName = `filtered_data_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.csv`;
  const finalFileName = fileName || defaultFileName;

  // CSV文字列に変換
  const csvContent = convertToCSV(data);

  // BOM付きUTF-8でBlobを作成（Excelでの文字化け対策）
  const bom = '\uFEFF';
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });

  // ダウンロードリンクを作成して実行
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', finalFileName);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // メモリ解放
  URL.revokeObjectURL(url);
}
