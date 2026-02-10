# 開発への貢献ガイド

短く、ローカルで開発・テストを始める手順です。

前提: Node.js 20.19+ がインストールされていること（`package.json` の `engines` フィールドを参照）。

セットアップ

1. 依存関係をインストール

```bash
npm ci
```

2. Husky フックを有効化（`prepare` スクリプトは package.json に設定済み）

```bash
npm run prepare
# または
npx husky install
```

3. (E2E 用) Playwright ブラウザをインストール

```bash
npm run e2e:install
```

開発ワークフロー

- 形式整形: `npm run format`
- 整形チェック: `npm run format:check`
- Lint: `npm run lint`
- ユニットテスト: `npm test`
- E2E テスト: `npm run e2e`

コミット時の自動チェック

**Pre-commit フック** (`lint-staged`) が自動実行され、ステージされたファイルに対して以下を実行します：
- `js/**/*.js`: ESLint + Prettier
- `e2e/**/*.js`: Prettier（フォーマットのみ）
- `*.{html,css}`: Prettier

ESLint が修正不可なエラーを検出した場合はコミットがブロックされます。詳細は `.husky/pre-commit` を参照。

CI

GitHub Actions による CI は `.github/workflows/ci.yml` を参照してください。CI はフォーマットチェック、Lint、ユニットテスト、E2E を実行します。

TODO の残し方と集約

このリポジトリでは、ドキュメントやコード内に TODO を残すときは以下のフォーマットに従ってください：

**推奨フォーマット**（Markdown 内の HTML コメント）:

```html
<!-- TODO: short description | assignee:@github-username | priority:low|medium|high | due:YYYY-MM-DD | issue:#123 -->
```

- `short description`: TODO の簡潔な説明（必須）
- `assignee`: 任意（例: `@shimanotakumi`）
- `priority`: 任意、`low|medium|high` のいずれか
- `due`: 任意、期限（ISO 日付）
- `issue`: 任意、関連 Issue 番号

**例**:

```html
<!-- TODO: adjust Playwright timeout for flaky test | assignee:@shimanotakumi | priority:medium | due:2026-03-01 | issue:#42 -->
```

**運用ルール**:
- UI に表示してはならないため、コメント形式（HTML コメント）で残す
- 重要な TODO は必ず GitHub Issue に紐付ける（可能な限り）
- 週次で TODO を確認し、対応/移動（Issue 作成）を行う

**自動集約**:

ローカルで集約レポートを生成するには以下を実行します：

```bash
npm run docs:todos
```

このコマンドは `docs/TODO_SUMMARY.md` を生成／更新します（このファイルは自動生成のため Git にコミットしません）。

コントリビューションの流れ

1. フォークしてブランチを切る
2. 小さなコミットを心掛ける
3. PR を作成し、説明と関連する issue を追加する
