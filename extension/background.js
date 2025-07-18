// Chrome Extension Background Service Worker
// 右クリックメニューと拡張機能アイコンでSunoサイト上にオーバーレイ表示

// 拡張機能がインストール時にコンテキストメニューを作成
chrome.runtime.onInstalled.addListener(() => {
  // Sunoサイト限定の右クリックメニューを作成
  chrome.contextMenus.create({
    id: "openSunoprompt",
    title: "🎵 Sunopromptで音楽プロンプト生成",
    contexts: ["page", "selection"],
    documentUrlPatterns: ["*://suno.com/*", "*://*.suno.com/*"]
  });
});

// コンテキストメニューがクリックされた時の処理
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "openSunoprompt") {
    // 現在のタブにオーバーレイでSunopromptを表示
    await showSunopromptOnCurrentTab(tab.id);
  }
});

// 拡張機能のアイコンがクリックされた時の処理は無効
// default_popupが設定されているため、ポップアップが表示される

// 現在のタブにSunopromptをオーバーレイ表示する関数
async function showSunopromptOnCurrentTab(tabId) {
  try {
    // コンテンツスクリプトにメッセージを送信してSunopromptを表示/非表示
    await chrome.tabs.sendMessage(tabId, { action: "toggleSunoprompt" });
  } catch (error) {
    // コンテンツスクリプトが読み込まれていない場合は注入
    console.log('Injecting scripts...');
    
    // データファイルを先に注入
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['theme-presets.js']
    });
    
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['genres.js']
    });
    
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['musical-keys.js']
    });
    
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['popup.js']
    });
    
    // CSSは不要（content.jsで動的スタイル適用）
    
    // 最後にコンテンツスクリプトを注入
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
    
    // 少し待ってからメッセージを送信
    setTimeout(async () => {
      try {
        await chrome.tabs.sendMessage(tabId, { action: "toggleSunoprompt" });
      } catch (e) {
        console.log('Message failed, scripts may still be loading');
      }
    }, 1000);
  }
}