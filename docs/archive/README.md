# Archive - 参考文書

このフォルダには、過去の設計決定や移行履歴を保管しています。

**現在のアーキテクチャは [`ARCHITECTURE.md`](../../ARCHITECTURE.md) を参照してください。**

---

## 📁 文書一覧

### 移行履歴（Historical）

#### [FIREBASE_REFACTORING.md](FIREBASE_REFACTORING.md)
Firebase移行準備フェーズの実施記録（2026年2月上旬）

**内容**:
- Phase 1-4完了後のFirebase統合計画
- Storage gateway設計
- Migration strategy
- セキュリティ考慮事項

**位置づけ**: 移行プロセスの歴史的記録。現在の実装は [`js/storage.ts`](../../js/storage.ts) と [`ARCHITECTURE.md`](../../ARCHITECTURE.md) を参照。

---

#### [CLOUD_NATIVE_ARCHITECTURE.md](CLOUD_NATIVE_ARCHITECTURE.md)
Firebase統合アーキテクチャガイド（旧版）

**内容**:
- Firestore-authoritative設計
- IndexedDB cache layer実装
- Anonymous Auth導入
- セキュリティルール解説

**位置づけ**: Phase 5完了後、メインドキュメントは [`ARCHITECTURE.md`](../../ARCHITECTURE.md) に統合されました。背景理解のための参考資料として保持。

---

### 監査記録（Audit）

#### [SECURITY_SUMMARY.md](SECURITY_SUMMARY.md)
セキュリティ評価レポート（2026-02-12時点）

**内容**:
- 認証・認可メカニズムの評価
- データ保護対策
- 潜在的リスクと推奨対策
- Firestore Security Rulesレビュー

**位置づけ**: Phase 5完了時のセキュリティ監査。本番運用での参照資料。最新のセキュリティ対策は [`FIRESTORE_RULES.md`](../../FIRESTORE_RULES.md) を参照。

---

#### [DEVELOPMENT_PHASE_ASSESSMENT.md](DEVELOPMENT_PHASE_ASSESSMENT.md)
開発工程評価（2026-02-09時点）

**内容**:
- Phase 1-4の完了状況評価
- 成熟度レベル判定（Level 4: Production Ready）
- 次フェーズ（Firebase統合）への推奨事項

**位置づけ**: Phase 5移行前の開発状況スナップショット。現在の進捗は [`ROADMAP.md`](../ROADMAP.md) を参照。

---

## 📖 使い方

### 新規参入者向け

1. **まず現行ドキュメントを読む**: [`ARCHITECTURE.md`](../../ARCHITECTURE.md), [`README.md`](../../README.md)
2. **背景を知りたい場合**: このarchiveフォルダの文書を確認
3. **最新の実装を知る**: [`js/`](../../js/) ディレクトリのソースコード

### 開発者向け

- **移行の経緯を調べる**: [`FIREBASE_REFACTORING.md`](FIREBASE_REFACTORING.md)
- **設計判断の根拠を知る**: [`CLOUD_NATIVE_ARCHITECTURE.md`](CLOUD_NATIVE_ARCHITECTURE.md)
- **セキュリティレビュー**: [`SECURITY_SUMMARY.md`](SECURITY_SUMMARY.md)

### メンテナンス担当者向け

- **重要な意思決定をアーカイブ**: 設計変更があった場合、旧バージョンの文書をここに移動
- **削除ではなく保管**: 過去の設計判断は将来の参考になる
- **更新履歴を残す**: 各文書に作成日・更新日を明記

---

## 🔄 更新ルール

### archiveへの移行基準

- メインドキュメント（`ARCHITECTURE.md`等）に統合された旧ガイド
- 完了したPhaseの詳細設計書
- 定期的なセキュリティ監査レポート
- 大規模リファクタリングの記録

### 保持期間

- **移行履歴**: 永続保持（設計の経緯理解のため）
- **監査記録**: 最低2年間保持（コンプライアンス）
- **評価レポート**: 次期評価まで保持

### 削除対象外

- 設計判断の根拠を含む文書
- セキュリティ評価結果
- 大規模な技術移行の記録

---

## 📌 現行ドキュメントへのリンク

### コアドキュメント

- [ARCHITECTURE.md](../../ARCHITECTURE.md) - 最新のアーキテクチャ
- [PRODUCTION_CHECKLIST.md](../../PRODUCTION_CHECKLIST.md) - デプロイ前チェックリスト
- [FIRESTORE_RULES.md](../../FIRESTORE_RULES.md) - セキュリティルール解説
- [ROADMAP.md](../ROADMAP.md) - 開発ロードマップ

### 開発ガイド

- [CONTRIBUTING.md](../CONTRIBUTING.md) - 開発フロー
- [CODE_WALKTHROUGH.md](../CODE_WALKTHROUGH.md) - コード詳細解説
- [DOCUMENTATION_INDEX.md](../DOCUMENTATION_INDEX.md) - ドキュメント全体の索引

---

**最終更新**: 2026-02-14  
**管理者**: Elevation Loom Development Team
