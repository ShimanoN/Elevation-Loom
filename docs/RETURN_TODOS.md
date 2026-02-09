# 帰宅後の実行チェックリスト

以下はローカルで作業を再開するときの優先 TODO です。順に実行し、問題があれば該当箇所を修正してコミットしてください。

## 優先度: 高（最初に実行）
- [ ] Run lint and apply fixes
  - コマンド:
    ```bash
    npm run lint
    npm run lint:fix
    ```
  - 目的: コード整合性の自動修正と潜在的なエラー発見

- [ ] Run unit tests and fix failures
  - コマンド:
    ```bash
    npm run test:run
    ```
  - 目的: ユニットテストが全て通ることを確認

## 優先度: 中（上が安定したら）
- [ ] Run E2E locally and note failures
  - コマンド:
    ```bash
    npm run e2e:install
    npm run e2e
    ```
  - 目的: E2E の失敗箇所を把握し、タイムアウトやセレクタを調整

- [ ] Triage flaky E2E tests
  - 具体案: タイムアウト延長、個別テストの retries 増加、テストの安定化

## 優先度: 低（時間あるとき）
- [ ] Small refactors: pick top-3 functions to simplify and extract
- [ ] Convert high-priority TODOs into GitHub Issues and add links
- [ ] Plan phased TypeScript migration (scope + estimate)

## 備考
- 変更は小さいコミットに分けること。
- 変更後は `npm run docs:todos` を実行して `docs/TODO_SUMMARY.md` を更新してください。

---
ファイル: `docs/RETURN_TODOS.md`
