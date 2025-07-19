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

## 重要な教訓・注意事項

### Chrome拡張機能の国際化実装における注意点
**実装の失敗から得られた重要な教訓:**

#### 🚨 やってはいけないこと
1. **既存の動作機能を破壊するリスク**
   - 右クリックメニュー、コンテンツスクリプト注入が複雑に絡み合っている
   - 一箇所の変更が全体に影響する可能性が高い

2. **Chrome Extension i18n APIの複雑性**
   - `_locales`ディレクトリ構造の要求
   - `default_locale`の必須設定
   - manifest.jsonでの`__MSG_key__`記法
   - 既存のハードコーディングされた日本語との衝突

3. **段階的実装の困難さ**
   - 部分的な国際化は機能を破壊する
   - 全体を一度に変更する必要があるが、失敗時の復旧が困難

#### ✅ 安全なアプローチ
1. **機能の完全性を最優先**
   - 動作している機能は絶対に破壊しない
   - バックアップを事前に作成
   - 小さな変更でも全体テストを実施

2. **Chrome拡張機能特有の制約を理解**
   - Content Security Policy
   - スクリプトの読み込み順序
   - DOM注入タイミング
   - 権限とmanifest設定の依存関係

3. **段階的ではなく全体設計**
   - 国際化は全体アーキテクチャの見直しが必要
   - 既存コードの大幅な書き換えを覚悟
   - プロトタイプでの事前検証が必須

#### 🎯 今後の方針
- **機能追加 > 国際化**: まず機能を完成させる
- **最小限の変更**: 動作する部分には触れない
- **バックアップ必須**: 重要な変更前は必ずコピー保存
- **テスト環境**: 本番とは別の環境で十分検証

**この教訓を忘れずに、安定性を最優先に開発を進める**

## バージョン管理・リリース管理

### バージョンアップのタイミング
以下の場合にバージョンを上げる（manifest.jsonとREADMEを更新）：

#### 🔥 Major (X.0.0) - 破壊的変更
- 既存機能の大幅な変更
- APIの変更
- 使い方が大きく変わる変更

#### ✨ Minor (X.Y.0) - 新機能追加
- 新しい機能の追加
- 大きなUI改善
- 新しいテーマカテゴリの追加
- パフォーマンス大幅改善

#### 🐛 Patch (X.Y.Z) - バグ修正・小改善
- バグ修正
- 小さなUI調整
- ツールチップ追加
- テキスト修正
- セキュリティ修正

### リリース手順
1. **機能実装・テスト完了**
2. **manifest.json のversion更新**
3. **README.md の## Version History更新**
   - 新バージョンを最上位に追加
   - 変更内容を分類して記載
   - 日付を記録
4. **CLAUDE.md の教訓更新（必要に応じて）**
5. **git commit & push**

### Version History記載フォーマット
```markdown
## Version History

### v1.0.4 (2024-XX-XX)
#### ✨ New Features
- ホバーツールチップ機能を全フォームラベルに追加

#### 🐛 Bug Fixes  
- Extension context invalidatedエラーの改善

#### 🎨 UI/UX Improvements
- ラベルにピンクボーダーデザイン適用
- キーワードフィールドの説明文改善

### v1.0.3 (2024-XX-XX)
...
```

### 重要な原則
- **小さな変更でも記録**: ユーザーに変更を透明に伝える
- **破壊的変更は慎重に**: Major版のみで実施
- **テスト必須**: バージョンアップ前に動作確認
- **一貫性**: フォーマットを統一する

### 🚨 Claude Codeへの徹底指示

**機能追加・修正時は必ず以下を実行:**

1. **manifest.jsonのバージョン更新は必須**
   - 作業完了と同時に実行
   - バージョン番号は適切に選択（Major/Minor/Patch）

2. **README.mdの## バージョン履歴更新は必須**
   - 新バージョンを最上位に追加
   - 実装した変更内容を具体的に記載
   - カテゴリ分けして整理（✨新機能、🐛バグ修正、🎨UI改善、📦配布など）

3. **更新忘れ防止**
   - manifest.jsonを更新したらREADMEも必ず更新
   - 作業完了前にバージョン管理タスクを完了
   - コミット前に両ファイルの更新を確認

4. **配布パッケージ更新**
   - Chrome Web Store用zipファイルの再作成
   - `dist/sunoprompt-extension-vX.X.X-chrome-web-store.zip`形式で命名

**この指示を必ず守り、バージョン管理を徹底すること**

### 🚨 GitHubバージョン管理の必須手順

**バージョンアップ時は必ず以下を実行:**

1. **manifest.jsonとREADME.md更新後**
2. **git add .**
3. **git commit -m "vX.X.X: [変更内容の簡潔な説明]"**
4. **git push**
5. **GitHubでタグ作成（推奨）**: `git tag vX.X.X && git push --tags`

#### 🎯 コミットメッセージルール
- **Major更新**: `v2.0.0: Major UI redesign and new features`
- **Minor更新**: `v1.1.0: Add complete state restoration feature`
- **Patch更新**: `v1.0.1: Fix language ratio instruction bug`

#### 📋 必須チェックリスト
- [ ] manifest.jsonのバージョン更新済み
- [ ] README.mdのバージョン履歴更新済み
- [ ] 機能テスト完了
- [ ] git commit & push実行済み
- [ ] 配布用zipファイル更新（必要に応じて）

**忘れずに必ず実行すること**

