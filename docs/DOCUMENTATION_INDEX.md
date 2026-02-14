# ドキュメントインデックス

Elevation Loom のドキュメントを、**日常的に読むもの（Core）** と
**背景・履歴を参照するもの（Reference/Archive）** に分けて整理しました。

**最終更新**: 2026-02-14

---

## ドキュメントの分類ルール

- Core: 日常の開発・運用で継続的に参照する文書
- Reference: 設計背景、監査結果、移行履歴などの保存文書

---

## 最初に読む順番

### 開発に参加する

1. [README.md](../README.md)
2. [CONTRIBUTING.md](./CONTRIBUTING.md)
3. [BEGINNER_WORKFLOW.md](./BEGINNER_WORKFLOW.md)
4. [CODE_WALKTHROUGH.md](./CODE_WALKTHROUGH.md)

### PLC技術者として学ぶ

1. [QUICK_START_FOR_PLC_ENGINEERS.md](./QUICK_START_FOR_PLC_ENGINEERS.md)
2. [LEARNING_PATH.md](./LEARNING_PATH.md)
3. [CODE_WALKTHROUGH.md](./CODE_WALKTHROUGH.md)

### 現状評価・計画を把握する

1. [DEVELOPMENT_PHASE_ASSESSMENT.md](./archive/DEVELOPMENT_PHASE_ASSESSMENT.md)
2. [ROADMAP.md](./ROADMAP.md)
3. [RELEASE.md](./RELEASE.md)

---

## Core Docs（常用）

### 入口・運用

- [README.md](../README.md): プロジェクト概要、セットアップ、コマンド
- [CONTRIBUTING.md](./CONTRIBUTING.md): 開発フロー、品質ゲート、TODO運用
- [RELEASE.md](./RELEASE.md): リリース手順・バージョニング

### 学習・理解

- [QUICK_START_FOR_PLC_ENGINEERS.md](./QUICK_START_FOR_PLC_ENGINEERS.md): PLC技術者向けクイックスタート
- [BEGINNER_WORKFLOW.md](./BEGINNER_WORKFLOW.md): 初心者向け開発ワークフロー
- [LEARNING_PATH.md](./LEARNING_PATH.md): 段階的学習パス
- [CODE_WALKTHROUGH.md](./CODE_WALKTHROUGH.md): コード詳細解説
- [MOBILE_SYNC_GUIDE.md](./MOBILE_SYNC_GUIDE.md): **モバイル同期トラブルシューティング**（**New**）

### 仕様・計画

- [Elevation_Loom_MVP仕様書_final.md](./Elevation_Loom_MVP仕様書_final.md): MVP機能仕様
- [ROADMAP.md](./ROADMAP.md): 開発ロードマップ（**Phase 6進行中**）
- [CHANGELOG.md](../CHANGELOG.md): 変更履歴

### アーキテクチャ・運用（ルート直下）

- [ARCHITECTURE.md](../ARCHITECTURE.md): **本番環境アーキテクチャ**（最重要）
- [PRODUCTION_CHECKLIST.md](../PRODUCTION_CHECKLIST.md): デプロイ前チェックリスト
- [FIRESTORE_RULES.md](../FIRESTORE_RULES.md): Firestoreセキュリティルール解説
- [SECURITY.md](../SECURITY.md): セキュリティポリシー
- [IMPLEMENTATION_COMPLETE.md](../IMPLEMENTATION_COMPLETE.md): Phase 5実装完了記録

---

## Reference Docs（背景・履歴）

> 📁 詳細は [`docs/archive/README.md`](./archive/README.md) を参照

以下は日常運用の一次情報ではなく、背景説明・監査・移行履歴として保持します。

### 移行履歴

- [FIREBASE_REFACTORING.md](./archive/FIREBASE_REFACTORING.md): Firebase移行準備記録（Phase 5前）
- [CLOUD_NATIVE_ARCHITECTURE.md](./archive/CLOUD_NATIVE_ARCHITECTURE.md): 旧アーキテクチャガイド（現在は [`ARCHITECTURE.md`](../ARCHITECTURE.md)）

### 監査記録

- [SECURITY_SUMMARY.md](./archive/SECURITY_SUMMARY.md): セキュリティ評価（2026-02-12）
- [DEVELOPMENT_PHASE_ASSESSMENT.md](./archive/DEVELOPMENT_PHASE_ASSESSMENT.md): 開発工程評価（2026-02-09）

---

## 更新ルール（簡易）

- **機能変更時**: `README.md` / `CODE_WALKTHROUGH.md` / 必要な仕様書を同時更新
- **開発フロー変更時**: `CONTRIBUTING.md` を更新
- **リリース時**: `CHANGELOG.md` と `RELEASE.md` を更新
- **大きな設計変更時**: `ARCHITECTURE.md` を更新し、旧版を `docs/archive/` へ移動
- **Phase完了時**: `ROADMAP.md` を更新

---

## メンテナンス方針

- 新規ドキュメント追加時は、この `DOCUMENTATION_INDEX.md` に必ず追記
- 内容が古くなった文書は削除ではなく `docs/archive/` へ移動を優先
- 四半期ごとにリンク切れと重複内容を棚卸し
- アーカイブ文書の詳細は [`docs/archive/README.md`](./archive/README.md) で管理

---

**総ドキュメント数（現行Core）**: 13 ファイル（`docs/` 配下）  
**アーカイブ文書**: 4 ファイル（`docs/archive/` 配下）

