// Chrome Extension Background Service Worker - 簡略化版
// 権限を最小化し、基本的な機能のみ提供

// 拡張機能がインストール時の処理
chrome.runtime.onInstalled.addListener(() => {
  console.log('Sunoprompt Extension installed');
});