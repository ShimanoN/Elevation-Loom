# JavaScript Files Organization

このディレクトリには、Elevation LoomアプリケーションのすべてのJavaScriptファイルが含まれています。

## ファイル構成

### コアライブラリ (Core Libraries)
- **constants.js** - アプリケーション全体の定数定義
- **formatters.js** - 日付・週番号・曜日名のフォーマットユーティリティ
- **iso-week.js** - ISO週番号の計算ユーティリティ
- **date-utils.js** - 日付のフォーマットとパース処理（ローカルタイム対応）
- **calculations.js** - 進捗計算ロジック

### データ層 (Data Layer)
- **db.js** - IndexedDBデータベース操作
- **backup.js** - バックアップ/復元機能

### UI/ビュー層 (UI/View Layer)
- **app.js** - メインアプリケーションロジック（index.html用）
- **week-target.js** - 週目標管理ページのロジック（week-target.html用）
- **chart.js** - チャート描画機能
- **export-image.js** - 画像エクスポート機能

### 開発/デモ用 (Development/Demo)
- **sample-data.js** - サンプルデータ生成（デモ用）
  - `window.sampleData.generate()` でブラウザコンソールから使用可能
- **dev/** - 開発用ユーティリティ
  - **dev/test.js** - テストユーティリティ（プロダクションでは未使用）

## 重要な注意事項

### スクリプトの読み込み順序
このアプリケーションはES6モジュールを使用せず、グローバルスコープで関数を共有します。
そのため、HTMLファイル内のscriptタグの読み込み順序が重要です。

**依存関係の順序:**
1. constants.js（アプリ全体の定数）
2. formatters.js（フォーマットユーティリティ）
3. iso-week.js（他のファイルから使用される）
4. date-utils.js（日付ユーティリティ）
5. db.js（データ操作の基盤）
6. backup.js、sample-data.js、calculations.js（dbに依存）
7. chart.js（データ層に依存）
8. app.js または week-target.js（すべてに依存）
9. html2canvas (CDN) → export-image.js（画像エクスポート）

### グローバル関数
以下の関数はグローバルスコープで共有されています：
- `getDayLog`, `saveDayLog`, `deleteDayLog` (db.js)
- `getDayLogsByWeek`, `getAllDayLogs` (db.js)
- `getWeekTarget`, `saveWeekTarget`, `getAllWeekTargets` (db.js)
- `getISOWeekInfo` (iso-week.js)
- `formatDateLocal`, `parseDateLocal` (date-utils.js)
- `calculateWeekTotal`, `calculateWeekProgress` (calculations.js)
- `drawWeeklyChart` (chart.js)
- `getJPDayName`, `getENDayName`, `formatISOWeekKey`, `formatDateRangeDisplay` (formatters.js)
- 定数群: `DAY_NAMES_JP`, `DAY_LABELS_CHART`, `MAX_DAYS_HISTORY`, `CHART_PADDING` 等 (constants.js)
- その他

詳細は `eslint.config.js` の globals セクションを参照してください。
