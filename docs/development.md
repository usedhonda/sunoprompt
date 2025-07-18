# Development Guide

## Extension Structure

```
extension/
├── manifest.json          # Extension configuration
├── popup.html            # Main UI
├── popup.js              # Main logic
├── background.js         # Background service worker
├── styles-scoped.css     # Scoped styling
├── privacy-policy.html   # Privacy policy page
├── theme-presets.js      # Theme definitions
├── genres.js             # Genre categories
├── musical-keys.js       # Musical key data
├── instruments.js        # Instrument definitions
├── create_store_icons.py # Icon generation script
└── icons/                # Extension icons
```

## Development Setup

1. Clone the repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `extension` folder
5. Get OpenAI API key from [OpenAI Platform](https://platform.openai.com/)

## Testing

### Manual Testing
- Test all UI interactions
- Verify API key storage and retrieval
- Test prompt generation with different settings
- Check all theme and genre combinations

### Debug Mode
Press `Ctrl+Shift+D` in the extension popup for detailed logging and advanced options.

## File Descriptions

### Core Files
- `manifest.json`: Extension configuration and permissions
- `popup.html/js`: Main extension interface
- `background.js`: Background service worker for API calls
- `styles-scoped.css`: Scoped CSS to avoid conflicts

### Data Files
- `theme-presets.js`: 90+ predefined themes
- `genres.js`: 150+ music genres categorized
- `musical-keys.js`: Musical key definitions
- `instruments.js`: Instrument categories and definitions

### Assets
- `icons/`: Extension icons in various sizes
- `privacy-policy.html`: Privacy policy for users

## Chrome Extension APIs Used

- `chrome.storage`: Secure storage for API keys and settings
- `chrome.action`: Extension popup management
- `chrome.runtime`: Background script communication

## Security Considerations

- API keys stored using Chrome's secure storage
- Content Security Policy enforced
- No external script loading
- Minimal permissions requested