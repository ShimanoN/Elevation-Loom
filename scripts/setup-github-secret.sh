#!/bin/bash
# Firebase Service Account キー設定のヘルパースクリプト

echo "🔑 Firebase Service Account キーの設定"
echo "========================================"
echo ""
echo "このスクリプトはFirebase Service Accountキーを取得します。"
echo "取得したキーをGitHub Secretsに手動で設定してください。"
echo ""

# Firebase CLIがインストールされているか確認
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLIがインストールされていません。"
    echo "   npm install -g firebase-tools を実行してください。"
    exit 1
fi

echo "✅ Firebase CLIがインストールされています。"
echo ""

# ログイン状態を確認
if ! firebase projects:list &> /dev/null; then
    echo "❌ Firebaseにログインしていません。"
    echo "   firebase login を実行してください。"
    exit 1
fi

echo "✅ Firebaseにログインしています。"
echo ""

PROJECT_ID="elevation-loom"

echo "📋 プロジェクト: $PROJECT_ID"
echo ""
echo "次のステップ:"
echo "1. Google Cloud Console でサービスアカウントキーを作成"
echo "   https://console.cloud.google.com/iam-admin/serviceaccounts?project=$PROJECT_ID"
echo ""
echo "2. キーをJSONファイルとしてダウンロード"
echo ""
echo "3. GitHubリポジトリの Settings > Secrets and variables > Actions に移動"
echo "   https://github.com/ShimanoN/Elvgain-Caliculator/settings/secrets/actions"
echo ""
echo "4. 'New repository secret' をクリック"
echo ""
echo "5. 以下を入力:"
echo "   Name: FIREBASE_SERVICE_ACCOUNT_ELEVATION_LOOM"
echo "   Secret: ダウンロードしたJSONファイルの内容全体をペースト"
echo ""
echo "6. 'Add secret' をクリック"
echo ""
echo "詳細な手順は FIREBASE_DEPLOYMENT_GUIDE.md を参照してください。"
