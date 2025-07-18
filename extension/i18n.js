// Internationalization (i18n) System for Sunoprompt Extension

class I18nManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {
            ja: {
                // Header
                "app_title": "🎵 Sunoprompt",
                "app_description": "Suno AI用の高品質な音楽プロンプトを生成",
                
                // Main sections
                "prompt_generation": "プロンプト生成",
                "generated_results": "生成結果",
                
                // Form labels
                "openai_api_key": "OpenAI API Key",
                "openai_model": "OpenAI Model",
                "theme_concept": "テーマ・コンセプト",
                "poetic_keywords": "詩的キーワード（歌詞に必須）",
                "genres": "ジャンル（最大3つまで選択可能）",
                "key": "キー",
                "bpm": "BPM",
                "mood": "ムード",
                "default_vocal_style": "デフォルトボーカルスタイル",
                "language_ratio": "言語比率",
                "song_structure": "曲構成テンプレート",
                "detailed_song_structure": "詳細楽曲構成",
                "instruments": "楽器（カンマ区切り）",
                
                // Buttons
                "generate_prompt": "🎵 プロンプト生成",
                "copy_all": "📋 全てをコピー",
                "add_part": "➕ パート追加",
                "preset_theme": "📚 プリセットから選択",
                "custom_theme": "✏️ カスタムテーマ入力",
                "major": "メジャー",
                "minor": "マイナー",
                
                // Placeholders
                "enter_api_key": "OpenAI API キーを入力",
                "custom_theme_placeholder": "独自のテーマ・コンセプトを入力してください...\n例: 深夜のコンビニで偶然出会った人との短い会話。蛍光灯の下で交わされる言葉に隠された人間的な温かさ。都市の孤独の中で見つける一瞬のつながり。",
                "keywords_placeholder": "例: noise, filter, plastic, screen light, 画面の光, ノイズ",
                "instruments_placeholder": "例: Piano, Guitar, Strings",
                
                // Theme selection
                "selected_themes": "選択されたテーマ:",
                "selected_genres": "選択されたジャンル:",
                
                // Language slider
                "language_ratio_text": "Japanese {{japanese}}% - English {{english}}%",
                "language_japanese": "Japanese",
                "language_english": "English",
                "language_desc_full_jp": "完全に日本語の構成",
                "language_desc_mostly_jp": "主に日本語、一部英語",
                "language_desc_half": "日本語と英語が半々の構成",
                "language_desc_mostly_en": "主に英語、一部日本語",
                "language_desc_full_en": "完全に英語の構成",
                
                // Loading
                "loading_title": "🎵 高品質なプロンプトを生成中",
                "loading_subtitle": "AIが最適な音楽プロンプトを作成しています...",
                
                // Results
                "style_feel": "Style & Feel",
                "song_name": "Song Name",
                "lyrics": "Lyrics",
                "lyrics_analysis": "Lyrics Analysis",
                
                // Messages
                "api_key_saved": "API キーが保存されました",
                "api_key_loaded": "API キーが保存されています",
                "api_key_save_failed": "API キーの保存に失敗しました",
                "api_key_set": "API キーが設定されました（保存は無効）",
                
                // Settings
                "language_setting": "言語設定",
                "auto_detect": "自動検出",
                "japanese": "日本語",
                "english": "English"
            },
            en: {
                // Header
                "app_title": "🎵 Sunoprompt",
                "app_description": "Generate high-quality music prompts for Suno AI",
                
                // Main sections
                "prompt_generation": "Prompt Generation",
                "generated_results": "Generated Results",
                
                // Form labels
                "openai_api_key": "OpenAI API Key",
                "openai_model": "OpenAI Model",
                "theme_concept": "Theme & Concept",
                "poetic_keywords": "Poetic Keywords (Required in Lyrics)",
                "genres": "Genres (Select up to 3)",
                "key": "Key",
                "bpm": "BPM",
                "mood": "Mood",
                "default_vocal_style": "Default Vocal Style",
                "language_ratio": "Language Ratio",
                "song_structure": "Song Structure Template",
                "detailed_song_structure": "Detailed Song Structure",
                "instruments": "Instruments (comma-separated)",
                
                // Buttons
                "generate_prompt": "🎵 Generate Prompt",
                "copy_all": "📋 Copy All",
                "add_part": "➕ Add Part",
                "preset_theme": "📚 Select from Presets",
                "custom_theme": "✏️ Custom Theme Input",
                "major": "Major",
                "minor": "Minor",
                
                // Placeholders
                "enter_api_key": "Enter OpenAI API Key",
                "custom_theme_placeholder": "Enter your custom theme/concept...\nExample: A brief conversation with someone met by chance at a late-night convenience store. The human warmth hidden in words exchanged under fluorescent lights. A moment of connection found in urban solitude.",
                "keywords_placeholder": "e.g., noise, filter, plastic, screen light, 画面の光, ノイズ",
                "instruments_placeholder": "e.g., Piano, Guitar, Strings",
                
                // Theme selection
                "selected_themes": "Selected Themes:",
                "selected_genres": "Selected Genres:",
                
                // Language slider
                "language_ratio_text": "Japanese {{japanese}}% - English {{english}}%",
                "language_japanese": "Japanese",
                "language_english": "English",
                "language_desc_full_jp": "Fully Japanese composition",
                "language_desc_mostly_jp": "Mostly Japanese, some English",
                "language_desc_half": "Half Japanese, half English composition",
                "language_desc_mostly_en": "Mostly English, some Japanese",
                "language_desc_full_en": "Fully English composition",
                
                // Loading
                "loading_title": "🎵 Generating High-Quality Prompts",
                "loading_subtitle": "AI is creating optimal music prompts...",
                
                // Results
                "style_feel": "Style & Feel",
                "song_name": "Song Name",
                "lyrics": "Lyrics",
                "lyrics_analysis": "Lyrics Analysis",
                
                // Messages
                "api_key_saved": "API Key saved successfully",
                "api_key_loaded": "API Key loaded from storage",
                "api_key_save_failed": "Failed to save API Key",
                "api_key_set": "API Key set (storage disabled)",
                
                // Settings
                "language_setting": "Language Setting",
                "auto_detect": "Auto Detect",
                "japanese": "日本語",
                "english": "English"
            }
        };
        
        this.init();
    }
    
    async init() {
        // Detect browser language
        const browserLang = this.detectBrowserLanguage();
        
        // Load saved language preference
        const savedLang = await this.loadLanguagePreference();
        
        // Set language (priority: saved > browser > default)
        this.currentLanguage = savedLang || browserLang || 'en';
        
        // Apply translations
        this.applyTranslations();
        
        // Initialize language selector
        this.initializeLanguageSelector();
    }
    
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Return 'ja' if Japanese, otherwise 'en'
        return browserLang.startsWith('ja') ? 'ja' : 'en';
    }
    
    async loadLanguagePreference() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                const result = await chrome.storage.sync.get(['language']);
                return result.language;
            }
        } catch (error) {
            console.error('Failed to load language preference:', error);
        }
        return null;
    }
    
    async saveLanguagePreference(language) {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                await chrome.storage.sync.set({ language });
            }
        } catch (error) {
            console.error('Failed to save language preference:', error);
        }
    }
    
    t(key, params = {}) {
        const translation = this.translations[this.currentLanguage]?.[key] || key;
        
        // Replace parameters
        return translation.replace(/\{\{(\w+)\}\}/g, (match, param) => {
            return params[param] || match;
        });
    }
    
    async setLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
            await this.saveLanguagePreference(language);
            this.applyTranslations();
            
            // Update language selector
            this.updateLanguageSelector();
        }
    }
    
    applyTranslations() {
        // Apply translations to elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'password')) {
                element.placeholder = translation;
            } else if (element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Apply translations to specific elements
        this.applySpecificTranslations();
    }
    
    applySpecificTranslations() {
        // Update document title
        document.title = this.t('app_title');
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
    }
    
    initializeLanguageSelector() {
        // Create language selector if it doesn't exist
        let languageSelector = document.getElementById('languageSelector');
        if (!languageSelector) {
            languageSelector = this.createLanguageSelector();
        }
        
        this.updateLanguageSelector();
    }
    
    createLanguageSelector() {
        const header = document.querySelector('header');
        if (!header) return null;
        
        const languageSelector = document.createElement('div');
        languageSelector.id = 'languageSelector';
        languageSelector.className = 'language-selector';
        languageSelector.innerHTML = `
            <select id="languageSelect">
                <option value="auto" data-i18n="auto_detect">Auto Detect</option>
                <option value="ja" data-i18n="japanese">日本語</option>
                <option value="en" data-i18n="english">English</option>
            </select>
        `;
        
        header.appendChild(languageSelector);
        
        // Add event listener
        const select = languageSelector.querySelector('#languageSelect');
        select.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            if (selectedLang === 'auto') {
                this.setLanguage(this.detectBrowserLanguage());
            } else {
                this.setLanguage(selectedLang);
            }
        });
        
        return languageSelector;
    }
    
    updateLanguageSelector() {
        const select = document.getElementById('languageSelect');
        if (select) {
            select.value = this.currentLanguage;
        }
    }
}

// Initialize i18n when DOM is ready
let i18nManager;

document.addEventListener('DOMContentLoaded', () => {
    i18nManager = new I18nManager();
});

// Global function to get translations
function t(key, params = {}) {
    return i18nManager ? i18nManager.t(key, params) : key;
}