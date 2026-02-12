# Archive - Reference Documents

このディレクトリは、**背景説明・履歴・監査記録**として保持する参照系文書の保管場所です。

## 分類ルール

- 日常の開発・運用で継続的に参照するドキュメント → `docs/` 直下（Core Docs）
- 設計背景、評価スナップショット、移行履歴など → `docs/archive/`（Reference Docs）

## 現在のアーカイブ文書

- [CLOUD_NATIVE_ARCHITECTURE.md](./CLOUD_NATIVE_ARCHITECTURE.md) - クラウドネイティブアーキテクチャガイド（設計指針）
- [FIREBASE_REFACTORING.md](./FIREBASE_REFACTORING.md) - Firebase準備フェーズの記録（移行履歴）
- [SECURITY_SUMMARY.md](./SECURITY_SUMMARY.md) - セキュリティ評価スナップショット（監査記録）
- [DEVELOPMENT_PHASE_ASSESSMENT.md](./DEVELOPMENT_PHASE_ASSESSMENT.md) - 開発工程評価（2026-02-09時点）

## 日常的な参照先

日常の開発・運用では、まず [docs/DOCUMENTATION_INDEX.md](../DOCUMENTATION_INDEX.md) から目的に応じた文書を辿ってください。

---

**更新方針**: 
- 新しい設計判断や評価を記録する際は、このディレクトリに追加します。
- 古くなったCore文書は削除せず、こちらへ移動して履歴として保持します。
