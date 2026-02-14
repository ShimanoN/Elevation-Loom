# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Sync Retry System (sync-retry.ts)** — 自動同期リトライメカニズム（30秒ポーリング、オンライン復帰時即座にリトライ）
- **Multi-Layer Persistence** — Firestore失敗時のLocalStorageフォールバック層追加
- **Authentication Wait Mechanism** — waitForAuth() による認証完了待ち（10秒タイムアウト）
- **Enhanced Error Types** — StorageError クラスと StorageErrorType enum（AUTH_FAILED, FIRESTORE_FAILED, CACHE_FAILED, ALL_FAILED, UNKNOWN）
- **Manual Sync API** — window.elvSync (trigger, getPendingCount, clear) による手動同期制御
- **Mobile Sync Guide** — モバイル同期トラブルシューティングガイド（docs/MOBILE_SYNC_GUIDE.md）
- E2Eテスト追加: `sync-retry.spec.ts` — 同期キュー、手動同期、ペンディングカウント、認証依存保存のテスト
- `constants.js` — アプリ全体のマジックナンバーを定数として一元管理
- `formatters.js` — 日付・曜日名・ISO週キーのフォーマットユーティリティ
- 週間スケジュール表（week-target.html）— 日次予定入力、予実比較、見込み合計
- 画像エクスポート機能（export-image.js）— html2canvasによるスケジュール画像出力
- サンプルデータ生成（sample-data.js）— デモ用データのコンソール生成
- E2Eテスト追加: `export-schedule.spec.js`, `week-target-persist.spec.js`
- GitHub Actions CI/CDパイプライン（ci.yml, deploy.yml）
- アクセシビリティ改善: ナビゲーションボタンへのaria-label追加、fieldset/legend適用
- JSDoc コメント: chart.js, export-image.js の全関数にドキュメント追加
- 全DB操作関数（db.js）への一貫したtry-catchエラーハンドリング
- app.js, week-target.js への一貫したtry-catchエラーハンドリング

### Changed
- **storage.ts: saveWeekData()** — 認証待ち、3層永続化（Firestore → IndexedDB → LocalStorage）、同期キュー追加
- **app.ts, week-target.ts** — エラーメッセージ改善（認証失敗、Firestore失敗、キャッシュ失敗、全失敗の詳細メッセージ）
- **firebase-config.ts** — isAuthReady(), waitForAuth() 関数追加、authReady フラグ追加
- **backup.ts** — saveDayLogWithBackup(), saveWeekTargetWithBackup() が Result<void, Error> を返すように変更
- **global.d.ts** — elvSync API 型定義追加
- ARCHITECTURE.md — 同期リトライシステムのセクション追加、多層永続化戦略の説明追加
- ESLint設定から未使用のゴーストグローバルを削除（deleteWeekTarget, renderChart等）
- app.jsのマジックナンバー `30` を `MAX_DAYS_HISTORY` 定数に置換
- deploy.ymlを改善: 開発ファイルを除外してサイトファイルのみデプロイ
- CIのE2Eテストmatrixに全テストファイルを追加
- 重複していたpages.ymlデプロイワークフローを統合・削除
- copilot-instructions.mdのスクリプト読み込み順を実態に合わせて更新
- CONTRIBUTING.mdのNode.jsバージョン要件を更新（18+ → 20.19+）
- js/README.mdにconstants.js, formatters.jsの情報を追記

### Fixed
- **モバイルで保存されたデータが Firestore に同期されず PC に反映されない問題** — 認証待ち、LocalStorageフォールバック、自動リトライにより解決
- week-target.jsのsaveDailyPlan, saveTarget, changeWeekにtry-catch追加
- db.jsのdeleteDayLog, getDayLogsByWeek, getAllDayLogs等にtry-catch追加

## [1.0.0] - 2026-02-09

### Added
- 日次データ入力・保存（IndexedDB）
- 週次目標管理
- 進捗可視化（Canvas Chart）
- 自動バックアップ（localStorage、10世代保持）
- データエクスポート（画像、JSON）
- ISO 8601 週番号サポート
- 30日間ナビゲーション制限
- ESLint v10 + Prettier + Husky pre-commit hooks
- Vitest ユニットテスト（カバレッジ 89.75%）
- Playwright E2Eテスト
- PLC技術者向けドキュメント群
