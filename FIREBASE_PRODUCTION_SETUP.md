# Firebase Production Setup Guide

このドキュメントは、Elevation Loom を本番環境にデプロイするための Firebase 設定手順を説明します。

## 前提条件

- Firebase プロジェクトが作成済みであること
- Firebase CLI がインストール済みであること (`npm install -g firebase-tools`)
- プロジェクトのオーナー権限を持っていること

## 1. Firebase Authentication の設定

### 匿名認証を有効にする（必須）

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. プロジェクトを選択
3. 左メニューから「Authentication」→「Sign-in method」を選択
4. 「Anonymous」を見つけて有効化
5. 「保存」をクリック

**重要**: アプリは匿名認証を使用してユーザーごとにデータを分離します。この設定がないとアプリが正常に動作しません。

### 確認方法

```bash
# ローカルでテストして確認
npm run dev
# ブラウザコンソールで以下を確認:
# "Firebase Auth connected" というログが出ること
# エラーが出ないこと
```

## 2. Firestore Database の設定

### データベース作成

1. Firebase Console で「Firestore Database」を選択
2. 「データベースを作成」をクリック
3. 本番環境モードで開始
4. ロケーションを選択（例: asia-northeast1 (Tokyo)）
5. 「有効にする」をクリック

### セキュリティルールのデプロイ

プロジェクトの `firestore.rules` ファイルには既にセキュリティルールが定義されています。

```bash
# ルールをデプロイ
firebase deploy --only firestore:rules

# 確認
firebase firestore:rules:list
```

**重要なルール内容**:
- ユーザーは自分のデータ (`users/{userId}/weeks/{weekId}`) のみアクセス可能
- 匿名ユーザーでも UID が割り当てられるため、データは完全に分離される
- データ構造の検証（週番号、elevation値の範囲チェックなど）
- レート制限（1秒に1回の書き込み制限）

### インデックスの設定

```bash
# インデックスをデプロイ
firebase deploy --only firestore:indexes
```

## 3. 課金とアラートの設定

### 予算アラートの設定（必須）

1. Firebase Console で「Usage and billing」→「Details & settings」を選択
2. 「Set a budget」をクリック
3. 予算額を設定（例: $10/月）
4. アラートのしきい値を設定（例: 50%, 80%, 100%）
5. 通知先のメールアドレスを設定
6. 「保存」をクリック

### 推奨設定

- **Firestore**: 無料枠で十分なはずですが、アラートを設定しておくことを推奨
  - 読み取り: 50,000/日（無料）
  - 書き込み: 20,000/日（無料）
  - ストレージ: 1GB（無料）
- **Authentication**: 匿名認証は無料（月間 10,000 ユーザーまで）
- **Hosting**: 10GB/月まで無料

## 4. 環境変数の設定

### GitHub Secrets の設定（GitHub Actions 用）

1. GitHub リポジトリで「Settings」→「Secrets and variables」→「Actions」を選択
2. 以下のシークレットを追加:

```
VITE_FIREBASE_API_KEY=<your-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<your-project-id>.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=<your-project-id>
VITE_FIREBASE_STORAGE_BUCKET=<your-project-id>.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
VITE_FIREBASE_APP_ID=<your-app-id>
```

これらの値は Firebase Console の「Project settings」→「General」→「Your apps」から確認できます。

### ローカル開発用の設定

```bash
# .env ファイルを作成
cp .env.example .env

# .env ファイルを編集して実際の値を設定
nano .env
```

**注意**: `.env` ファイルは `.gitignore` に含まれているため、コミットされません。

## 5. デプロイ

### 手動デプロイ

```bash
# ビルド
npm run build

# Firebase にデプロイ
firebase deploy

# または、特定のサービスのみデプロイ
firebase deploy --only hosting
firebase deploy --only firestore:rules
```

### 自動デプロイ（GitHub Actions）

プロジェクトには既に CI/CD パイプラインが設定されています:

- `.github/workflows/firebase-hosting-merge.yml`: main ブランチへのマージ時に自動デプロイ
- `.github/workflows/firebase-hosting-pull-request.yml`: PR 作成時にプレビュー環境をデプロイ

## 6. デプロイ後の確認

### 必須チェック項目

1. **認証の確認**
   ```
   https://<your-app-url>
   ```
   - ブラウザコンソールで "Firebase Auth connected" が出ること
   - エラーが出ないこと

2. **データ保存の確認**
   - 日次データを入力
   - ページをリロード
   - データが保持されていること

3. **セキュリティルールの確認**
   - Firebase Console で「Firestore Database」→「ルール」を確認
   - ルールが正しくデプロイされていること

4. **ネットワークタブの確認**
   - ブラウザの開発者ツールで Network タブを開く
   - Firestore への通信が成功していること（Status: 200）

## 7. トラブルシューティング

### 認証エラーが出る

```
Error: Firebase: Error (auth/unauthorized-domain)
```

**解決方法**:
1. Firebase Console で「Authentication」→「Settings」→「Authorized domains」を選択
2. デプロイ先のドメイン（例: `elevation-loom.web.app`）を追加

### Firestore へのアクセスが拒否される

```
Error: Missing or insufficient permissions
```

**解決方法**:
1. Firestore のセキュリティルールが正しくデプロイされているか確認
2. 匿名認証が有効になっているか確認
3. ブラウザコンソールで現在のユーザー UID を確認:
   ```javascript
   console.log(firebase.auth().currentUser?.uid)
   ```

### デプロイが失敗する

```
Error: HTTP Error: 403, Permission denied
```

**解決方法**:
```bash
# Firebase CLI で再ログイン
firebase logout
firebase login

# プロジェクトを再選択
firebase use --add
```

## 8. セキュリティのベストプラクティス

### やるべきこと ✅

- 匿名認証を有効にする
- Firestore セキュリティルールをデプロイする
- 予算アラートを設定する
- HTTPS を使用する（Firebase Hosting はデフォルトで HTTPS）
- 定期的に Firebase Console でアクセスログを確認する

### やってはいけないこと ❌

- Firebase API Key を秘密にしようとしない（クライアントサイドなので公開される）
- デモモード（`demo-project`）を本番環境で使わない
- Firestore のルールを `allow read, write: if true` にしない
- 予算アラートなしで本番環境を運用しない

## 9. モニタリング

### Firebase Console でのモニタリング

定期的に以下を確認してください:

1. **Authentication**
   - 匿名ユーザー数の推移
   - エラー率

2. **Firestore**
   - 読み取り/書き込み回数
   - ストレージ使用量
   - セキュリティルール違反の試行

3. **Hosting**
   - 転送量
   - リクエスト数

### アラート設定

Firebase Console で以下のアラートを設定することを推奨:

- Firestore の使用量が無料枠の 80% を超えたとき
- エラー率が急増したとき
- セキュリティルール違反が検出されたとき

## 10. ロールバック手順

問題が発生した場合のロールバック方法:

```bash
# 以前のバージョンを確認
firebase hosting:channel:list

# 特定のバージョンにロールバック
firebase hosting:clone <source-site-id>:<source-channel-id> <target-site-id>:live
```

---

## 参考リンク

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Pricing](https://firebase.google.com/pricing)

---

**最終更新**: 2026-02-16
