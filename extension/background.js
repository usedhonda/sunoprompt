// Chrome Extension Background Service Worker - Simplified for popup-only extension

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log('Sunoprompt Extension installed');
  
  // Create context menu
  chrome.contextMenus.create({
    id: 'sunoprompt-open',
    title: '🎵 Open Sunoprompt',
    contexts: ['all']
  });
});

// Context menu click handler
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'sunoprompt-open') {
    // Open the extension popup (Note: chrome.action.openPopup() only works in certain contexts)
    // For now, this will just log. Users can click the extension icon to open popup.
    console.log('Sunoprompt context menu clicked');
  }
});