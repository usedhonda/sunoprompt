# Sunoprompt Extension - Project Configuration

## Project Info
- Name: Sunoprompt Chrome Extension
- Language: JavaScript (ES6+)
- Framework: Chrome Extension Manifest V3
- Description: Suno AI用の高品質な音楽プロンプトを生成するChrome拡張機能

## Project Structure
```
sunoprompt/
├── extension/                 # Chrome拡張機能のソースコード
│   ├── manifest.json         # 拡張機能の設定
│   ├── popup.html           # メインUI
│   ├── popup.js             # メインロジック
│   ├── background.js        # バックグラウンドスクリプト
│   ├── styles-scoped.css    # スタイルシート
│   ├── theme-presets.js     # テーマプリセット
│   ├── genres.js            # ジャンルデータ
│   ├── musical-keys.js      # 音楽キーデータ
│   ├── instruments.js       # 楽器データ
│   └── icons/               # アイコン類
├── sunoprompt-extension-v1.0.0-minimal.zip  # 配布用パッケージ
└── *.md                     # ドキュメント類
```

## Key Features
- 🎨 テーマ選択: 90種類以上のテーマから選択可能
- 🎸 ジャンル選択: 150種類のジャンルから最大3つ選択
- 🎵 音楽設定: BPM、キー、言語比率の詳細設定
- 🎤 パート別構成: 各パートごとの詳細設定
- 🔑 API キー管理: OpenAI API キーの安全な保存
- 💾 データ保存: 入力内容の自動保存・復元

## Development Guidelines
- Chrome Extension Manifest V3を使用
- OpenAI API (GPT-4)を使用してプロンプト生成
- Chrome Storage APIを使用してデータ永続化
- CSP (Content Security Policy)に準拠したセキュアな実装

## API Dependencies
- OpenAI API: プロンプト生成に使用
- Chrome Storage API: 設定とデータの保存
- Chrome Extension APIs: 拡張機能の基本機能

## Security Notes
- OpenAI API キーはChrome Storage APIで暗号化保存
- Content Security Policyによりスクリプトの実行を制限
- 外部リソースへの接続は必要最小限に制限

## Testing
- Chrome拡張機能の開発者モードでテスト
- 手動テストによる機能確認
- デバッグモード (Ctrl+Shift+D) でトラブルシューティング

## Distribution
- Chrome Web Storeでの配布を想定
- .zipファイルによる手動配布も可能