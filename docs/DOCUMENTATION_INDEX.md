# ドキュメントインデックス

**Elevation Loom プロジェクトドキュメント一覧**  
**最終更新**: 2026-02-09

---

## 📖 ドキュメントの使い方

このプロジェクトには、**目的別に整理された包括的なドキュメント**が用意されています。あなたの状況に応じて、適切なドキュメントから始めてください。

### 🎯 あなたはどの立場ですか？

```
┌─────────────────────────────────────────────────────────────┐
│                     スタート地点を選ぶ                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                     ↓
   👨‍💻 開発者              📊 プロジェクト         🔧 PLC技術者
   （新規参加）           管理者・評価者          （Web開発初心者）
        │                     │                     │
        ↓                     ↓                     ↓
   QUICK_START          DEVELOPMENT_PHASE      QUICK_START_FOR
   ↓                    ASSESSMENT             _PLC_ENGINEERS
   BEGINNER_WORKFLOW    ↓                      ↓
   ↓                    KPI_ROADMAP            LEARNING_PATH
   CODE_WALKTHROUGH     ↓                      ↓
                        CONTRIBUTING           CODE_WALKTHROUGH
```

---

## 1. 状況別ドキュメントガイド

### 1.1 🚀 すぐに始めたい（クイックスタート）

**対象**: 今すぐアプリを使いたい、または開発を始めたい方

| ドキュメント | 読了時間 | 内容 |
|------------|---------|------|
| **[README.md](../README.md)** | 5分 | プロジェクト概要、セットアップ手順 |
| **[QUICK_START_FOR_PLC_ENGINEERS.md](./QUICK_START_FOR_PLC_ENGINEERS.md)** | 15分 | PLC技術者向けクイックスタート |

**手順**:
1. README.mdを読んでセットアップ
2. `npm install`で依存関係をインストール
3. `./scripts/run_local.sh`でローカルサーバー起動
4. ブラウザで動作確認

---

### 1.2 📚 体系的に学びたい（学習パス）

**対象**: Web開発を基礎から学びたいPLC/ST技術者

| ドキュメント | 読了時間 | 内容 |
|------------|---------|------|
| **[LEARNING_PATH.md](./LEARNING_PATH.md)** | 60分 | Web開発学習ロードマップ（PLC対応表付き） |
| **[BEGINNER_WORKFLOW.md](./BEGINNER_WORKFLOW.md)** | 45分 | IT初心者向け標準ワークフロー |
| **[CODE_WALKTHROUGH.md](./CODE_WALKTHROUGH.md)** | 90分 | コード詳細解説（各ファイルの役割） |

**推奨学習順序**:
1. LEARNING_PATH.md（全体像の把握）
2. BEGINNER_WORKFLOW.md（日常作業の理解）
3. CODE_WALKTHROUGH.md（コードの深い理解）

**学習成果**:
- ✅ Web開発の基本概念を理解
- ✅ Git/GitHubの使い方をマスター
- ✅ テスト駆動開発を実践できる
- ✅ コードレビューに参加できる

---

### 1.3 🔍 プロジェクトの現状を把握したい

**対象**: プロジェクトマネージャー、評価者、現状把握したい開発者

| ドキュメント | 読了時間 | 内容 |
|------------|---------|------|
| **[DEVELOPMENT_PHASE_ASSESSMENT.md](./DEVELOPMENT_PHASE_ASSESSMENT.md)** | 30分 | 開発フェーズの現状評価 |
| **[KPI_ROADMAP.md](./KPI_ROADMAP.md)** | 40分 | KGI/KPI駆動型ロードマップ |
| **[CODE_REVIEW_SUMMARY.md](./CODE_REVIEW_SUMMARY.md)** | 20分 | コードレビュー結果サマリー |

**これらのドキュメントでわかること**:
- ✅ プロジェクトの現在位置（開発フェーズ）
- ✅ IT業界標準との比較
- ✅ 今後3-12ヶ月のロードマップ
- ✅ KGI/KPIと測定方法
- ✅ コード品質とセキュリティ状況

---

### 1.4 💻 コードを理解したい（技術詳細）

**対象**: コードを読みたい、機能を追加したい開発者

| ドキュメント | 読了時間 | 内容 |
|------------|---------|------|
| **[CODE_WALKTHROUGH.md](./CODE_WALKTHROUGH.md)** | 90分 | 全ファイルの詳細解説 |
| **[Elevation_Loom_MVP仕様書_final.md](./Elevation_Loom_MVP仕様書_final.md)** | 40分 | MVP仕様書（日本語） |
| **[js/README.md](../js/README.md)** | 10分 | JavaScriptファイルの概要 |

**コード理解の手順**:
1. MVP仕様書で機能要件を理解
2. CODE_WALKTHROUGHで全体構造を把握
3. js/README.mdでファイル間の依存関係を確認
4. 実際のコードを読む（JSDocコメント参照）

---

### 1.5 🤝 開発に参加したい（コントリビューション）

**対象**: 機能追加、バグ修正、ドキュメント改善をしたい方

| ドキュメント | 読了時間 | 内容 |
|------------|---------|------|
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | 15分 | コントリビューションガイド |
| **[BEGINNER_WORKFLOW.md](./BEGINNER_WORKFLOW.md)** | 45分 | 標準ワークフローとチェックリスト |
| **[TODO_GUIDELINES.md](./TODO_GUIDELINES.md)** | 5分 | TODOコメント規則 |

**コントリビューション手順**:
1. CONTRIBUTINGを読んでルールを理解
2. BEGINNER_WORKFLOWでワークフローを確認
3. GitHub Issueから取り組むタスクを選ぶ
4. ブランチを作成して開発開始
5. テストを書いてPull Request

---

### 1.6 📋 プロジェクト管理をしたい

**対象**: タスク管理、ロードマップ策定、リリース管理をする方

| ドキュメント | 読了時間 | 内容 |
|------------|---------|------|
| **[ROADMAP.md](./ROADMAP.md)** | 30分 | 開発ロードマップ（詳細版） |
| **[KPI_ROADMAP.md](./KPI_ROADMAP.md)** | 40分 | KGI/KPI駆動型ロードマップ |
| **[NEXT_STEPS.md](./NEXT_STEPS.md)** | 10分 | 次のステップ（更新済み） |
| **[RELEASE.md](./RELEASE.md)** | 5分 | リリース手順 |

**プロジェクト管理のサイクル**:
1. KPI_ROADMAPで目標設定
2. ROADMAPで詳細計画
3. GitHub Projectボードでタスク管理
4. 月次でKPI測定・レビュー
5. RELEASEに従ってバージョンアップ

---

## 2. 全ドキュメント一覧

### 2.1 メインドキュメント（必読）

| ファイル | 種類 | 対象者 | 優先度 |
|---------|------|--------|--------|
| **README.md** | 概要 | 全員 | 🔴 最高 |
| **DOCUMENTATION_INDEX.md** | ガイド | 全員 | 🔴 最高 |
| **DEVELOPMENT_PHASE_ASSESSMENT.md** | 評価 | 管理者・評価者 | 🟠 高 |
| **KPI_ROADMAP.md** | 計画 | 管理者・開発者 | 🟠 高 |
| **BEGINNER_WORKFLOW.md** | 手順 | 初心者 | 🟠 高 |

### 2.2 学習・教育用ドキュメント

| ファイル | 種類 | 対象者 | 優先度 |
|---------|------|--------|--------|
| **LEARNING_PATH.md** | 学習 | PLC技術者 | 🟠 高 |
| **QUICK_START_FOR_PLC_ENGINEERS.md** | クイックスタート | PLC技術者 | 🟠 高 |
| **CODE_WALKTHROUGH.md** | 解説 | 開発者 | 🟡 中 |

### 2.3 技術仕様ドキュメント

| ファイル | 種類 | 対象者 | 優先度 |
|---------|------|--------|--------|
| **Elevation_Loom_MVP仕様書_final.md** | 仕様 | 開発者・設計者 | 🟠 高 |
| **js/README.md** | 技術 | 開発者 | 🟡 中 |

### 2.4 開発プロセスドキュメント

| ファイル | 種類 | 対象者 | 優先度 |
|---------|------|--------|--------|
| **CONTRIBUTING.md** | ガイド | コントリビューター | 🟠 高 |
| **RELEASE.md** | 手順 | リリース担当者 | 🟡 中 |
| **TODO_GUIDELINES.md** | 規則 | 開発者 | 🟢 低 |

### 2.5 プロジェクト管理ドキュメント

| ファイル | 種類 | 対象者 | 優先度 |
|---------|------|--------|--------|
| **ROADMAP.md** | 計画 | 全員 | 🟠 高 |
| **NEXT_STEPS.md** | メモ | 開発者 | 🟡 中 |
| **RETURN_TODOS.md** | チェックリスト | 開発者 | 🟡 中 |
| **TODO_SUMMARY.md** | サマリー | 開発者 | 🟢 低 |

### 2.6 レビュー・評価ドキュメント

| ファイル | 種類 | 対象者 | 優先度 |
|---------|------|--------|--------|
| **CODE_REVIEW_SUMMARY.md** | レビュー | 全員 | 🟠 高 |

---

## 3. 学習パス（推奨順序）

### 3.1 初心者向けパス（0-3ヶ月）

```
Week 1: プロジェクト理解
├─ README.md
├─ DOCUMENTATION_INDEX.md（このファイル）
└─ DEVELOPMENT_PHASE_ASSESSMENT.md

Week 2-3: 基礎学習
├─ QUICK_START_FOR_PLC_ENGINEERS.md
├─ LEARNING_PATH.md（前半）
└─ 実際に動かしてみる

Week 4-8: ワークフロー習得
├─ BEGINNER_WORKFLOW.md
├─ CONTRIBUTING.md
└─ 小さなバグ修正に挑戦

Week 9-12: コード理解
├─ CODE_WALKTHROUGH.md
├─ MVP仕様書
└─ 機能追加に挑戦
```

### 3.2 中級者向けパス（3-6ヶ月）

```
Month 4: アーキテクチャ理解
├─ CODE_WALKTHROUGH.md（詳細）
├─ 全JavaScriptファイルの通読
└─ テストコードの理解

Month 5: プロジェクト管理
├─ KPI_ROADMAP.md
├─ ROADMAP.md
└─ GitHub Projectボード活用

Month 6: 品質向上
├─ CODE_REVIEW_SUMMARY.md
├─ テストカバレッジ向上
└─ パフォーマンス最適化
```

### 3.3 上級者向けパス（6-12ヶ月）

```
Month 7-12: エキスパートへ
├─ TypeScript移行
├─ 外部API連携
├─ PWA対応
├─ 国際化
└─ コミュニティ貢献
```

---

## 4. ドキュメント更新ルール

### 4.1 更新が必要なタイミング

```markdown
## ドキュメント更新チェックリスト

### 機能追加時
- [ ] README.md（新機能の説明）
- [ ] CODE_WALKTHROUGH.md（新ファイルの説明）
- [ ] MVP仕様書（仕様変更の場合）
- [ ] js/README.md（新JSファイルの場合）

### バグ修正時
- [ ] CODE_REVIEW_SUMMARY.md（重大なバグの場合）
- [ ] 該当ファイルのJSDocコメント

### プロジェクト構造変更時
- [ ] README.md（ディレクトリ構造）
- [ ] DOCUMENTATION_INDEX.md（このファイル）
- [ ] 関連するすべてのドキュメント

### リリース時
- [ ] CHANGELOG.md（変更履歴）
- [ ] ROADMAP.md（完了項目）
- [ ] KPI_ROADMAP.md（KPI達成状況）
- [ ] package.json（バージョン番号）
```

### 4.2 ドキュメントレビュープロセス

1. ✅ コード変更と同時にドキュメント更新
2. ✅ Pull Requestにドキュメント変更を含める
3. ✅ レビュアーがドキュメントもチェック
4. ✅ 月次で古いドキュメントを見直し

---

## 5. よくある質問（FAQ）

### Q1: どのドキュメントから読めばいい？

**A**: 
- 👨‍💻 **開発者**: README.md → BEGINNER_WORKFLOW.md → CODE_WALKTHROUGH.md
- 📊 **管理者**: DEVELOPMENT_PHASE_ASSESSMENT.md → KPI_ROADMAP.md
- 🔧 **PLC技術者**: QUICK_START_FOR_PLC_ENGINEERS.md → LEARNING_PATH.md

### Q2: ドキュメントが多すぎて読みきれない

**A**: 全部読む必要はありません！
- 最低限: README.md + 自分の役割に関連するドキュメント1つ
- 必要に応じて他のドキュメントを参照

### Q3: ドキュメントが古くなっているかも？

**A**: 各ドキュメントの「最終更新日」を確認してください
- 最終更新が古い場合は、コードと照らし合わせて確認
- 間違いを見つけたらGitHub Issueで報告してください

### Q4: 英語のドキュメントはない？

**A**: 現在は日本語のみです
- 将来的には主要ドキュメントの英訳を予定（KPI_ROADMAPに記載）

### Q5: ドキュメントに間違いを見つけた

**A**: GitHub Issueで報告するか、Pull Requestで修正してください
```bash
# 修正手順
git checkout -b docs/fix-typo
# ドキュメントを修正
git add docs/
git commit -m "docs: fix typo in LEARNING_PATH.md"
git push origin docs/fix-typo
# PRを作成
```

---

## 6. ドキュメントマップ（視覚的）

```
📁 Elvgain-Caliculator/
├─ 📄 README.md ⭐ START HERE
│
├─ 📁 docs/
│  ├─ 📄 DOCUMENTATION_INDEX.md ⭐ このファイル
│  │
│  ├─ 🎯 初心者向け
│  │  ├─ QUICK_START_FOR_PLC_ENGINEERS.md
│  │  ├─ BEGINNER_WORKFLOW.md
│  │  └─ LEARNING_PATH.md
│  │
│  ├─ 📊 プロジェクト管理
│  │  ├─ DEVELOPMENT_PHASE_ASSESSMENT.md ⭐ 現状把握
│  │  ├─ KPI_ROADMAP.md ⭐ 目標とロードマップ
│  │  ├─ ROADMAP.md
│  │  ├─ NEXT_STEPS.md
│  │  └─ RETURN_TODOS.md
│  │
│  ├─ 💻 技術ドキュメント
│  │  ├─ CODE_WALKTHROUGH.md
│  │  ├─ Elevation_Loom_MVP仕様書_final.md
│  │  └─ CODE_REVIEW_SUMMARY.md
│  │
│  └─ 🤝 開発参加
│     ├─ CONTRIBUTING.md
│     ├─ RELEASE.md
│     ├─ TODO_GUIDELINES.md
│     └─ TODO_SUMMARY.md
│
└─ 📁 js/
   └─ 📄 README.md（JSファイル概要）
```

---

## 7. まとめ

このプロジェクトには、**目的別に整理された16のドキュメント**があります。

**重要なポイント**:

1. ✅ **全部読まなくてOK**: 必要なものだけ読む
2. ✅ **状況に応じて選ぶ**: このインデックスで最適なドキュメントを見つける
3. ✅ **段階的に学ぶ**: 初心者→中級者→上級者のパス
4. ✅ **更新を続ける**: ドキュメントは生きている

**次のアクション**:

```markdown
自分の状況に当てはまるものにチェック:

[ ] 👨‍💻 開発を始めたい → README.md → BEGINNER_WORKFLOW.md
[ ] 📊 プロジェクトを評価したい → DEVELOPMENT_PHASE_ASSESSMENT.md
[ ] 🔧 Web開発を学びたい（PLC経験者） → QUICK_START_FOR_PLC_ENGINEERS.md
[ ] 💻 コードを理解したい → CODE_WALKTHROUGH.md
[ ] 🤝 開発に参加したい → CONTRIBUTING.md
[ ] 📋 プロジェクトを管理したい → KPI_ROADMAP.md
```

---

**ドキュメントバージョン**: 1.0  
**最終更新**: 2026-02-09  
**メンテナー**: プロジェクトチーム  
**フィードバック**: GitHubのIssueでお願いします

---

## 付録: ドキュメント一覧表（完全版）

| # | ファイル名 | カテゴリ | 対象者 | 行数 | 更新頻度 |
|---|-----------|---------|--------|------|---------|
| 1 | README.md | 概要 | 全員 | 95行 | 低 |
| 2 | DOCUMENTATION_INDEX.md | ガイド | 全員 | このファイル | 低 |
| 3 | DEVELOPMENT_PHASE_ASSESSMENT.md | 評価 | 管理者 | 330行 | 低 |
| 4 | KPI_ROADMAP.md | 計画 | 管理者 | 540行 | 月次 |
| 5 | BEGINNER_WORKFLOW.md | 手順 | 初心者 | 650行 | 低 |
| 6 | LEARNING_PATH.md | 学習 | PLC技術者 | 583行 | 低 |
| 7 | QUICK_START_FOR_PLC_ENGINEERS.md | クイックスタート | PLC技術者 | 643行 | 低 |
| 8 | CODE_WALKTHROUGH.md | 解説 | 開発者 | 932行 | 中 |
| 9 | Elevation_Loom_MVP仕様書_final.md | 仕様 | 開発者 | 365行 | 低 |
| 10 | ROADMAP.md | 計画 | 全員 | 1191行 | 月次 |
| 11 | CONTRIBUTING.md | ガイド | コントリビューター | 73行 | 低 |
| 12 | RELEASE.md | 手順 | リリース担当 | 42行 | 低 |
| 13 | CODE_REVIEW_SUMMARY.md | レビュー | 全員 | 232行 | 低 |
| 14 | NEXT_STEPS.md | メモ | 開発者 | 44行 | 高 |
| 15 | RETURN_TODOS.md | チェックリスト | 開発者 | 36行 | 高 |
| 16 | TODO_GUIDELINES.md | 規則 | 開発者 | 45行 | 低 |
| 17 | TODO_SUMMARY.md | サマリー | 開発者 | 15行 | 高 |
| 18 | js/README.md | 技術 | 開発者 | 100行 | 中 |

**合計**: 18ドキュメント、約5,000行
