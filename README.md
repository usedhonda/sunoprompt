# Sunoprompt Chrome Extension

A Chrome extension that generates high-quality music prompts for Suno AI with advanced theme selection and genre categorization.

## Features

- 🎨 **Theme Selection**: Choose from 90+ predefined themes or create custom themes
- 🎸 **Genre Selection**: Select up to 3 genres from 150+ available options
- 🎵 **Music Settings**: Configure BPM, musical key, and language ratio
- 🎤 **Part Configuration**: Detailed settings for each song part
- 🔑 **API Key Management**: Secure storage of OpenAI API keys
- 💾 **Data Persistence**: Auto-save and restore your input settings
- 🎯 **Debug Mode**: Press Ctrl+Shift+D for detailed view

## Screenshots

![Extension Popup](extension/icons/store-banner-1400x560.png)

## Installation

### From Chrome Web Store
*Coming soon - extension will be available on Chrome Web Store*

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `extension` folder
5. The extension will appear in your Chrome toolbar

## Setup

### API Key Configuration
1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
2. Click the extension icon in Chrome
3. Enter your API key in the settings
4. Click "Save" to store securely

### Basic Usage
1. **Select Theme**: Choose from preset themes or enter custom theme
2. **Choose Genres**: Select up to 3 genres from the dropdown
3. **Configure Music**: Set BPM, key, and language preferences
4. **Set Parts**: Configure intro, verse, chorus, bridge, and outro
5. **Generate**: Click "Generate Prompt" to create your music prompt
6. **Copy**: Use the generated prompt in Suno AI

## Technical Details

### Built With
- **Manifest V3**: Latest Chrome extension standard
- **OpenAI API**: GPT-4 for intelligent prompt generation
- **Chrome Storage API**: Secure local data persistence
- **Vanilla JavaScript**: No external dependencies

### Architecture
```
extension/
├── manifest.json          # Extension configuration
├── popup.html            # Main UI
├── popup.js              # Core logic
├── background.js         # Background service worker
├── styles-scoped.css     # Scoped styling
├── theme-presets.js      # Theme definitions
├── genres.js             # Genre categories
├── musical-keys.js       # Musical key data
├── instruments.js        # Instrument definitions
└── icons/                # Extension icons
```

### Permissions
- `storage`: Save settings and preferences
- `https://api.openai.com/*`: Connect to OpenAI API

## Development

### Prerequisites
- Chrome browser
- OpenAI API key
- Text editor or IDE

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/usedhonda/sunoprompt.git
   cd sunoprompt
   ```

2. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the `extension` folder

3. Make changes and reload the extension to test

### Debug Mode
Press `Ctrl+Shift+D` in the extension popup to enable debug mode for detailed logging and advanced options.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Privacy & Security

- API keys are stored locally using Chrome's secure storage
- No data is transmitted to third parties except OpenAI API
- All processing happens locally in your browser
- See [Privacy Policy](extension/privacy-policy.html) for details

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](extension/README.md#troubleshooting)
2. Open an issue on GitHub
3. Make sure your OpenAI API key is valid and has sufficient credits

## Changelog

### v1.0.0
- Initial release
- Theme and genre selection
- OpenAI API integration
- Chrome storage implementation
- Debug mode support

---

Made with ❤️ for music creators using Suno AI