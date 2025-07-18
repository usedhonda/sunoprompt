// Chrome Extension Content Script - 現在のページにSunopromptオーバーレイを表示
let sunopromptContainer = null;
let isVisible = false;
let isInitialized = false;

// バックグラウンドスクリプトからのメッセージを受信
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleSunoprompt") {
    toggleSunoprompt();
    sendResponse({ success: true });
  }
});

function toggleSunoprompt() {
  if (isVisible) {
    hideSunoprompt();
  } else {
    showSunoprompt();
  }
}

function showSunoprompt() {
  if (sunopromptContainer) {
    sunopromptContainer.style.display = 'flex';
    isVisible = true;
    return;
  }
  
  // 既存のオーバーレイがあれば削除
  const existingOverlay = document.getElementById('sunoprompt-extension-overlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }

  // オーバーレイコンテナを作成（通常のDOM）
  sunopromptContainer = document.createElement('div');
  sunopromptContainer.id = 'sunoprompt-extension-overlay';
  sunopromptContainer.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background: rgba(0, 0, 0, 0.9) !important;
    z-index: 2147483647 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    overflow: auto !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
    color: #ffffff !important;
    margin: 0 !important;
    padding: 20px !important;
    border: none !important;
    outline: none !important;
  `;

  // Sunopromptのメインコンテナ
  const sunopromptMain = document.createElement('div');
  sunopromptMain.style.cssText = `
    background: #1a1a1a !important;
    border: 1px solid #333333 !important;
    border-radius: 16px !important;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5) !important;
    width: 95vw !important;
    height: 95vh !important;
    max-width: 1400px !important;
    max-height: 1000px !important;
    overflow: auto !important;
    position: relative !important;
    margin: 0 !important;
    padding: 24px !important;
  `;

  // 閉じるボタン
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '✕';
  closeButton.style.cssText = `
    position: absolute !important;
    top: 16px !important;
    right: 16px !important;
    background: #ff4081 !important;
    color: white !important;
    border: none !important;
    border-radius: 50% !important;
    width: 32px !important;
    height: 32px !important;
    font-size: 18px !important;
    cursor: pointer !important;
    z-index: 1000000 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-family: inherit !important;
    font-weight: bold !important;
    transition: all 0.2s ease !important;
  `;
  closeButton.onclick = hideSunoprompt;

  // popup.htmlの内容を読み込み
  fetch(chrome.runtime.getURL('popup.html'))
    .then(response => response.text())
    .then(html => {
      // HTMLパーサーでDOMを作成
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // bodyの内容を取得
      const bodyContent = doc.body.innerHTML;
      sunopromptMain.innerHTML = bodyContent;
      
      // CSSを動的に読み込み（スコープ版を使用）
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = chrome.runtime.getURL('styles-scoped.css');
      document.head.appendChild(link);
      
      // HTMLが読み込まれてからSunopromptExtensionを初期化
      const initializeSunoprompt = () => {
        // 必要なデータが全て読み込まれているかチェック
        const dataCheck = {
          THEME_CATEGORIES: typeof window.THEME_CATEGORIES !== 'undefined',
          THEME_PRESETS: typeof window.THEME_PRESETS !== 'undefined',
          MUSIC_GENRES: typeof window.MUSIC_GENRES !== 'undefined',
          GENRE_CATEGORIES: typeof window.GENRE_CATEGORIES !== 'undefined',
          MUSICAL_KEYS: typeof window.MUSICAL_KEYS !== 'undefined',
          SunopromptExtension: typeof window.SunopromptExtension !== 'undefined'
        };
        
        // 通常のDOM要素を検索
        const themeContainer = document.getElementById('themeCategories');
        const genreContainer = document.getElementById('genreCategories');
        
        // 全ての依存関係とDOM要素が準備できているかチェック
        const allDataReady = Object.values(dataCheck).every(ready => ready);
        const domReady = themeContainer && genreContainer;
        
        if (allDataReady && domReady) {
          try {
            window.sunoprompt = new window.SunopromptExtension();
          } catch (error) {
            console.error('Error initializing SunopromptExtension:', error);
          }
        } else {
          setTimeout(initializeSunoprompt, 500);
        }
      };
      
      // HTMLが読み込まれてから初期化開始
      setTimeout(initializeSunoprompt, 1000);
    })
    .catch(error => {
      console.error('Failed to load Sunoprompt:', error);
      sunopromptMain.innerHTML = '<p style="padding: 20px; color: red;">Sunopromptの読み込みに失敗しました。</p>';
    });

  sunopromptContainer.appendChild(closeButton);
  sunopromptContainer.appendChild(sunopromptMain);
  document.body.appendChild(sunopromptContainer);
  
  isVisible = true;
}

function hideSunoprompt() {
  if (sunopromptContainer) {
    sunopromptContainer.remove();
    sunopromptContainer = null;
    isVisible = false;
  }
}

// ESCキーで閉じる
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isVisible) {
    hideSunoprompt();
  }
});

// グローバル関数として公開
window.toggleSunoprompt = toggleSunoprompt;
window.showSunoprompt = showSunoprompt;
window.hideSunoprompt = hideSunoprompt;

// Sunopromptからのメッセージを受信してSunoフォームに入力
window.addEventListener('message', (event) => {
  if (event.data.type === 'SUNOPROMPT_FILL_FORM') {
    fillSunoFormDirect(event.data.data);
  }
});

// Sunoフォームに直接入力する関数
function fillSunoFormDirect(result) {
  try {
    
    // Sunoサイト特有のセレクタを優先して試行
    const selectors = {
      title: [
        // Suno実際のセレクタ（最優先）
        'input[placeholder*="Enter song title"]',
        'input[data-slot="input"][placeholder*="Enter song title"]',
        'input[maxlength="100"][placeholder*="Enter song title"]',
        // Suno特有のセレクタ（フォールバック）
        'input[placeholder*="Song title"]',
        'input[placeholder*="Title"]',
        '[data-testid*="title"] input',
        '[class*="title"] input',
        // 一般的なセレクタ
        'input[placeholder*="title"]',
        'input[placeholder*="song"]',
        'input[name*="title"]',
        'input[id*="title"]',
        'textarea[placeholder*="title"]'
      ],
      lyrics: [
        // Suno実際のセレクタ（最優先）
        'textarea[data-testid="lyrics-input-textarea"]',
        'textarea[placeholder*="Add your own lyrics here"]',
        // Suno特有のセレクタ（フォールバック）
        'textarea[placeholder*="Enter your lyrics"]',
        'textarea[placeholder*="Lyrics"]',
        '[data-testid*="lyrics"] textarea',
        '[class*="lyrics"] textarea',
        'div[contenteditable="true"][class*="lyrics"]',
        // 一般的なセレクタ
        'textarea[placeholder*="lyrics"]',
        'textarea[name*="lyrics"]',
        'textarea[id*="lyrics"]',
        'div[contenteditable="true"]'
      ],
      style: [
        // Suno実際のセレクタ（最優先）
        'textarea[data-testid="tag-input-textarea"]',
        'textarea[placeholder*="Enter style tags"]',
        // Suno特有のセレクタ（フォールバック）
        'input[placeholder*="Style of Music"]',
        'input[placeholder*="Genre"]',
        '[data-testid*="style"] input',
        '[data-testid*="genre"] input',
        '[class*="style"] input',
        // 一般的なセレクタ
        'input[placeholder*="style"]',
        'input[placeholder*="genre"]',
        'input[name*="style"]',
        'input[id*="style"]',
        'textarea[placeholder*="style"]'
      ]
    };

    let filled = {title: false, lyrics: false, style: false};

    // タイトルを入力
    for (const selector of selectors.title) {
      const element = document.querySelector(selector);
      if (element) {
        element.value = result.songName || result.title || '';
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
        filled.title = true;
        break;
      }
    }

    // 歌詞を入力
    for (const selector of selectors.lyrics) {
      const element = document.querySelector(selector);
      if (element) {
        if (element.tagName === 'DIV') {
          element.textContent = result.lyrics || '';
        } else {
          element.value = result.lyrics || '';
        }
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
        filled.lyrics = true;
        break;
      }
    }

    // スタイルを入力
    for (const selector of selectors.style) {
      const element = document.querySelector(selector);
      if (element) {
        element.value = result.style || '';
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
        filled.style = true;
        break;
      }
    }

    const successCount = Object.values(filled).filter(Boolean).length;
    if (successCount > 0) {
      showTemporaryNotification(`🎵 ${successCount}個のフィールドに反映完了！`);
    } else {
      showTemporaryNotification('⚠️ 対象のフィールドが見つかりませんでした');
    }

  } catch (error) {
    console.error('Direct form fill error:', error);
    showTemporaryNotification('❌ フォーム入力でエラーが発生しました');
  }
}

// 一時的な通知を表示する関数
function showTemporaryNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed !important;
    top: 20px !important;
    right: 20px !important;
    background: #333 !important;
    color: white !important;
    padding: 12px 20px !important;
    border-radius: 8px !important;
    z-index: 9999999 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    font-size: 14px !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
    border: 1px solid #ff4081 !important;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}