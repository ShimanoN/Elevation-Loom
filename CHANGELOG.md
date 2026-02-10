# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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
- ESLint設定から未使用のゴーストグローバルを削除（deleteWeekTarget, renderChart等）
- app.jsのマジックナンバー `30` を `MAX_DAYS_HISTORY` 定数に置換
- deploy.ymlを改善: 開発ファイルを除外してサイトファイルのみデプロイ
- CIのE2Eテストmatrixに全テストファイルを追加
- 重複していたpages.ymlデプロイワークフローを統合・削除
- copilot-instructions.mdのスクリプト読み込み順を実態に合わせて更新
- CONTRIBUTING.mdのNode.jsバージョン要件を更新（18+ → 20.19+）
- js/README.mdにconstants.js, formatters.jsの情報を追記

### Fixed
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
