// Chrome Extension完全版 - Web版全機能移植
class SunopromptExtension {
    constructor() {
        this.selectedThemes = [];
        this.selectedGenres = [];
        this.songParts = [];
        this.partIdCounter = 0;
        this.currentKeyType = 'major';
        this.isCustomTheme = false;
        this.customStructureSequence = [];
        this.openaiApiKey = '';
        this.debugMode = false;
        this.lastDebugData = null;
        this.contextInvalidatedWarned = false;
        this.saveTimer = null;
        
        // Don't auto-initialize - will be called from HTML
        this.init();
        this.setupCopyButtons();
        this.setupPopupStability();
    }

    async init() {
        try {
            console.log('🚀 Starting initialization process...');
            
            // Load saved API key
            console.log('📱 Loading API key...');
            await this.loadApiKey();
            
            // Wait for all scripts to load
            console.log('⏳ Waiting for scripts...');
            await this.waitForScripts();
            
            // 🚀 Load saved data FIRST before initializing UI
            console.log('💾 Loading saved data...');
            await this.loadSavedDataForInitialization();
            
            // Initialize UI components with knowledge of saved data
            console.log('🎨 Initializing UI components...');
            this.initializeThemeSelection();
            console.log('✅ Theme selection initialized');
            
            this.initializeGenreSelection();
            console.log('✅ Genre selection initialized');
            
            this.initializeKeySelection();
            console.log('✅ Key selection initialized');
            
            this.initializeLanguageSlider();
            console.log('✅ Language slider initialized');
            
            this.initializeBPMSlider();
            console.log('✅ BPM slider initialized');
            
            this.initializeSongStructure();
            console.log('✅ Song structure initialized');
            
            this.initializeInstrumentSelection();
            console.log('✅ Instrument selection initialized');
            
            this.initializeSongParts();
            console.log('✅ Song parts initialized');
            
            this.initializeEventListeners();
            console.log('✅ Event listeners initialized');
            
            // Apply the loaded data to the now-initialized UI
            console.log('🎯 Applying saved data to UI...');
            await this.applySavedDataToUI();
            
            // Initialize debug mode
            console.log('🐛 Initializing debug mode...');
            this.initializeDebugMode();
            
            console.log('🎉 Initialization completed successfully!');
        } catch (error) {
            console.error('💥 Initialization failed:', error);
            console.error('Stack:', error.stack);
        }
    }
    
    async waitForScripts() {
        // Skip waiting - directly initialize without checking
        console.log('Skipping script loading wait');
        return;
    }

    async loadSavedDataForInitialization() {
        console.log('🔄 Loading saved data before UI initialization...');
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                const result = await chrome.storage.local.get(['formData']);
                if (result.formData) {
                    const data = result.formData;
                    
                    // Pre-load the data we need for intelligent UI initialization
                    if (data.selectedThemes) {
                        this.selectedThemes = data.selectedThemes;
                        console.log('📥 Pre-loaded themes:', this.selectedThemes.length);
                    }
                    
                    if (data.selectedGenres) {
                        this.selectedGenres = data.selectedGenres;
                        console.log('📥 Pre-loaded genres:', this.selectedGenres.length);
                    }
                    
                    if (data.currentKeyType) {
                        this.currentKeyType = data.currentKeyType;
                    }
                    
                    if (data.songParts) {
                        this.songParts = data.songParts;
                    }
                    
                    console.log('✅ Saved data loaded successfully before UI initialization');
                } else {
                    console.log('🆕 No saved data found - starting fresh');
                }
            } else {
                console.log('⚠️ Chrome storage not available, skipping data pre-load');
            }
        } catch (error) {
            console.error('⚠️ Failed to load saved data:', error);
        }
    }

    async applySavedDataToUI() {
        console.log('🎨 Applying saved data to initialized UI...');
        try {
            const result = await chrome.storage.local.get(['formData']);
            if (result.formData) {
                const data = result.formData;
                
                // Apply basic form values
                document.getElementById('theme').value = data.theme || '';
                document.getElementById('keywords').value = data.keywords || '';
                document.getElementById('bpm').value = data.bpm || 120;
                document.getElementById('bpmValue').textContent = data.bpm || 120;
                document.getElementById('key').value = data.key || 'C Major';
                document.getElementById('languageRatio').value = data.languageRatio || 50;
                document.getElementById('default_vocal_style').value = data.default_vocal_style || 'Female Solo';
                document.getElementById('instruments').value = data.instruments || '';
                document.getElementById('song_structure').value = data.song_structure || 'detailed';
                document.getElementById('apiModel').value = data.apiModel || 'gpt-4.1-mini';
                
                // Update UI states for pre-loaded data
                this.updateSelectedThemesDisplay();
                this.updateThemeButtonStates();
                
                this.updateSelectedGenresDisplay();
                this.updateGenreButtonStates(); // This should now work correctly since UI was built with correct expansion state
                
                // Restore language slider
                const languageSlider = document.getElementById('languageRatio');
                if (languageSlider) {
                    languageSlider.dispatchEvent(new Event('input'));
                }
                
                // Restore key type
                if (data.currentKeyType) {
                    const keyTypeBtn = document.querySelector(`.key-type-btn[data-type="${data.currentKeyType}"]`);
                    if (keyTypeBtn) {
                        document.querySelectorAll('.key-type-btn').forEach(btn => btn.classList.remove('active'));
                        keyTypeBtn.classList.add('active');
                        // Update key selection manually instead of calling undefined method
                        this.currentKeyType = data.currentKeyType;
                        this.updateKeyOptions();
                    }
                }
                
                console.log('✅ UI state applied successfully');
            }
        } catch (error) {
            console.error('⚠️ Failed to apply saved data to UI:', error);
        }
    }

    // ===== API Key Management =====
    async loadApiKey() {
        try {
            // Chrome storage APIが利用可能かチェック
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                const result = await chrome.storage.sync.get(['openaiApiKey']);
                if (result.openaiApiKey) {
                    try {
                        // De-obfuscate the stored key
                        this.openaiApiKey = atob(result.openaiApiKey);
                    } catch (e) {
                        // Handle legacy unobfuscated keys
                        this.openaiApiKey = result.openaiApiKey;
                    }
                    const apiKeyElement = document.getElementById('apiKey');
                    if (apiKeyElement) {
                        apiKeyElement.value = this.openaiApiKey;
                    }
                    this.updateKeyStatus('valid', 'API キーが保存されています');
                }
            } else {
                console.log('Chrome storage API not available, skipping API key load');
            }
        } catch (error) {
            console.error('Failed to load API key:', error);
        }
    }

    async saveApiKey() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                // Simple obfuscation for storage (not true encryption, but better than plain text)
                const obfuscatedKey = btoa(this.openaiApiKey);
                await chrome.storage.sync.set({ openaiApiKey: obfuscatedKey });
                this.updateKeyStatus('valid', 'API キーが保存されました');
            } else {
                console.log('Chrome storage API not available, API key not saved');
                this.updateKeyStatus('valid', 'API キーが設定されました（保存は無効）');
            }
        } catch (error) {
            console.error('Failed to save API key:', error);
            if (error.message.includes('Extension context invalidated')) {
                this.updateKeyStatus('warning', 'API キーが設定されました（拡張機能を再読み込みしてください）');
                
                // 一度だけ警告を表示
                if (!this.contextInvalidatedWarned) {
                    this.contextInvalidatedWarned = true;
                    this.showContextInvalidatedMessage();
                }
            } else {
                this.updateKeyStatus('invalid', 'API キーの保存に失敗しました');
            }
        }
    }

    updateKeyStatus(status, message) {
        const statusElement = document.getElementById('key-status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `key-status ${status}`;
        } else {
            console.log(`API Key Status: ${status} - ${message}`);
        }
    }

    validateApiKey(key) {
        return key && key.startsWith('sk-') && key.length > 20;
    }

    // ===== Theme Management =====
    initializeThemeSelection() {
        const themeContainer = document.getElementById('themeCategories');
        const presetContainer = document.getElementById('presetThemeContainer');
        const customContainer = document.getElementById('customThemeContainer');
        
        // DOM要素の存在確認
        if (!themeContainer) {
            console.error('❌ themeCategories element not found');
            return;
        }
        
        if (!presetContainer || !customContainer) {
            console.error('❌ Theme container elements not found');
            return;
        }
        
        console.log('✅ Theme DOM elements found, initializing combined theme mode...');
        
        // 両方のコンテナを常に表示（組み合わせモード）
        presetContainer.style.display = 'block';
        customContainer.style.display = 'block';
        
        // isCustomThemeを削除し、組み合わせモードに変更
        this.isCustomTheme = false; // 基本はプリセット主体
        
        // Generate theme categories
        Object.entries(THEME_CATEGORIES).forEach(([categoryId, category]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'theme-category collapsed';
            
            const titleDiv = document.createElement('div');
            titleDiv.className = 'theme-category-title';
            titleDiv.style.borderLeft = `4px solid ${category.color}`;
            titleDiv.style.paddingLeft = '8px';
            
            const titleText = document.createElement('span');
            titleText.textContent = category.name;
            
            const toggleIcon = document.createElement('span');
            toggleIcon.className = 'toggle-icon';
            toggleIcon.textContent = '▼';
            
            titleDiv.appendChild(titleText);
            titleDiv.appendChild(toggleIcon);
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'theme-category-content';
            
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'theme-buttons';
            
            // Add themes to category
            category.themes.forEach(themeId => {
                const themeData = THEME_PRESETS[themeId];
                if (themeData) {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'theme-btn';
                    button.textContent = this.getThemeDisplayName(themeId);
                    button.setAttribute('data-theme-id', themeId);
                    button.setAttribute('title', themeData.theme.substring(0, 100) + '...');
                    
                    button.addEventListener('click', () => this.toggleTheme(themeId));
                    buttonsDiv.appendChild(button);
                }
            });
            
            contentDiv.appendChild(buttonsDiv);
            
            // Toggle functionality
            titleDiv.addEventListener('click', () => {
                if (categoryDiv.classList.contains('has-selected')) {
                    return;
                }
                categoryDiv.classList.toggle('collapsed');
            });
            
            categoryDiv.appendChild(titleDiv);
            categoryDiv.appendChild(contentDiv);
            themeContainer.appendChild(categoryDiv);
        });
    }

    getThemeDisplayName(themeId) {
        const displayNames = {
            // 都市・現代生活系
            digital_detox: '🌃 デジタル・デトックス',
            urban_solitude: '🏙️ 都市の孤独',
            office_escape: '🏢 オフィス脱出',
            crowded_station: '🚉 満員駅',
            late_night_convenience: '🏪 深夜コンビニ',
            rooftop_view: '🏔️ 屋上の眺め',
            
            // 恋愛・人間関係系
            nostalgic_love: '💕 ノスタルジック・ラブ',
            first_crush: '💓 初恋',
            long_distance: '📱 遠距離恋愛',
            coffee_shop_meeting: '☕ カフェ再会',
            text_message_love: '💬 メッセージ恋愛',
            summer_festival: '🎆 夏祭り',
            
            // 季節・自然系
            spring_awakening: '🌸 春の目覚め',
            summer_night: '🌊 夏の夜',
            autumn_leaves: '🍂 紅葉',
            winter_solitude: '❄️ 冬の孤独',
            rainy_reflection: '🌧️ 雨の日の内省',
            morning_sunshine: '☀️ 朝の陽射し',
            
            // 成長・人生系
            coming_of_age: '🌱 成長と自立',
            quarter_life_crisis: '🤔 人生の迷い',
            dream_chaser: '✨ 夢追い人',
            self_acceptance: '🤗 自己受容',
            independence: '🗝️ 独立',
            
            // 旅・冒険系
            midnight_drive: '🚗 深夜ドライブ',
            train_journey: '🚃 電車の旅',
            airport_departure: '✈️ 空港出発',
            backpack_adventure: '🎒 バックパック冒険',
            lighthouse_beacon: '🗼 灯台の光',
            
            // 夢・幻想系
            lucid_dream: '💭 明晰夢',
            stargazing: '⭐ 星空観測',
            magic_hour: '🌅 マジックアワー',
            parallel_universe: '🌌 パラレル宇宙',
            
            // 社会・時代系
            social_media_fatigue: '📱 SNS疲れ',
            remote_work_isolation: '💻 リモート孤独',
            climate_anxiety: '🌍 環境不安',
            generation_gap: '👥 世代間ギャップ',
            
            // 癒し・内省系
            meditation_moment: '🧘 瞑想の時間',
            forest_therapy: '🌲 森林療法',
            hot_spring_serenity: '♨️ 温泉の安らぎ',
            yoga_flow: '🧘‍♀️ ヨガフロー',
            
            // 創造・芸術系
            creative_flow: '🎨 創造的フロー',
            art_gallery_visit: '🖼️ 美術館訪問',
            music_discovery: '🎵 音楽発見',
            street_performance: '🎭 ストリート演奏',
            
            // 男性視点恋愛系
            guy_shy_confession: '😊 内気な告白',
            protective_instinct: '🛡️ 守る本能',
            male_vulnerability: '💭 男性の弱さ',
            guy_heartbreak: '💔 男性の失恋',
            jealous_boyfriend: '😤 嫉妬心',
            commitment_fear: '😰 コミット恐怖',
            providing_pressure: '💪 養う責任',
            emotional_walls: '🧱 感情の壁',
            guy_first_love: '💕 男性の初恋',
            midnight_thinking: '🌙 深夜の想い',
            
            // 女性視点恋愛系
            girl_intuition: '✨ 女性の直感',
            emotional_support: '🤗 感情サポート',
            independence_vs_love: '⚖️ 自立VS恋愛',
            female_strength: '💪 女性の強さ',
            nurturing_love: '🌱 育む愛',
            girl_heartbreak: '💔 女性の失恋',
            romantic_dreams: '💭 ロマンチックな夢',
            emotional_expression: '🎭 感情表現',
            girl_confidence: '✨ 女性の自信',
            maternal_feelings: '🤱 母性的感情',
            
            // 共通恋愛体験系
            silent_understanding: '👁️ 無言の理解',
            long_distance_longing: '📱 遠距離の想い',
            social_media_checking: '📱 SNSチェック',
            gift_giving_anxiety: '🎁 プレゼント不安',
            meeting_parents: '👨‍👩‍👧 両親挨拶',
            unrequited_love: '💔 片思い',
            confession_moment: '💖 告白の瞬間',
            new_relationship: '💕 新しい関係',
            honeymoon_phase: '🍯 蜜月期',
            relationship_doubt: '❓ 関係の疑問'
        };
        
        return displayNames[themeId] || themeId;
    }

    toggleTheme(themeId) {
        const button = document.querySelector(`[data-theme-id="${themeId}"]`);
        
        if (this.selectedThemes.includes(themeId)) {
            this.selectedThemes = this.selectedThemes.filter(id => id !== themeId);
            button.classList.remove('selected');
        } else {
            this.selectedThemes.push(themeId);
            button.classList.add('selected');
        }
        
        this.updateSelectedThemesDisplay();
        this.updateThemeButtonStates();
        
        if (this.selectedThemes.length > 0) {
            this.applyThemeSettings();
        } else {
            document.getElementById('keywords').value = '';
        }
        
        this.saveCurrentInput();
    }

    updateSelectedThemesDisplay() {
        const selectedList = document.getElementById('selectedThemesList');
        selectedList.innerHTML = '';
        
        this.selectedThemes.forEach(themeId => {
            const item = document.createElement('div');
            item.className = 'selected-theme-item';
            
            const name = document.createElement('span');
            name.textContent = this.getThemeDisplayName(themeId);
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'selected-theme-remove';
            removeBtn.textContent = '×';
            removeBtn.addEventListener('click', () => this.toggleTheme(themeId));
            
            item.appendChild(name);
            item.appendChild(removeBtn);
            selectedList.appendChild(item);
        });
    }

    updateThemeButtonStates() {
        const buttons = document.querySelectorAll('.theme-btn');
        buttons.forEach(button => {
            const themeId = button.getAttribute('data-theme-id');
            const isSelected = this.selectedThemes.includes(themeId);
            button.classList.toggle('selected', isSelected);
        });
        
        // Update category states
        document.querySelectorAll('.theme-category').forEach(category => {
            const categoryButtons = category.querySelectorAll('.theme-btn');
            const hasSelected = Array.from(categoryButtons).some(btn => btn.classList.contains('selected'));
            category.classList.toggle('has-selected', hasSelected);
            
            if (hasSelected) {
                category.classList.remove('collapsed');
            }
        });
    }

    applyThemeSettings() {
        if (this.selectedThemes.length === 0) return;
        
        const primaryTheme = THEME_PRESETS[this.selectedThemes[0]];
        if (!primaryTheme) return;
        
        // Apply form settings
        document.getElementById('bpm').value = primaryTheme.bpm;
        document.getElementById('bpmValue').textContent = primaryTheme.bpm;
        document.getElementById('key').value = primaryTheme.key;
        
        // Combine keywords from all selected themes
        const allKeywords = this.selectedThemes.map(themeId => {
            const theme = THEME_PRESETS[themeId];
            return theme ? theme.keywords : '';
        }).filter(k => k).join(', ');
        
        document.getElementById('keywords').value = allKeywords;
        
        // Apply genres (max 3)
        const allGenres = [];
        this.selectedThemes.forEach(themeId => {
            const theme = THEME_PRESETS[themeId];
            if (theme && theme.genres) {
                theme.genres.forEach(genreName => {
                    if (!allGenres.find(g => g.name === genreName) && allGenres.length < 3) {
                        const genre = MUSIC_GENRES.find(g => g.name === genreName);
                        if (genre) allGenres.push(genre);
                    }
                });
            }
        });
        
        this.selectedGenres = allGenres;
        this.updateSelectedGenresDisplay();
        this.updateGenreButtonStates();
        
        // Update genre button states
        document.querySelectorAll('.genre-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        this.selectedGenres.forEach(genre => {
            const button = document.querySelector(`[data-genre-id="${genre.id}"]`);
            if (button) button.classList.add('selected');
        });
    }

    // ===== Genre Management =====
    initializeGenreSelection() {
        const genreContainer = document.getElementById('genreCategories');
        
        // DOM要素の存在確認
        if (!genreContainer) {
            console.error('❌ genreCategories element not found');
            return;
        }
        
        console.log('✅ Genre DOM elements found, initializing...');
        
        // 🎯 Check which categories should start expanded based on pre-loaded data
        const categoriesToExpand = new Set();
        this.selectedGenres.forEach(genre => {
            if (genre.category) {
                categoriesToExpand.add(genre.category);
            }
        });
        
        console.log('📂 Categories to start expanded:', Array.from(categoriesToExpand));
        
        Object.entries(GENRE_CATEGORIES).forEach(([categoryId, category]) => {
            const categoryDiv = document.createElement('div');
            const shouldExpand = categoriesToExpand.has(categoryId);
            categoryDiv.className = `genre-category ${shouldExpand ? '' : 'collapsed'}`;
            categoryDiv.setAttribute('data-category-id', categoryId);
            
            console.log(`📁 ${categoryId}: ${shouldExpand ? 'EXPANDED' : 'collapsed'}`);
            
            if (shouldExpand) {
                categoryDiv.classList.add('has-selected');
            }
            
            const titleDiv = document.createElement('div');
            titleDiv.className = 'genre-category-title';
            titleDiv.style.borderLeft = `4px solid ${category.color}`;
            titleDiv.style.paddingLeft = '8px';
            
            const titleText = document.createElement('span');
            titleText.textContent = category.name;
            
            const toggleIcon = document.createElement('span');
            toggleIcon.className = 'toggle-icon';
            toggleIcon.textContent = '▼';
            
            titleDiv.appendChild(titleText);
            titleDiv.appendChild(toggleIcon);
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'genre-category-content';
            
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'genre-buttons';
            
            // Add genres to category
            const categoryGenres = MUSIC_GENRES.filter(genre => genre.category === categoryId);
            categoryGenres.forEach(genre => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'genre-btn';
                button.textContent = genre.name;
                button.setAttribute('data-genre-id', genre.id);
                button.setAttribute('title', genre.description);
                
                button.addEventListener('click', () => this.toggleGenre(genre));
                buttonsDiv.appendChild(button);
            });
            
            contentDiv.appendChild(buttonsDiv);
            
            // Toggle functionality
            titleDiv.addEventListener('click', () => {
                if (categoryDiv.classList.contains('has-selected')) {
                    return;
                }
                categoryDiv.classList.toggle('collapsed');
            });
            
            categoryDiv.appendChild(titleDiv);
            categoryDiv.appendChild(contentDiv);
            genreContainer.appendChild(categoryDiv);
        });
    }

    toggleGenre(genre) {
        const button = document.querySelector(`[data-genre-id="${genre.id}"]`);
        
        if (this.selectedGenres.find(g => g.id === genre.id)) {
            this.selectedGenres = this.selectedGenres.filter(g => g.id !== genre.id);
            button.classList.remove('selected');
        } else {
            if (this.selectedGenres.length < 3) {
                this.selectedGenres.push(genre);
                button.classList.add('selected');
            }
        }
        
        this.updateSelectedGenresDisplay();
        this.updateGenreButtonStates();
        this.expandGenreCategoriesWithSelected();
        this.saveCurrentInput();
    }

    updateSelectedGenresDisplay() {
        const selectedList = document.getElementById('selectedGenresList');
        selectedList.innerHTML = '';
        
        this.selectedGenres.forEach(genre => {
            const item = document.createElement('div');
            item.className = 'selected-genre-item';
            
            const name = document.createElement('span');
            name.textContent = genre.name;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'selected-genre-remove';
            removeBtn.textContent = '×';
            removeBtn.addEventListener('click', () => this.toggleGenre(genre));
            
            item.appendChild(name);
            item.appendChild(removeBtn);
            selectedList.appendChild(item);
        });
    }

    updateGenreButtonStates() {
        // First, update selected states for all buttons
        const buttons = document.querySelectorAll('.genre-btn');
        buttons.forEach(button => {
            button.classList.remove('selected');
        });
        
        // Add selected class to currently selected genres
        this.selectedGenres.forEach(genre => {
            const button = document.querySelector(`[data-genre-id="${genre.id}"]`);
            if (button) {
                button.classList.add('selected');
            }
        });
        
        // Update disabled states
        buttons.forEach(button => {
            const isSelected = button.classList.contains('selected');
            const isDisabled = this.selectedGenres.length >= 3 && !isSelected;
            
            button.classList.toggle('disabled', isDisabled);
        });
        
        // Update category states
        document.querySelectorAll('.genre-category').forEach(category => {
            const categoryButtons = category.querySelectorAll('.genre-btn');
            const hasSelected = Array.from(categoryButtons).some(btn => btn.classList.contains('selected'));
            category.classList.toggle('has-selected', hasSelected);
            
            if (hasSelected) {
                category.classList.remove('collapsed');
            }
        });
    }

    // ===== Key Selection =====
    initializeKeySelection() {
        const keyTypeButtons = document.querySelectorAll('.key-type-btn');
        const keySelect = document.getElementById('key');
        
        keyTypeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const type = button.getAttribute('data-type');
                this.currentKeyType = type;
                
                keyTypeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                this.updateKeyOptions();
            });
        });
        
        this.updateKeyOptions();
    }

    updateKeyOptions() {
        const keySelect = document.getElementById('key');
        keySelect.innerHTML = '';
        
        const keys = MUSICAL_KEYS.filter(key => key.category === this.currentKeyType);
        keys.forEach(key => {
            const option = document.createElement('option');
            option.value = key.name;
            option.textContent = `${key.name} (${key.notation})`;
            option.setAttribute('title', key.description);
            keySelect.appendChild(option);
        });
        
        // Set default value
        if (this.currentKeyType === 'major' && keySelect.querySelector('option[value="C Major"]')) {
            keySelect.value = 'C Major';
        } else if (this.currentKeyType === 'minor' && keySelect.querySelector('option[value="A Minor"]')) {
            keySelect.value = 'A Minor';
        }
    }

    // ===== Language Slider =====
    initializeLanguageSlider() {
        const slider = document.getElementById('languageRatio');
        const text = document.getElementById('languageRatioText');
        const description = document.getElementById('languageDescription');
        
        slider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            const englishRatio = value;
            const japaneseRatio = 100 - value;
            
            text.textContent = `Japanese ${japaneseRatio}% - English ${englishRatio}%`;
            
            // Update description
            if (value === 0) {
                description.textContent = '完全に日本語の構成';
            } else if (value === 100) {
                description.textContent = '完全に英語の構成';
            } else if (value < 25) {
                description.textContent = '主に日本語、部分的に英語';
            } else if (value < 50) {
                description.textContent = '日本語メイン、英語のアクセント';
            } else if (value === 50) {
                description.textContent = '日本語と英語が半々の構成';
            } else if (value < 75) {
                description.textContent = '英語メイン、日本語のアクセント';
            } else {
                description.textContent = '主に英語、部分的に日本語';
            }
        });
    }

    // ===== BPM Slider =====
    initializeBPMSlider() {
        const bpmSlider = document.getElementById('bpm');
        const bpmValue = document.getElementById('bpmValue');
        
        if (bpmSlider && bpmValue) {
            bpmSlider.addEventListener('input', (e) => {
                bpmValue.textContent = e.target.value;
                this.saveCurrentInput();
            });
        }
    }

    // ===== Song Structure =====
    initializeSongStructure() {
        const structureSelect = document.getElementById('song_structure');
        const customGroup = document.getElementById('customStructureGroup');
        
        structureSelect.addEventListener('change', (e) => {
            const selectedTemplate = e.target.value;
            if (selectedTemplate === 'custom') {
                customGroup.style.display = 'block';
                this.initializeCustomStructureBuilder();
            } else {
                customGroup.style.display = 'none';
                this.generatePartsFromTemplate(selectedTemplate);
            }
        });
    }

    initializeCustomStructureBuilder() {
        const structureButtons = document.querySelectorAll('.structure-btn');
        const clearBtn = document.getElementById('clearSequence');
        const undoBtn = document.getElementById('undoLast');
        
        structureButtons.forEach(button => {
            button.addEventListener('click', () => {
                const section = button.getAttribute('data-section');
                this.addToSequence(section);
            });
        });
        
        clearBtn.addEventListener('click', () => {
            this.customStructureSequence = [];
            this.updateSequenceDisplay();
        });
        
        undoBtn.addEventListener('click', () => {
            if (this.customStructureSequence.length > 0) {
                this.customStructureSequence.pop();
                this.updateSequenceDisplay();
            }
        });
    }

    addToSequence(section) {
        this.customStructureSequence.push(section);
        this.updateSequenceDisplay();
    }

    updateSequenceDisplay() {
        const sequenceDisplay = document.getElementById('sequenceDisplay');
        const hiddenInput = document.getElementById('custom_structure');
        
        if (!sequenceDisplay || !hiddenInput) return;
        
        if (this.customStructureSequence.length === 0) {
            sequenceDisplay.innerHTML = '<div class="sequence-placeholder">ボタンをクリックして構成を組み立ててください</div>';
            hiddenInput.value = '';
        } else {
            sequenceDisplay.innerHTML = '';
            this.customStructureSequence.forEach((section, index) => {
                const item = document.createElement('div');
                item.className = 'sequence-item';
                
                const text = document.createElement('span');
                text.textContent = section;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'sequence-item-remove';
                removeBtn.textContent = '×';
                removeBtn.addEventListener('click', () => {
                    this.customStructureSequence.splice(index, 1);
                    this.updateSequenceDisplay();
                });
                
                item.appendChild(text);
                item.appendChild(removeBtn);
                sequenceDisplay.appendChild(item);
            });
            
            hiddenInput.value = this.customStructureSequence.join('-');
        }
    }

    // ===== Song Parts Management =====
    initializeSongParts() {
        const structureSelect = document.getElementById('song_structure');
        const addPartBtn = document.getElementById('addPartBtn');
        const defaultVocalSelect = document.getElementById('default_vocal_style');
        
        // Structure template selection
        structureSelect.addEventListener('change', (e) => {
            const selectedTemplate = e.target.value;
            if (selectedTemplate !== 'custom') {
                this.generatePartsFromTemplate(selectedTemplate);
            }
        });
        
        // Add part button
        addPartBtn.addEventListener('click', () => {
            this.addNewPart();
        });
        
        // Default vocal style change
        defaultVocalSelect.addEventListener('change', (e) => {
            const newVocalStyle = e.target.value;
            this.songParts.forEach(part => {
                part.vocal = newVocalStyle;
            });
            this.renderSongParts();
            this.saveCurrentInput();
        });
        
        // Generate initial parts
        this.generatePartsFromTemplate('detailed');
    }

    generatePartsFromTemplate(template) {
        const templates = {
            'detailed': ['Intro', 'Verse', 'Pre-Chorus', 'Chorus', 'Verse', 'Pre-Chorus', 'Chorus', 'Bridge', 'Final', 'Outro'],
            'simple': ['Verse', 'Chorus', 'Verse', 'Chorus', 'Bridge', 'Chorus'],
            'ballad': ['Intro', 'Verse', 'Chorus', 'Verse', 'Chorus', 'Bridge', 'Chorus', 'Final', 'Outro'],
            'pop_anthem': ['Intro', 'Verse', 'Pre-Chorus', 'Chorus', 'Verse', 'Pre-Chorus', 'Chorus', 'Bridge', 'Final-Chorus', 'Outro'],
            'electronic_dance': ['Intro', 'Build', 'Drop', 'Verse', 'Pre-Drop', 'Drop', 'Breakdown', 'Drop', 'Outro'],
            'rock_progressive': ['Intro', 'Verse', 'Chorus', 'Verse', 'Chorus', 'Solo', 'Bridge', 'Chorus', 'Final', 'Outro']
        };
        
        const defaultVocal = document.getElementById('default_vocal_style').value;
        const parts = templates[template] || templates['detailed'];
        
        this.songParts = [];
        this.partIdCounter = 0;
        
        parts.forEach((partName, index) => {
            const part = {
                id: this.partIdCounter++,
                name: partName,
                vocal: defaultVocal,
                energy: this.getDefaultEnergyForPart(partName),
                instruction: ''
            };
            this.songParts.push(part);
        });
        
        this.renderSongParts();
    }

    addNewPart() {
        const defaultVocal = document.getElementById('default_vocal_style').value;
        const part = {
            id: this.partIdCounter++,
            name: 'Verse',
            vocal: defaultVocal,
            energy: this.getDefaultEnergyForPart('Verse'),
            instruction: ''
        };
        this.songParts.push(part);
        this.renderSongParts();
    }

    deletePart(partId) {
        this.songParts = this.songParts.filter(part => part.id !== partId);
        this.renderSongParts();
    }

    movePartUp(partId) {
        const index = this.songParts.findIndex(part => part.id === partId);
        if (index > 0) {
            this.animateCardSwap(partId, this.songParts[index - 1].id, 'up', () => {
                [this.songParts[index - 1], this.songParts[index]] = [this.songParts[index], this.songParts[index - 1]];
                this.renderSongParts();
            });
        }
    }

    movePartDown(partId) {
        const index = this.songParts.findIndex(part => part.id === partId);
        if (index < this.songParts.length - 1) {
            this.animateCardSwap(partId, this.songParts[index + 1].id, 'down', () => {
                [this.songParts[index], this.songParts[index + 1]] = [this.songParts[index + 1], this.songParts[index]];
                this.renderSongParts();
            });
        }
    }

    animateCardSwap(movingPartId, targetPartId, direction, callback) {
        const movingCard = document.querySelector(`[data-part-id="${movingPartId}"]`).closest('.song-part-card');
        const targetCard = document.querySelector(`[data-part-id="${targetPartId}"]`).closest('.song-part-card');
        
        if (!movingCard || !targetCard) {
            callback();
            return;
        }

        // 両方のカードの位置を取得
        const movingRect = movingCard.getBoundingClientRect();
        const targetRect = targetCard.getBoundingClientRect();
        
        // 移動距離を計算
        const movingDistance = targetRect.top - movingRect.top;
        const targetDistance = movingRect.top - targetRect.top;

        // 両方のカードに移動中スタイルを適用
        movingCard.classList.add('swapping');
        targetCard.classList.add('swapping');
        
        // トランスフォームで同時に移動
        movingCard.style.transform = `translateY(${movingDistance}px)`;
        targetCard.style.transform = `translateY(${targetDistance}px)`;
        
        // Z-indexで重なり順を制御
        movingCard.style.zIndex = '100';
        targetCard.style.zIndex = '99';

        // アニメーション完了後にデータ移動とDOM更新
        setTimeout(() => {
            // スタイルをリセット
            movingCard.classList.remove('swapping');
            targetCard.classList.remove('swapping');
            movingCard.style.transform = '';
            targetCard.style.transform = '';
            movingCard.style.zIndex = '';
            targetCard.style.zIndex = '';
            
            // データ更新とDOM再描画
            callback();
            
            // 新しい位置でハイライト効果
            setTimeout(() => {
                const newMovingCard = document.querySelector(`[data-part-id="${movingPartId}"]`).closest('.song-part-card');
                if (newMovingCard) {
                    newMovingCard.classList.add('highlight-swap');
                    setTimeout(() => {
                        newMovingCard.classList.remove('highlight-swap');
                    }, 500);
                }
            }, 50);
        }, 500);
    }

    updatePart(partId, field, value) {
        const part = this.songParts.find(p => p.id === partId);
        if (part) {
            part[field] = value;
            
            if (field === 'energy') {
                this.updateEnergyDisplay(partId, value);
            }
        }
    }

    updateEnergyDisplay(partId, energy) {
        const partCard = document.querySelector(`[data-part-id="${partId}"]`);
        if (partCard) {
            const energyBars = partCard.querySelector('.energy-bars');
            const energySpan = partCard.querySelector('.energy-display span');
            
            if (energyBars) {
                energyBars.innerHTML = this.generateEnergyBars(energy);
            }
            if (energySpan) {
                energySpan.textContent = `${energy}/10`;
            }
        }
    }


    generatePartCard(part, index) {
        const vocalStyles = [
            'Male Solo', 'Female Solo', 'Male & Female Duet', 'Female & Female Duet',
            'Male & Male Duet', 'Mixed Choir', 'Male Choir', 'Female Choir',
            'Solo with Backup', 'Call and Response', 'Rap with Singing', 'Instrumental'
        ];
        
        const partNameOptions = [
            'Intro', 'Verse', 'Pre-Chorus', 'Chorus', 'Bridge', 'Solo', 'Break',
            'Drop', 'Build', 'Climax', 'Interlude', 'Tag', 'Outro', 'Final',
            'Breakdown', 'Pre-Drop', 'Hook', 'Refrain', 'Coda'
        ];
        
        const vocalOptions = vocalStyles.map(style => 
            `<option value="${style}" ${part.vocal === style ? 'selected' : ''}>${style}</option>`
        ).join('');
        
        const partNameOptionsHtml = partNameOptions.map(name => 
            `<option value="${name}" ${part.name === name ? 'selected' : ''}>${name}</option>`
        ).join('');
        
        return `
            <div class="song-part-card" data-part-id="${part.id}">
                <div class="song-part-header">
                    <div class="song-part-title">
                        <span>${index + 1}.</span>
                        <select data-part-id="${part.id}" data-action="updatePartName"
                                style="border: none; background: none; font-size: 1.1rem; font-weight: 600; color: #333; min-width: 120px;">
                            ${partNameOptionsHtml}
                        </select>
                    </div>
                    <div class="song-part-actions">
                        <button type="button" class="song-part-action-btn" data-part-id="${part.id}" data-action="movePartUp"
                                ${index === 0 ? 'disabled' : ''}>⬆️</button>
                        <button type="button" class="song-part-action-btn" data-part-id="${part.id}" data-action="movePartDown"
                                ${index === this.songParts.length - 1 ? 'disabled' : ''}>⬇️</button>
                        <button type="button" class="song-part-action-btn delete" data-part-id="${part.id}" data-action="deletePart">🗑️</button>
                    </div>
                </div>
                <div class="song-part-content">
                    <div class="song-part-inline-fields">
                        <div class="song-part-field-inline">
                            <label>Vocal Style</label>
                            <select data-part-id="${part.id}" data-action="updatePartVocal">
                                ${vocalOptions}
                            </select>
                        </div>
                        <div class="song-part-field-inline">
                            <label>Energy Level</label>
                            <div class="energy-control">
                                <input type="range" min="1" max="10" value="${part.energy}" 
                                       data-part-id="${part.id}" data-action="updatePartEnergy"
                                       class="energy-slider">
                                <span class="energy-value">${part.energy}/10</span>
                            </div>
                        </div>
                    </div>
                    <div class="song-part-instruction">
                        <label class="instruction-toggle" data-part-id="${part.id}">
                            <span>Special Instructions</span>
                            <span class="toggle-icon">▼</span>
                        </label>
                        <textarea class="instruction-field collapsed" placeholder="このパートに対する特別な指示を入力してください..." 
                                  data-part-id="${part.id}" data-action="updatePartInstruction">${part.instruction}</textarea>
                    </div>
                </div>
            </div>
        `;
    }

    renderSongParts() {
        const container = document.getElementById('songPartsContainer');
        if (!container) {
            console.error('songPartsContainer not found');
            return;
        }
        
        if (!this.songParts || this.songParts.length === 0) {
            console.error('songParts is empty or undefined');
            return;
        }
        
        container.innerHTML = this.songParts.map((part, index) => this.generatePartCard(part, index)).join('');
        
        // Chrome Extension対応: data属性を使ったイベントリスナー設定
        this.attachSongPartEventListeners();
    }
    
    attachSongPartEventListeners() {
        const container = document.getElementById('songPartsContainer');
        
        // すべてのdata-actionを持つ要素にイベントリスナーを追加
        container.querySelectorAll('[data-action]').forEach(element => {
            const partId = parseInt(element.getAttribute('data-part-id'));
            const action = element.getAttribute('data-action');
            
            if (action === 'updatePartName' && element.tagName === 'SELECT') {
                element.addEventListener('change', (e) => {
                    this.updatePart(partId, 'name', e.target.value);
                });
            } else if (action === 'updatePartVocal' && element.tagName === 'SELECT') {
                element.addEventListener('change', (e) => {
                    this.updatePart(partId, 'vocal', e.target.value);
                });
            } else if (action === 'updatePartEnergy' && element.tagName === 'INPUT') {
                element.addEventListener('input', (e) => {
                    this.updatePart(partId, 'energy', e.target.value);
                    // エネルギー値をリアルタイム更新
                    const energyValue = e.target.parentNode.querySelector('.energy-value');
                    if (energyValue) {
                        energyValue.textContent = `${e.target.value}/10`;
                    }
                });
            } else if (action === 'updatePartInstruction' && element.tagName === 'TEXTAREA') {
                element.addEventListener('change', (e) => {
                    this.updatePart(partId, 'instruction', e.target.value);
                });
            } else if (action === 'movePartUp' && element.tagName === 'BUTTON') {
                element.addEventListener('click', () => {
                    this.movePartUp(partId);
                });
            } else if (action === 'movePartDown' && element.tagName === 'BUTTON') {
                element.addEventListener('click', () => {
                    this.movePartDown(partId);
                });
            } else if (action === 'deletePart' && element.tagName === 'BUTTON') {
                element.addEventListener('click', () => {
                    this.deletePart(partId);
                });
            }
        });
        
        // Special Instructions の折りたたみ機能
        container.querySelectorAll('.instruction-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const partId = parseInt(toggle.getAttribute('data-part-id'));
                const instructionField = container.querySelector(`textarea[data-part-id="${partId}"]`);
                const toggleIcon = toggle.querySelector('.toggle-icon');
                
                if (instructionField.classList.contains('collapsed')) {
                    instructionField.classList.remove('collapsed');
                    toggleIcon.textContent = '▲';
                } else {
                    instructionField.classList.add('collapsed');
                    toggleIcon.textContent = '▼';
                }
            });
        });
    }

    // ===== Instrument Selection =====
    initializeInstrumentSelection() {
        const instrumentCategoriesContainer = document.getElementById('instrumentCategories');
        
        if (!instrumentCategoriesContainer) {
            console.error('instrumentCategories container not found');
            return;
        }
        
        if (!window.INSTRUMENT_CATEGORIES) {
            console.log('INSTRUMENT_CATEGORIES not loaded, defining inline...');
            // Define inline as fallback
            window.INSTRUMENT_CATEGORIES = {
                keyboard: {
                    name: "🎹 鍵盤楽器",
                    color: "#667eea",
                    instruments: ["Piano", "Synthesizer", "Organ", "Rhodes", "Wurlitzer", "Accordion", "Melodica", "Harpsichord", "Celesta"]
                },
                strings: {
                    name: "🎸 弦楽器",
                    color: "#f093fb",
                    instruments: ["Guitar", "Electric Guitar", "Acoustic Guitar", "Bass", "Ukulele", "Violin", "Cello", "Viola", "Double Bass", "Banjo", "Mandolin", "Sitar", "Koto", "Erhu", "Harp"]
                },
                brass: {
                    name: "🎺 金管楽器",
                    color: "#4facfe",
                    instruments: ["Trumpet", "Trombone", "French Horn", "Tuba", "Flugelhorn", "Cornet"]
                },
                woodwind: {
                    name: "🎶 木管楽器", 
                    color: "#43e97b",
                    instruments: ["Saxophone", "Clarinet", "Flute", "Oboe", "Bassoon", "Recorder", "Piccolo", "Alto Sax", "Tenor Sax", "Baritone Sax"]
                },
                percussion: {
                    name: "🥁 打楽器",
                    color: "#fa709a",
                    instruments: ["Drums", "Percussion", "Tabla", "Bongos", "Congas", "Timpani", "Xylophone", "Marimba", "Steel Drums", "Cajon", "Djembe", "Kalimba"]
                },
                electronic: {
                    name: "🎛️ 電子楽器",
                    color: "#a8edea",
                    instruments: ["808 Drums", "TR-909", "Moog", "Theremin", "Vocoder", "Sampler", "Drum Machine", "Bass Synth", "Lead Synth", "Pad Synth"]
                },
                world: {
                    name: "🌍 民族楽器",
                    color: "#fda085",
                    instruments: ["Shakuhachi", "Shamisen", "Gamelan", "Bagpipes", "Didgeridoo", "Harmonica", "Ocarina", "Pan Flute", "Sitar", "Hang Drum"]
                },
                ensemble: {
                    name: "🎼 アンサンブル",
                    color: "#d299c2",
                    instruments: ["Orchestra", "String Quartet", "Brass Section", "Choir", "Jazz Band", "Rock Band", "Symphony", "Chamber Music"]
                }
            };
        }
        
        // Generate instrument categories
        Object.entries(window.INSTRUMENT_CATEGORIES).forEach(([categoryId, category]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'instrument-category collapsed';
            
            const titleDiv = document.createElement('div');
            titleDiv.className = 'instrument-category-title';
            titleDiv.style.borderLeft = `4px solid ${category.color}`;
            titleDiv.innerHTML = `
                <span>${category.name}</span>
                <span class="toggle-icon">▼</span>
            `;
            
            titleDiv.addEventListener('click', () => {
                categoryDiv.classList.toggle('collapsed');
            });
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'instrument-category-content';
            
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'instrument-buttons';
            
            category.instruments.forEach(instrument => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'instrument-btn';
                button.setAttribute('data-instrument', instrument);
                
                const details = window.INSTRUMENT_DETAILS?.[instrument];
                button.innerHTML = details ? `${details.emoji} ${instrument}` : `🎵 ${instrument}`;
                
                button.addEventListener('click', () => {
                    this.toggleInstrument(instrument);
                });
                
                buttonsDiv.appendChild(button);
            });
            
            contentDiv.appendChild(buttonsDiv);
            categoryDiv.appendChild(titleDiv);
            categoryDiv.appendChild(contentDiv);
            instrumentCategoriesContainer.appendChild(categoryDiv);
        });
        
        // Initialize text input auto-save and update button states
        const instrumentInput = document.getElementById('instruments');
        if (instrumentInput) {
            instrumentInput.addEventListener('input', () => {
                this.saveCurrentInput();
                this.updateInstrumentButtonStates();
                this.updateInstrumentCategoryStates();
            });
            
            // Initial button state update
            this.updateInstrumentButtonStates();
            this.updateInstrumentCategoryStates();
        }
    }

    toggleInstrument(instrument) {
        const instrumentInput = document.getElementById('instruments');
        const currentValue = instrumentInput.value.trim();
        const instruments = currentValue ? currentValue.split(',').map(i => i.trim()) : [];
        
        if (instruments.includes(instrument)) {
            // Remove instrument
            const newInstruments = instruments.filter(i => i !== instrument);
            instrumentInput.value = newInstruments.join(', ');
        } else {
            // Add instrument
            instruments.push(instrument);
            instrumentInput.value = instruments.join(', ');
        }
        
        this.saveCurrentInput();
        this.updateInstrumentButtonStates();
        this.updateInstrumentCategoryStates();
    }

    updateInstrumentButtonStates() {
        const instrumentInput = document.getElementById('instruments');
        if (!instrumentInput) return;
        
        const selectedInstruments = instrumentInput.value.trim() ? 
            instrumentInput.value.split(',').map(i => i.trim()) : [];
        
        // Update button states
        document.querySelectorAll('.instrument-btn').forEach(button => {
            const instrument = button.getAttribute('data-instrument');
            const isSelected = selectedInstruments.includes(instrument);
            
            if (isSelected) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });
    }

    updateInstrumentCategoryStates() {
        const instrumentInput = document.getElementById('instruments');
        if (!instrumentInput) return;
        
        const selectedInstruments = instrumentInput.value.trim() ? 
            instrumentInput.value.split(',').map(i => i.trim()) : [];
        
        if (selectedInstruments.length === 0) return;
        
        // Find which categories contain selected instruments
        const categoriesToExpand = new Set();
        
        Object.entries(window.INSTRUMENT_CATEGORIES || {}).forEach(([categoryId, category]) => {
            const hasSelectedInstrument = category.instruments.some(instrument => 
                selectedInstruments.includes(instrument)
            );
            
            if (hasSelectedInstrument) {
                categoriesToExpand.add(categoryId);
            }
        });
        
        // Expand categories that contain selected instruments
        document.querySelectorAll('.instrument-category').forEach((category, index) => {
            const categoryId = Object.keys(window.INSTRUMENT_CATEGORIES || {})[index];
            if (categoriesToExpand.has(categoryId)) {
                category.classList.remove('collapsed');
            }
        });
    }

    expandGenreCategoriesWithSelected() {
        // Expand genre categories that have selected items
        console.log('🔍 expandGenreCategoriesWithSelected called');
        console.log('   selectedGenres count:', this.selectedGenres.length);
        console.log('   selectedGenres data:', this.selectedGenres);
        
        if (this.selectedGenres.length === 0) {
            console.log('   No genres selected, skipping expansion');
            return;
        }
        
        const selectedCategoryIds = new Set();
        this.selectedGenres.forEach(genre => {
            console.log('   Processing genre:', genre);
            if (genre && genre.category) {
                selectedCategoryIds.add(genre.category);
                console.log(`   ✅ Added category: ${genre.category} for genre: ${genre.name}`);
            } else {
                console.log('   ⚠️ Genre missing category:', genre);
            }
        });
        
        console.log('   Selected category IDs:', Array.from(selectedCategoryIds));
        
        // Check if genre categories DOM is ready
        const allCategoryDivs = document.querySelectorAll('[data-category-id]');
        console.log('   Total category divs found:', allCategoryDivs.length);
        
        selectedCategoryIds.forEach(categoryId => {
            const categoryDiv = document.querySelector(`[data-category-id="${categoryId}"]`);
            console.log(`   Looking for category: ${categoryId}, found:`, !!categoryDiv);
            if (categoryDiv) {
                const wasCollapsed = categoryDiv.classList.contains('collapsed');
                console.log(`   Before expansion - collapsed: ${wasCollapsed}`);
                
                // Force expansion
                categoryDiv.classList.remove('collapsed');
                
                // Verify expansion worked
                const isStillCollapsed = categoryDiv.classList.contains('collapsed');
                console.log(`   After expansion - collapsed: ${isStillCollapsed}`);
                console.log(`   ${wasCollapsed ? '📂' : '📁'} Category ${categoryId}: ${wasCollapsed && !isStillCollapsed ? 'successfully expanded' : wasCollapsed ? 'expansion failed' : 'was already expanded'}`);
                
                // Also update toggle icon
                const toggleIcon = categoryDiv.querySelector('.toggle-icon');
                if (toggleIcon && !isStillCollapsed) {
                    toggleIcon.textContent = '▼';
                    console.log(`   🔄 Updated toggle icon for ${categoryId}`);
                }
            } else {
                console.log(`   ❌ Category element not found: ${categoryId}`);
            }
        });
    }

    expandThemeCategoriesWithSelected() {
        // Expand theme categories that have selected items
        const selectedCategoryIds = new Set();
        this.selectedThemes.forEach(themeId => {
            // Find which category this theme belongs to
            Object.entries(window.THEME_CATEGORIES || {}).forEach(([categoryId, categoryData]) => {
                if (categoryData.themes && categoryData.themes.includes(themeId)) {
                    selectedCategoryIds.add(categoryId);
                }
            });
        });
        
        selectedCategoryIds.forEach(categoryId => {
            const categoryDiv = document.querySelector(`[data-theme-category-id="${categoryId}"]`);
            if (categoryDiv) {
                categoryDiv.classList.remove('collapsed');
            }
        });
    }

    // ===== Event Listeners =====
    initializeEventListeners() {
        // API Key events
        const apiKeyInput = document.getElementById('apiKey');
        const toggleKeyBtn = document.getElementById('toggleApiKey');
        
        apiKeyInput.addEventListener('input', (e) => {
            this.openaiApiKey = e.target.value;
            if (this.validateApiKey(this.openaiApiKey)) {
                this.saveApiKey();
            } else {
                this.updateKeyStatus('invalid', '無効なAPIキー形式です');
            }
        });
        
        toggleKeyBtn.addEventListener('click', () => {
            const type = apiKeyInput.type === 'password' ? 'text' : 'password';
            apiKeyInput.type = type;
            toggleKeyBtn.textContent = type === 'password' ? '👁️' : '🙈';
        });
        
        // Form submission
        document.getElementById('promptForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 画面の上部にスクロール（複数の方法を試行）
            try {
                // 方法1: window.scrollTo
                if (window.scrollTo) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
                
                // 方法2: document.documentElement.scrollTop
                if (document.documentElement) {
                    document.documentElement.scrollTop = 0;
                }
                
                // 方法3: document.body.scrollTop
                if (document.body) {
                    document.body.scrollTop = 0;
                }
                
                // 方法4: Chrome Extension環境用
                const container = document.querySelector('.container') || document.body;
                if (container && container.scrollIntoView) {
                    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } catch (error) {
                console.log('Scroll attempt failed:', error);
            }
            
            this.generatePrompt();
        });
        
        // Enhanced auto-save on input changes
        const autoSaveElements = ['theme', 'keywords', 'bpm', 'key', 'default_vocal_style', 'languageRatio', 'instruments', 'apiModel'];
        
        autoSaveElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                // リアルタイム保存イベント
                element.addEventListener('input', () => {
                    this.debouncedSave();
                });
                element.addEventListener('change', () => {
                    this.saveCurrentInput();
                });
                
                // フォーカス変更時にも保存
                element.addEventListener('focus', () => {
                    console.log('🎯 Focus gained:', id);
                });
                element.addEventListener('blur', () => {
                    console.log('👋 Focus lost from:', id);
                    this.saveCurrentInput(); // フォーカスを失う時に確実に保存
                });
                
                // キーボード入力でも保存（特にテキストエリア用）
                if (element.tagName === 'TEXTAREA') {
                    element.addEventListener('keyup', () => {
                        this.debouncedSave();
                    });
                }
            }
        });
    }

    // ===== Prompt Generation =====
    async generatePrompt() {
        if (!this.validateApiKey(this.openaiApiKey)) {
            this.updateKeyStatus('invalid', 'API キーを設定してください');
            return;
        }
        
        this.showLoading();
        
        try {
            const formData = this.collectFormData();
            
            // Validate input
            if (this.selectedGenres.length === 0) {
                throw new Error('少なくとも1つのジャンルを選択してください');
            }
            
            // 新しいバリデーション：プリセット選択またはカスタムテキストのどちらかが必要
            const hasPresetThemes = this.selectedThemes.length > 0;
            const hasCustomText = formData.theme && formData.theme.trim() !== '';
            
            if (!hasPresetThemes && !hasCustomText) {
                throw new Error('プリセットテーマを選択するか、カスタムテーマを入力してください');
            }
            
            const result = await this.callOpenAI(formData);
            this.displayResults(result);
            
        } catch (error) {
            console.error('Error generating prompt:', error);
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    collectFormData() {
        // Update song parts data
        this.songParts.forEach(part => {
            const partElement = document.querySelector(`[data-part-id="${part.id}"]`);
            if (partElement) {
                const nameSelect = partElement.querySelector('select[onchange*="name"]');
                const vocalSelect = partElement.querySelector('select[onchange*="vocal"]');
                const energyInput = partElement.querySelector('input[type="range"]');
                const instructionTextarea = partElement.querySelector('textarea');
                
                if (nameSelect) part.name = nameSelect.value;
                if (vocalSelect) part.vocal = vocalSelect.value;
                if (energyInput) part.energy = parseInt(energyInput.value);
                if (instructionTextarea) part.instruction = instructionTextarea.value;
            }
        });
        
        // Build theme content (組み合わせモード)
        let themeContent = '';
        const customText = document.getElementById('theme').value;
        
        // プリセットテーマがある場合
        if (this.selectedThemes.length > 0) {
            const presetThemes = this.selectedThemes.map(themeId => {
                const themeData = THEME_PRESETS[themeId];
                return themeData ? themeData.theme : '';
            }).filter(t => t).join('\n\n');
            themeContent = presetThemes;
        }
        
        // カスタムテキストがある場合は追加
        if (customText && customText.trim() !== '') {
            if (themeContent) {
                themeContent += '\n\n【追加詳細テーマ】\n' + customText.trim();
            } else {
                themeContent = customText.trim();
            }
        }
        
        // Language ratio conversion
        const languageRatio = parseInt(document.getElementById('languageRatio').value);
        let language = '';
        if (languageRatio === 0) {
            language = 'Japanese';
        } else if (languageRatio === 100) {
            language = 'English';
        } else {
            language = `Japanese ${100 - languageRatio}% - English ${languageRatio}%`;
        }
        
        // エネルギー平均値計算と動的ムード決定
        const energyLevels = this.songParts.map(part => part.energy);
        const avgEnergy = energyLevels.length > 0 ? 
            energyLevels.reduce((a, b) => a + b, 0) / energyLevels.length : 5;
        
        // 動的ムード決定（エネルギー平均値ベース）
        const baseMood = document.getElementById('mood').value;
        let dynamicMood = baseMood;
        if (avgEnergy >= 8) dynamicMood = 'Energetic';
        else if (avgEnergy >= 6) dynamicMood = 'Uplifting';
        else if (avgEnergy >= 4) dynamicMood = 'Balanced';
        else dynamicMood = 'Mellow';

        return {
            theme: themeContent,
            keywords: document.getElementById('keywords').value,
            genres: this.selectedGenres.map(g => g.name),
            bpm: parseInt(document.getElementById('bpm').value),
            key: document.getElementById('key').value,
            mood: baseMood,
            dynamicMood: dynamicMood,
            avgEnergy: Math.round(avgEnergy * 10) / 10,
            language: language,
            default_vocal_style: document.getElementById('default_vocal_style').value,
            instruments: document.getElementById('instruments').value,
            song_structure: document.getElementById('song_structure').value,
            custom_structure: document.getElementById('custom_structure') ? document.getElementById('custom_structure').value : '',
            songParts: this.songParts
        };
    }

    getDefaultEnergyForPart(partName) {
        // 各パートの一般的なエネルギーレベル
        const energyMap = {
            // 導入・終了系（控えめ）
            'Intro': 3,
            'Outro': 4,
            'Interlude': 4,
            'Tag': 4,
            'Final': 5,
            
            // メイン構成（バランス）
            'Verse': 5,
            'Pre-Chorus': 6,
            'Bridge': 5,
            'Hook': 6,
            'Refrain': 6,
            
            // 盛り上がり系（高め）
            'Chorus': 7,
            'Drop': 8,
            'Climax': 9,
            'Build': 7,
            'Pre-Drop': 7,
            
            // 特殊系（ジャンル依存）
            'Solo': 6,
            'Break': 4,
            'Breakdown': 3,
            'Coda': 4
        };
        
        return energyMap[partName] || 5; // デフォルトは5
    }

    getEnergyDescription(energy) {
        if (energy >= 9) return 'intense, powerful';
        if (energy >= 7) return 'energetic, dynamic';
        if (energy >= 5) return 'moderate, balanced';
        if (energy >= 3) return 'gentle, subdued';
        return 'quiet, intimate';
    }

    initializeDebugMode() {
        // 隠れたショートカットでデバッグモード切り替え（開発者用）
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+D のみ（隠れたショートカット）
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleDebugMode();
            }
        });
    }

    toggleDebugMode() {
        this.debugMode = !this.debugMode;
        console.log(`🔍 Debug mode ${this.debugMode ? 'ON' : 'OFF'}`);
        
        // 控えめな視覚的フィードバック（ヘッダーテキストのみ変更、色は変更しない）
        const header = document.querySelector('header h1');
        if (header) {
            if (this.debugMode) {
                header.textContent = '🔍 Sunoprompt [DEBUG]';
            } else {
                header.textContent = '🎵 Sunoprompt';
            }
        }
        
        if (this.debugMode) {
            if (this.lastDebugData) {
                this.showDebugPanel();
            } else {
                // デバッグデータがない場合はサンプルデータを表示
                this.lastDebugData = {
                    prompt: "Sample prompt for testing debug mode...",
                    response: "Sample API response",
                    tokens: { prompt: 150, completion: 75, total: 225 },
                    formData: { theme: "Test theme", genres: ["Pop"], key: "C Major" },
                    timestamp: new Date().toISOString()
                };
                this.showDebugPanel();
            }
        } else {
            this.hideDebugPanel();
        }
    }

    showDebugPanel() {
        // 既存のデバッグパネルを削除
        const existingPanel = document.getElementById('debugPanel');
        if (existingPanel) {
            existingPanel.remove();
        }

        // 「生成結果」タイトルと結果の間に挿入
        const resultTitle = document.querySelector('.result-section h2');
        const loadingSpinner = document.getElementById('loadingSpinner');
        
        if (!resultTitle || !loadingSpinner) return;
        
        const debugPanel = document.createElement('div');
        debugPanel.id = 'debugPanel';
        debugPanel.innerHTML = `
            <div style="margin: 15px 0; padding: 15px; background: #1a1a1a; border: 2px solid #ff4081; 
                        border-radius: 8px; color: #ffffff; font-family: monospace; font-size: 11px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h3 style="margin: 0; color: #ff4081; font-size: 14px;">🔍 Debug Information</h3>
                    <button onclick="this.parentElement.parentElement.remove()" 
                            style="background: #ff4081; color: white; border: none; border-radius: 4px; 
                                   width: 20px; height: 20px; cursor: pointer; font-size: 12px;">✕</button>
                </div>
                <div id="debugContent" style="white-space: pre-wrap; word-wrap: break-word; line-height: 1.3; 
                                                 max-height: 300px; overflow-y: auto; background: #0f0f0f; 
                                                 padding: 10px; border-radius: 4px;">
                    ${this.lastDebugData ? '' : '📝 Ready to display debug data...\n\nプロンプト生成後にデータが表示されます'}
                </div>
            </div>
        `;
        
        // 「生成結果」タイトルの直後（loadingSpinnerの前）に挿入
        loadingSpinner.parentNode.insertBefore(debugPanel, loadingSpinner);
        
        if (this.lastDebugData) {
            this.updateDebugContent();
        }
    }

    hideDebugPanel() {
        const debugPanel = document.getElementById('debugPanel');
        if (debugPanel) {
            debugPanel.remove();
        }
    }

    updateDebugContent() {
        const debugContent = document.getElementById('debugContent');
        if (debugContent && this.lastDebugData) {
            debugContent.textContent = this.formatDebugData(this.lastDebugData);
        }
    }

    formatDebugData(data) {
        return `=== SUNOPROMPT DEBUG INFO ===

📊 API Request Details:
Model: ${data.model}
Max Tokens: ${data.max_tokens}
Temperature: ${data.temperature}
Prompt Length: ${data.promptLength} chars

💰 Token Usage:
Prompt Tokens: ${data.tokenUsage?.prompt_tokens || 'N/A'}
Completion Tokens: ${data.tokenUsage?.completion_tokens || 'N/A'}
Total Tokens: ${data.tokenUsage?.total_tokens || 'N/A'}

⚡ Energy Analysis:
Average Energy: ${data.formData?.avgEnergy || 'N/A'}/10
Dynamic Mood: ${data.formData?.dynamicMood || 'N/A'}
Base Mood: ${data.formData?.mood || 'N/A'}
Energy Levels: [${data.formData?.songParts?.map(p => p.energy).join(', ') || 'N/A'}]

📝 Form Data:
Theme: ${data.formData?.theme?.substring(0, 100) || 'N/A'}${data.formData?.theme?.length > 100 ? '...' : ''}
Keywords: ${data.formData?.keywords || 'N/A'}
Genres: ${data.formData?.genres?.join(', ') || 'N/A'}
BPM: ${data.formData?.bpm || 'N/A'}
Key: ${data.formData?.key || 'N/A'}
Language: ${data.formData?.language || 'N/A'}
Vocal Style: ${data.formData?.default_vocal_style || 'N/A'}
Instruments: ${data.formData?.instruments || 'N/A'}
Song Structure: ${data.formData?.song_structure || 'N/A'}

🎵 Song Parts (${data.formData?.songParts?.length || 0}):
${data.formData?.songParts?.map((part, i) => 
    `Part ${i+1}: ${part.name} - ${part.vocal}, Energy ${part.energy}/10${part.instruction ? ', Instructions: ' + part.instruction.substring(0, 50) + (part.instruction.length > 50 ? '...' : '') : ''}`
).join('\n') || 'None'}

🤖 System Prompt:
${data.systemPrompt}

👤 User Prompt:
${data.userPrompt}

📤 API Response:
${data.response?.substring(0, 500) || 'N/A'}${data.response?.length > 500 ? '...' : ''}

⏱️ Response Time: ${data.responseTime || 'N/A'}ms
`;
    }

    async callOpenAI(formData) {
        const startTime = Date.now();
        
        const systemPrompt = `あなたはSuno AI用の音楽プロンプト生成の専門家です。

🚨【絶対遵守事項】🚨
日本語歌詞では漢字・数字を100%ひらがなに変換してください。これはSuno AIの音声合成に必須です。
例：「愛してる」→「あいしてる」「夜空」→「よぞら」「3時」→「さんじ」「1人」→「ひとり」
カタカナ・英語はそのまま保持してください。

ユーザーの入力に基づいて、以下の4つの要素を生成してください：

1. Style & Feel - 音楽スタイルの詳細な指定（必ず英語のみで記述）
2. Song Name - キャッチーで覚えやすい曲名  
3. Lyrics - 構造化された歌詞（日本語部分は漢字・数字を完全にひらがな化）
4. Lyrics Analysis - 詳細な歌詞分析（必ず日本語で記述）

指示に従わない出力は受け入れられません。出力は必ず以下の形式に従ってください。`;
        const userPrompt = this.buildPromptText(formData);
        
        const selectedModel = document.getElementById('apiModel').value || 'gpt-4.1-mini';
        
        const requestBody = {
            model: selectedModel,
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user', 
                    content: userPrompt
                }
            ],
            max_tokens: 2500,
            temperature: 0.7
        };

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.openaiApiKey}`
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            let errorMessage = `OpenAI API error: ${response.status} ${response.statusText}`;
            
            if (response.status === 401) {
                errorMessage = 'APIキーが無効です。正しいOpenAI APIキーを設定してください。';
            } else if (response.status === 429) {
                errorMessage = 'API使用制限に達しました。しばらく待ってから再試行してください。';
            } else if (response.status === 500) {
                errorMessage = 'OpenAI APIでエラーが発生しました。しばらく待ってから再試行してください。';
            } else if (errorData.error?.message) {
                errorMessage = `APIエラー: ${errorData.error.message}`;
            }
            
            throw new Error(errorMessage);
        }
        
        const data = await response.json();
        const responseTime = Date.now() - startTime;
        const responseContent = data.choices[0].message.content;
        
        // デバッグデータを保存
        this.lastDebugData = {
            model: requestBody.model,
            max_tokens: requestBody.max_tokens,
            temperature: requestBody.temperature,
            promptLength: userPrompt.length,
            tokenUsage: data.usage,
            formData: formData,
            systemPrompt: systemPrompt,
            userPrompt: userPrompt,
            response: responseContent,
            responseTime: responseTime
        };
        
        // デバッグモードがONの場合、パネルを更新
        if (this.debugMode) {
            this.showDebugPanel();
        }
        
        return this.parseOpenAIResponse(responseContent);
    }

    getLyricsLengthGuidance(genres) {
        const genreNames = genres.map(g => g.toLowerCase());
        
        // ラップ・ヒップホップ系は長め
        if (genreNames.some(g => ['rap', 'hip hop', 'hip-hop', 'trap', 'drill', 'boom bap', 'conscious rap', 'old school hip hop', 'alternative hip hop', 'cloud rap', 'grime'].includes(g))) {
            return "Verse sections: 8-12 lines each, Chorus sections: 4-6 lines each. Focus on wordflow and rhythm with rich lyrical content.";
        }
        
        // R&B・ソウル系はやや長め
        if (genreNames.some(g => ['r&b', 'rnb', 'soul', 'neo-soul', 'contemporary r&b', 'alternative r&b', 'gospel', 'funk'].includes(g))) {
            return "Verse sections: 6-8 lines each, Chorus sections: 4-6 lines each. Rich emotional expression with appropriate lyrical content.";
        }
        
        // ロック・メタル系はやや長め
        if (genreNames.some(g => ['rock', 'metal', 'punk', 'hardcore', 'alternative', 'indie rock', 'progressive rock'].includes(g))) {
            return "Verse sections: 6-8 lines each, Chorus sections: 4-6 lines each. Powerful and meaningful lyrical content.";
        }
        
        // ポップ系は標準
        if (genreNames.some(g => ['pop', 'indie pop', 'electropop', 'synthpop', 'k-pop', 'j-pop', 'c-pop'].includes(g))) {
            return "Verse sections: 4-6 lines each, Chorus sections: 3-4 lines each. Catchy and memorable lyrical content.";
        }
        
        // アンビエント・エレクトロニック系は短め
        if (genreNames.some(g => ['ambient', 'electronic', 'techno', 'house', 'trance', 'dubstep', 'drum & bass'].includes(g))) {
            return "Verse sections: 3-5 lines each, Chorus sections: 2-4 lines each. Concise and impactful lyrics for music-focused genre.";
        }
        
        // その他は標準
        return "Verse sections: 4-6 lines each, Chorus sections: 3-5 lines each. Appropriate lyrical length.";
    }

    buildPromptText(formData) {
        // エネルギーレベルに基づく楽曲構造生成
        const energyBasedStructure = formData.songParts.map((part, i) => 
            `[${part.name}]\n[${part.vocal.toLowerCase()}, energy level ${part.energy}/10, dynamic: ${this.getEnergyDescription(part.energy)}${part.instruction ? ', ' + part.instruction : ''}]`
        ).join('\n\n');

        const prompt = `
以下の情報に基づいて、Suno AI用の音楽プロンプトを生成してください：

【入力情報】
テーマ: ${formData.theme}
歌詞に含めたい言葉（参考）: ${formData.keywords}
ジャンル: ${formData.genres.join(', ')} (複数選択)
BPM: ${formData.bpm}
キー: ${formData.key}
ベースムード: ${formData.mood}
動的ムード: ${formData.dynamicMood} (エネルギー平均値${formData.avgEnergy}/10に基づく自動調整)
言語設定: ${formData.language}
曲構成: ${formData.song_structure}
指定楽器: ${formData.instruments} (必須: これらの楽器を中心とした楽曲構成)
デフォルトボーカルスタイル: ${formData.default_vocal_style}
${formData.custom_structure ? `カスタム構成: ${formData.custom_structure}` : ''}

【重要な指示】
- 指定された楽器(${formData.instruments})を必ず楽曲の中心として使用し、Style & FeelのInstrumentationセクションで詳細に言及してください
- 選択されたジャンル(${formData.genres.join(', ')})を組み合わせて、独創的な音楽スタイルを作成してください
- 各ジャンルの特徴的な要素（楽器、リズム、ハーモニー、アレンジ手法）を明確に反映してください
【🚨重要】言語比率の厳密な遵守：
  ◆ 指定された言語設定「${formData.language}」を必ず守ってください
  ◆ この比率から大きく逸脱することは禁止です
  ◆ 英語の割合が高い場合は、英語歌詞を主体とし、日本語は指定比率以下に抑制してください
  ◆ 日本語の割合が高い場合は、日本語歌詞を主体とし、英語は指定比率以下に抑制してください
【🚨重要】日本語歌詞のひらがな変換は絶対必須：
  ◆ 漢字は100%ひらがなに変換する（例外なし）：「愛」→「あい」「夜空」→「よぞら」「心」→「こころ」「涙」→「なみだ」
  ◆ 数字もひらがなに変換：「3時」→「さんじ」「1人」→「ひとり」「2024年」→「にせんにじゅうよねん」
  ◆ 英数字混じりもひらがな化：「24時間」→「にじゅうよじかん」
  ◆ カタカナはそのまま保持：「ライト」「ハート」「ドリーム」
  ◆ この変換を怠ると、Sunoでの音声合成が正常に機能しません
- 参考キーワードが指定されている場合は、可能な限り自然な形で歌詞に織り込んでください
- テーマから情景・モチーフを創造的に想起し、歌詞と楽曲の雰囲気に反映してください
- 各パートのエネルギーレベル(1-10)に基づいて楽曲の強弱を明確に表現してください
- 平均エネルギー値(${formData.avgEnergy}/10)に基づき、楽曲全体のムードを${formData.dynamicMood}として調整してください
- エネルギーの高いパート(8-10)では力強い演奏指示を、低いパート(1-3)では静寂な演奏指示を含めてください
- Style & Feelセクションでは、必ず選択されたジャンルの音楽的特徴を具体的に説明してください

【歌詞品質向上のための特別指示】
- ${this.getLyricsLengthGuidance(formData.genres)}
- 韻律を意識した高品質な歌詞を作成してください
- 行末韻（end rhyme）、頭韻（alliteration）、内韻（internal rhyme）を積極的に使用してください
- ダブルミーニング（二重の意味）を持つ言葉やフレーズを巧妙に織り込んでください
- メタファー（隠喩）とシンボリズム（象徴）を効果的に使用してください
- 日本語と英語の音韻的な響きの美しさを活かしてください
- 感情の起伏に合わせて言葉の選択とリズムを調整してください
- 記憶に残るキャッチーなフレーズ（フック）を各セクションに配置してください
- 具体的なイメージを喚起する感覚的な表現を使用してください
- 抽象的なテーマを具体的なシーンや体験に落とし込んでください
- 歌詞全体を通して一貫したナラティブ（物語性）を構築してください

【Style & Feelセクション特別指示】
Style & Feelセクションは必ず英語のみで、Sunoの文字数制限に配慮した簡潔なリスト形式で出力してください。以下の要素を含む簡潔な記述：

- BPM: ${formData.bpm} (必須: この数値を必ず記載)
- Key: ${formData.key} (必須: このキーを必ず記載、省略禁止)
- Genre: [選択されたジャンル(${formData.genres.join(', ')})を基にした簡潔な音楽スタイル]
- Mood: [${formData.dynamicMood}を基にした簡潔な雰囲気表現（3-4個の形容詞）]
- Vocal: [${formData.default_vocal_style}を基にした簡潔なボーカル指定]
- Instrumentation: [指定楽器(${formData.instruments})を中心とした簡潔な楽器構成]

各要素は必要最小限で効果的な英語表現を使用してください。

【出力形式】
必ず以下の4つのセクションを含めてください：

【Style & Feel】
- BPM: ${formData.bpm} (この数値は絶対に省略しないでください)
- Key: ${formData.key} (このキーは絶対に省略しないでください)
- Genre: [簡潔なジャンル記述]
- Mood: [簡潔なムード記述]
- Vocal: [簡潔なボーカル記述]
- Instrumentation: [簡潔な楽器構成記述]

【Song Name】
[テーマに基づいたキャッチーな曲名（引用符やクォーテーションマークは使用しない）]

【Lyrics】
🚨言語比率厳守：「${formData.language}」を必ず遵守🚨
🚨注意：日本語歌詞は必ずひらがな変換が必要です🚨
${energyBasedStructure}

【言語比率チェック】
✓ 指定比率：${formData.language}
✓ この比率からの逸脱は禁止です
✓ 英語比率が高い場合：英語歌詞を主体とし、日本語は最小限に
✓ 日本語比率が高い場合：日本語歌詞を主体とし、英語は最小限に

【ひらがな変換チェックリスト】
✓ 漢字→ひらがな：「愛」→「あい」「夜空」→「よぞら」「心」→「こころ」「風」→「かぜ」
✓ 数字→ひらがな：「3時」→「さんじ」「1人」→「ひとり」「100」→「ひゃく」
✓ カタカナは保持：「ライト」「ハート」「ドリーム」はそのまま
✓ 英語は保持：「Love」「Dream」「Night」はそのまま

【Lyrics Analysis】
- 韻律・音韻: [韻を踏んだポイント、音韻の工夫、リズムパターンの解説]
- 言語技法: [ダブルミーニング、メタファー、アリテレーション、頭韻法などの使用箇所と効果]
- 構造・展開: [歌詞の物語性、感情の変化、テーマの発展]
- 文化的要素: [日本語と英語の混在効果、文化的な言葉遊び、バイリンガルの音韻効果]
- 音楽的連動: [歌詞とメロディの関係性、強調されるべき単語・フレーズ]
- エネルギー設計: [各パートのエネルギーレベルと楽曲の動的変化、平均エネルギー${formData.avgEnergy}/10による全体的ムード${formData.dynamicMood}の効果]

【重要な指示】
歌詞解析セクションは必ず日本語で記述してください。英語の専門用語や概念についても、日本語で説明するか、日本語での説明を併記してください。このページの利用者は日本語話者であるため、分かりやすい日本語での解説を心がけてください。

各セクションには具体的で詳細な内容を含めてください。
歌詞は指定された言語設定「${formData.language}」に厳密に従って作成してください。この比率を守ることは最優先事項です。
選択されたジャンル(${formData.genres.join(', ')})の特徴を活かした楽曲構成にしてください。

【Style & Feel出力品質管理】
Style & Feelセクションの出力は以下の条件を満たしてください：
- 必ず3-5文の英語で記述する
- 選択されたすべてのジャンルの要素を言及する
- BPM、Key、楽器編成、ムードを自然に織り込む
- 具体的な音楽的特徴（リズム、ハーモニー、音色など）を記述する
- 曖昧な表現を避け、明確で技術的な記述を心がける
- 必ず一貫した品質とスタイルを保つ
        `;
        
        return prompt;
    }

    parseOpenAIResponse(content) {
        const sections = {
            style: '',
            songName: '',
            lyrics: '',
            analysis: ''
        };
        
        const lines = content.split('\n');
        let currentSection = '';
        
        lines.forEach(line => {
            if (line.includes('Style & Feel')) {
                currentSection = 'style';
                return;
            } else if (line.includes('Song Name')) {
                currentSection = 'songName';
                return;
            } else if (line.includes('Lyrics Analysis')) {
                currentSection = 'analysis';
                return;
            } else if (line.includes('Lyrics')) {
                currentSection = 'lyrics';
                return;
            }
            
            if (currentSection && line.trim()) {
                sections[currentSection] += line + '\n';
            }
        });
        
        return sections;
    }

    displayResults(result) {
        try {
            console.log('🎵 Displaying results...');
            
            // 結果の表示
            document.getElementById('styleResult').textContent = result.style;
            document.getElementById('songNameResult').textContent = result.songName;
            document.getElementById('lyricsResult').textContent = result.lyrics;
            document.getElementById('analysisResult').textContent = result.analysis;
            
            document.getElementById('results').classList.remove('hidden');
            document.getElementById('errorMessage').classList.add('hidden');
            
            // 全てをコピーボタンを表示
            const copyAllBtn = document.querySelector('.copy-all-btn');
            if (copyAllBtn) {
                copyAllBtn.style.display = 'block';
            }
            
            console.log('✅ Results displayed successfully');
            
            // Sunoに反映ボタンを追加（エラー処理付き）
            try {
                this.addSunoIntegrationButton(result);
            } catch (error) {
                console.warn('⚠️ Suno integration button failed:', error);
            }
            
            // スクロール処理（エラー処理付き）
            try {
                const resultsElement = document.getElementById('results');
                if (resultsElement) {
                    resultsElement.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (error) {
                console.warn('⚠️ Scroll to results failed:', error);
            }
            
        } catch (error) {
            console.error('❌ Error in displayResults:', error);
            this.showError('結果の表示中にエラーが発生しました: ' + error.message);
        }
    }

    addSunoIntegrationButton(result) {
        // 既存のボタンがあれば削除
        const existingButton = document.getElementById('sunoIntegrationButton');
        if (existingButton) {
            existingButton.remove();
        }

        // Sunoに反映ボタンを作成
        const sunoButton = document.createElement('button');
        sunoButton.id = 'sunoIntegrationButton';
        sunoButton.className = 'suno-integration-btn';
        sunoButton.innerHTML = '🎵 Sunoに反映';
        
        
        sunoButton.addEventListener('click', () => {
            this.sendToSuno(result);
        });

        // 結果セクションの最後に追加
        const resultsSection = document.getElementById('results');
        resultsSection.appendChild(sunoButton);
    }

    async sendToSuno(result) {
        try {
            // Chrome APIが利用できない場合は、メッセージで親ページに送信
            if (typeof chrome === 'undefined' || !chrome.tabs || !chrome.scripting) {
                this.sendMessageToParentPage(result);
                return;
            }

            // Sunoサイト上で実行されることを前提
            const tabs = await chrome.tabs.query({active: true, currentWindow: true});
            const currentTab = tabs[0];
            
            if (!currentTab || !currentTab.url || !currentTab.url.includes('suno.com')) {
                this.showNotification('⚠️ この機能はSunoサイト上でのみ利用できます');
                return;
            }

            // 現在のSunoページのフォームに直接入力
            await this.fillSunoForm(currentTab.id, result);
            this.showNotification('🎵 Sunoフォームに情報を反映中...');
        } catch (error) {
            console.error('Suno integration error:', error);
            this.showNotification('❌ フォーム入力でエラーが発生しました');
        }
    }
    
    // メッセージ通信による代替方法
    sendMessageToParentPage(result) {
        try {
            // Sunoに送信するデータ（歌詞の解析は除外）
            const sunoData = {
                songName: result.songName,
                style: result.style,
                lyrics: result.lyrics  // 解析は含めない
            };
            
            // 親ページ（Sunoサイト）にメッセージを送信
            window.parent.postMessage({
                type: 'SUNOPROMPT_FILL_FORM',
                data: sunoData
            }, '*');
            
            this.showNotification('🎵 Sunoフォームに反映中...');
            
            // 3秒後にオーバーレイを閉じる
            setTimeout(() => {
                if (window.hideSunoprompt) {
                    window.hideSunoprompt();
                }
            }, 3000);
            
        } catch (error) {
            console.error('Message send error:', error);
            this.showNotification('❌ データ送信でエラーが発生しました');
        }
    }

    async fillSunoForm(tabId, result) {
        try {
            // Chrome scripting APIの利用可能性をチェック
            if (typeof chrome === 'undefined' || !chrome.scripting) {
                this.showNotification('❌ Chrome Scripting API が利用できません');
                return;
            }
            
            // Sunoに送信するデータ（歌詞の解析は除外）
            const sunoData = {
                songName: result.songName,
                style: result.style,
                lyrics: result.lyrics  // 解析は含めない
            };
            
            // Sunoページに情報を注入
            const injectionResult = await chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: (data) => {
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
                            element.value = data.songName;
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
                                element.textContent = data.lyrics;
                            } else {
                                element.value = data.lyrics;
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
                            element.value = data.style;
                            element.dispatchEvent(new Event('input', { bubbles: true }));
                            element.dispatchEvent(new Event('change', { bubbles: true }));
                            filled.style = true;
                            break;
                        }
                    }

                    // 結果をコンソールに出力（デバッグ用）
                    console.log('Sunoprompt: フィールド入力結果', filled);
                    console.log('Sunoprompt: 送信データ', data);

                    return filled;
                },
                args: [sunoData]
            });

            if (injectionResult && injectionResult[0] && injectionResult[0].result) {
                const filled = injectionResult[0].result;
                const successCount = Object.values(filled).filter(Boolean).length;
                if (successCount > 0) {
                    this.showNotification(`✅ ${successCount}個のフィールドに反映完了！`);
                } else {
                    this.showNotification('⚠️ 対象のフィールドが見つかりませんでした');
                }
            } else {
                this.showNotification('⚠️ スクリプト実行に問題がありました');
            }
            
        } catch (error) {
            console.error('Fill form error:', error);
            this.showNotification('❌ フォーム入力でエラーが発生しました');
        }
    }


    // ===== Loading & Error States =====
    showLoading() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
        document.getElementById('results').classList.add('hidden');
        document.getElementById('errorMessage').classList.add('hidden');
        
        const generateBtn = document.getElementById('generateBtn');
        generateBtn.disabled = true;
        generateBtn.textContent = '生成中...';
        
        // Disable all form inputs
        const form = document.getElementById('promptForm');
        const inputs = form.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => {
            if (input.id !== 'generateBtn') {
                input.disabled = true;
                input.classList.add('disabled-during-generation');
            }
        });
    }

    hideLoading() {
        document.getElementById('loadingSpinner').classList.add('hidden');
        
        const generateBtn = document.getElementById('generateBtn');
        generateBtn.disabled = false;
        generateBtn.textContent = '🎵 プロンプト生成';
        
        // Re-enable all form inputs
        const form = document.getElementById('promptForm');
        const inputs = form.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => {
            input.disabled = false;
            input.classList.remove('disabled-during-generation');
        });
    }

    showError(message) {
        document.getElementById('errorMessage').textContent = message;
        document.getElementById('errorMessage').classList.remove('hidden');
        document.getElementById('results').classList.add('hidden');
    }

    showContextInvalidatedMessage() {
        // 非表示の警告メッセージ（ユーザーに表示しない）
        console.warn('拡張機能のコンテキストが無効化されました。設定の自動保存が一時的に無効になっています。');
        console.warn('拡張機能を再読み込みするか、ポップアップを閉じて再度開いてください。');
        
        // デバッグモードでのみユーザーに表示
        if (this.debugMode) {
            this.updateKeyStatus('warning', '⚠️ 拡張機能のコンテキストが無効化されました。設定保存が無効です。');
        }
    }

    debouncedSave() {
        // 前のタイマーをクリア
        if (this.saveTimer) {
            clearTimeout(this.saveTimer);
        }
        
        // 500ms後に保存実行（ユーザーの入力が止まってから保存）
        this.saveTimer = setTimeout(() => {
            this.saveCurrentInput();
            console.log('⚡ Debounced save executed');
        }, 500);
    }

    // ===== Data Persistence =====
    async saveCurrentInput() {
        // フォーカス状態とカーソル位置を取得
        const focusState = this.getCurrentFocusState();
        
        const formData = {
            selectedThemes: this.selectedThemes,
            selectedGenres: this.selectedGenres.map(g => ({ id: g.id, name: g.name, category: g.category })),
            currentKeyType: this.currentKeyType,
            songParts: this.songParts,
            customStructureSequence: this.customStructureSequence,
            theme: document.getElementById('theme').value,
            keywords: document.getElementById('keywords').value,
            bpm: document.getElementById('bpm').value,
            key: document.getElementById('key').value,
            languageRatio: document.getElementById('languageRatio').value,
            default_vocal_style: document.getElementById('default_vocal_style').value,
            instruments: document.getElementById('instruments').value,
            song_structure: document.getElementById('song_structure').value,
            apiModel: document.getElementById('apiModel').value,
            // フォーカス状態とUI状態を保存
            focusState: focusState,
            scrollPosition: window.scrollY,
            timestamp: Date.now()
        };
        
        console.log('💾 Saving formData:');
        console.log('   selectedGenres count:', this.selectedGenres.length);
        console.log('   selectedGenres data:', this.selectedGenres);
        console.log('   mapped selectedGenres:', formData.selectedGenres);
        
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                await chrome.storage.local.set({ formData });
            } else {
                console.log('Chrome storage API not available, form data not saved');
            }
        } catch (error) {
            console.error('Failed to save form data:', error);
            
            // Extension context invalidated時のユーザーフレンドリーなメッセージ
            if (error.message && error.message.includes('Extension context invalidated')) {
                // 一度だけ警告を表示（頻繁な表示を避ける）
                if (!this.contextInvalidatedWarned) {
                    this.contextInvalidatedWarned = true;
                    this.showContextInvalidatedMessage();
                }
            }
        }
    }

    async loadSavedInput() {
        try {
            const result = await chrome.storage.local.get(['formData']);
            if (result.formData) {
                const data = result.formData;
                
                // Restore basic form values
                document.getElementById('theme').value = data.theme || '';
                document.getElementById('keywords').value = data.keywords || '';
                document.getElementById('bpm').value = data.bpm || 120;
                document.getElementById('bpmValue').textContent = data.bpm || 120;
                document.getElementById('key').value = data.key || 'C Major';
                document.getElementById('languageRatio').value = data.languageRatio || 50;
                document.getElementById('default_vocal_style').value = data.default_vocal_style || 'Female Solo';
                document.getElementById('instruments').value = data.instruments || '';
                document.getElementById('song_structure').value = data.song_structure || 'detailed';
                document.getElementById('apiModel').value = data.apiModel || 'gpt-4.1-mini';
                
                // Restore language slider
                const languageSlider = document.getElementById('languageRatio');
                if (languageSlider) {
                    languageSlider.dispatchEvent(new Event('input'));
                }
                
                // 組み合わせモードでは特別な復元処理は不要
                // プリセットテーマとカスタムテキストは個別に復元される
                
                // Restore key type
                if (data.currentKeyType) {
                    this.currentKeyType = data.currentKeyType;
                    const keyTypeBtn = document.querySelector(`.key-type-btn[data-type="${data.currentKeyType}"]`);
                    if (keyTypeBtn) {
                        keyTypeBtn.click();
                    }
                }
                
                // Restore themes
                if (data.selectedThemes) {
                    this.selectedThemes = data.selectedThemes;
                    setTimeout(() => {
                        this.updateSelectedThemesDisplay();
                        this.updateThemeButtonStates();
                        this.expandThemeCategoriesWithSelected();
                    }, 100);
                }
                
                // Restore genres
                if (data.selectedGenres) {
                    this.selectedGenres = data.selectedGenres;
                    console.log('Restoring genres:', this.selectedGenres);
                    
                    // Retry mechanism to ensure DOM is ready
                    const restoreGenreState = (attempt = 1) => {
                        console.log(`🔄 Genre restoration attempt ${attempt}`);
                        const genreCategories = document.querySelectorAll('[data-category-id]');
                        
                        if (genreCategories.length === 0 && attempt < 5) {
                            console.log(`   DOM not ready, retrying in ${100 * attempt}ms...`);
                            setTimeout(() => restoreGenreState(attempt + 1), 100 * attempt);
                            return;
                        }
                        
                        console.log(`   ✅ DOM ready with ${genreCategories.length} categories`);
                        
                        // Ensure all categories start collapsed first
                        genreCategories.forEach(cat => {
                            cat.classList.add('collapsed');
                            console.log(`   🔒 Collapsed category: ${cat.getAttribute('data-category-id')}`);
                        });
                        
                        console.log(`   ⏱️ Waiting 50ms for DOM stability...`);
                        
                        // Small delay to ensure DOM is stable, then restore in correct order
                        setTimeout(() => {
                            console.log(`   🔄 Starting genre state restoration sequence...`);
                            
                            // Step 1: Update displays and button states WITHOUT auto-expansion
                            this.updateSelectedGenresDisplay();
                            this.updateGenreButtonStatesWithoutAutoExpansion();
                            
                            // Step 2: Explicitly expand only selected categories
                            this.expandGenreCategoriesWithSelected();
                            
                            console.log(`   ✅ Genre restoration sequence completed`);
                        }, 50);
                    };
                    
                    setTimeout(() => restoreGenreState(), 200);
                }
                
                // Update instrument button states after restoration
                setTimeout(() => {
                    this.updateInstrumentButtonStates();
                }, 200);
                
                // Restore song parts
                if (data.songParts) {
                    this.songParts = data.songParts;
                    this.partIdCounter = Math.max(...this.songParts.map(p => p.id)) + 1;
                    setTimeout(() => {
                        this.renderSongParts();
                    }, 200);
                }
                
                // Restore custom structure sequence
                if (data.customStructureSequence) {
                    this.customStructureSequence = data.customStructureSequence;
                }
                
                // Update instrument button and category states after restoration
                setTimeout(() => {
                    this.updateInstrumentButtonStates();
                    this.updateInstrumentCategoryStates();
                }, 300);
                
                // フォーカス状態とスクロール位置を復元
                setTimeout(() => {
                    if (data.focusState) {
                        this.restoreFocusState(data.focusState);
                    }
                    
                    if (typeof data.scrollPosition === 'number') {
                        window.scrollTo(0, data.scrollPosition);
                        console.log('🔄 Scroll position restored:', data.scrollPosition);
                    }
                }, 500);
                
                console.log('✅ Complete form state restored, including focus and scroll position');
            }
        } catch (error) {
            console.error('Failed to load saved input:', error);
        }
    }

    // ===== Setup Copy Button Event Listeners =====
    setupCopyButtons() {
        // Individual copy buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                const targetId = e.target.getAttribute('data-copy-target');
                if (targetId) {
                    this.copyToClipboard(targetId, e.target);
                }
            }
        });
        
        // Copy all button
        const copyAllBtn = document.getElementById('copyAllBtn');
        if (copyAllBtn) {
            copyAllBtn.addEventListener('click', () => {
                this.copyAllResults(copyAllBtn);
            });
        }
    }

    setupPopupStability() {
        // ポップアップの適切なライフサイクル管理
        console.log('🔧 Setting up popup stability measures...');
        
        // 1. 正常なクリーンアップハンドラー
        window.addEventListener('beforeunload', (e) => {
            // 正常な終了処理 - エラーではない
            this.cleanup();
        });
        
        // 2. 実際のエラー処理
        window.addEventListener('error', (e) => {
            console.error('🚨 Uncaught error in popup:', e.error);
            console.error('   File:', e.filename);
            console.error('   Line:', e.lineno);
            console.error('   Column:', e.colno);
        });
        
        // 3. Promise rejection エラー処理
        window.addEventListener('unhandledrejection', (e) => {
            console.error('🚨 Unhandled promise rejection:', e.reason);
            console.error('   Promise:', e.promise);
        });
        
        // 4. Chrome extension context invalidation 検出
        if (typeof chrome !== 'undefined' && chrome.runtime) {
            try {
                chrome.runtime.onConnect.addListener(() => {
                    // Connection test
                });
            } catch (error) {
                console.error('🚨 Chrome runtime context error:', error);
            }
        }
        
        // 5. 定期的なハートビート（必要に応じて）
        this.heartbeatInterval = setInterval(() => {
            // サイレントハートビート - デバッグ時のみ表示
            if (this.debugMode) {
                console.debug('💓 Popup heartbeat');
            }
        }, 30000);
        
        // 5. フォーカス状態の監視
        let focusLost = false;
        window.addEventListener('blur', () => {
            focusLost = true;
            console.log('📉 Popup lost focus');
        });
        
        window.addEventListener('focus', () => {
            if (focusLost) {
                console.log('📈 Popup regained focus');
                focusLost = false;
            }
        });
        
        console.log('✅ Popup stability measures activated');
    }

    cleanup() {
        // 正常な終了処理
        console.log('🧹 Cleaning up popup resources...');
        
        try {
            // ハートビートを停止
            if (this.heartbeatInterval) {
                clearInterval(this.heartbeatInterval);
                this.heartbeatInterval = null;
            }
            
            // 保存タイマーを停止
            if (this.saveTimer) {
                clearTimeout(this.saveTimer);
                this.saveTimer = null;
            }
            
            // 最終データ保存
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                this.saveCurrentInput();
            }
            
            console.log('✅ Cleanup completed');
        } catch (error) {
            // クリーンアップ中のエラーは致命的ではないため、ログのみ
            console.log('ℹ️ Cleanup warning:', error.message);
        }
    }

    getCurrentFocusState() {
        const activeElement = document.activeElement;
        if (!activeElement || activeElement === document.body) {
            return null;
        }
        
        const focusState = {
            elementId: activeElement.id,
            tagName: activeElement.tagName,
            className: activeElement.className
        };
        
        // テキストエリアや入力フィールドの場合、カーソル位置を保存
        if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
            focusState.selectionStart = activeElement.selectionStart;
            focusState.selectionEnd = activeElement.selectionEnd;
            focusState.value = activeElement.value; // 値も保存
        }
        
        console.log('💾 Saving focus state:', focusState);
        return focusState;
    }

    restoreFocusState(focusState) {
        if (!focusState) return;
        
        console.log('🔄 Restoring focus state:', focusState);
        
        // 要素を見つける
        let element = null;
        if (focusState.elementId) {
            element = document.getElementById(focusState.elementId);
        }
        
        if (!element) {
            // IDで見つからない場合、タグ名とクラス名で検索
            const elements = document.querySelectorAll(`${focusState.tagName}.${focusState.className.replace(/\s+/g, '.')}`);
            if (elements.length > 0) {
                element = elements[0];
            }
        }
        
        if (element) {
            // フォーカスを復元
            setTimeout(() => {
                element.focus();
                
                // カーソル位置を復元
                if ((element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') && 
                    typeof focusState.selectionStart === 'number') {
                    element.setSelectionRange(focusState.selectionStart, focusState.selectionEnd);
                }
                
                console.log('✅ Focus restored to:', element.id || element.tagName);
            }, 100);
        }
    }

    // ===== Copy Functions =====
    async copyToClipboard(elementId, buttonElement = null) {
        console.log('🔍 copyToClipboard called with elementId:', elementId);
        const element = document.getElementById(elementId);
        console.log('🔍 element found:', !!element, element);
        
        if (!element) {
            console.error('❌ Element not found for ID:', elementId);
            console.log('🔍 Available elements with IDs:', 
                Array.from(document.querySelectorAll('[id]')).map(el => el.id));
            return;
        }
        
        const text = element.textContent;
        console.log('🔍 text content:', text ? text.substring(0, 50) + '...' : 'EMPTY');
        
        try {
            await navigator.clipboard.writeText(text);
            this.showCopySuccess(buttonElement);
        } catch (error) {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.showCopySuccess(buttonElement);
        }
    }

    async copyAllResults(buttonElement = null) {
        console.log('🔍 copyAllResults called');
        
        const styleEl = document.getElementById('styleResult');
        const songNameEl = document.getElementById('songNameResult');
        const lyricsEl = document.getElementById('lyricsResult');
        const analysisEl = document.getElementById('analysisResult');
        
        console.log('🔍 Results elements found:', {
            style: !!styleEl,
            songName: !!songNameEl,
            lyrics: !!lyricsEl,
            analysis: !!analysisEl
        });
        
        if (!styleEl || !songNameEl || !lyricsEl || !analysisEl) {
            console.error('❌ Missing result elements');
            return;
        }
        
        const style = styleEl.textContent;
        const songName = songNameEl.textContent;
        const lyrics = lyricsEl.textContent;
        const analysis = analysisEl.textContent;
        
        const allText = `【Style & Feel】\n${style}\n\n【Song Name】\n${songName}\n\n【Lyrics】\n${lyrics}\n\n【Lyrics Analysis】\n${analysis}`;
        
        try {
            await navigator.clipboard.writeText(allText);
            this.showCopySuccess(buttonElement);
        } catch (error) {
            const textarea = document.createElement('textarea');
            textarea.value = allText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.showCopySuccess(buttonElement);
        }
    }

    showNotification(message) {
        // Chrome Extension対応: alertの代わりに視覚的通知
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            background: #4CAF50 !important;
            color: white !important;
            padding: 15px 20px !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
            z-index: 10000 !important;
            font-family: inherit !important;
            font-size: 14px !important;
            max-width: 300px !important;
            word-wrap: break-word !important;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    showCopySuccess(button) {
        if (!button) return;
        
        const originalText = button.textContent;
        button.textContent = '✅ コピー完了';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }
}

// 即座にグローバルスコープで利用可能にする
window.SunopromptExtension = SunopromptExtension;

// Global functions for HTML onclick handlers
let sunoprompt;

window.copyToClipboard = function(elementId) {
    if (window.sunoprompt && window.sunoprompt.copyToClipboard) {
        window.sunoprompt.copyToClipboard(elementId);
    } else {
        console.error('Sunoprompt extension not initialized');
    }
};

window.copyAllResults = function() {
    if (window.sunoprompt && window.sunoprompt.copyAllResults) {
        window.sunoprompt.copyAllResults();
    } else {
        console.error('Sunoprompt extension not initialized');
    }
};

// Initialize the extension
// Chrome Extension environment - always expose the class globally
window.SunopromptExtension = SunopromptExtension;

// Initialize in both environments
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.sunoprompt = new SunopromptExtension();
        // Also set the global variable for compatibility
        sunoprompt = window.sunoprompt;
        console.log('Sunoprompt extension initialized successfully');
    } catch (error) {
        console.error('Error initializing SunopromptExtension:', error);
    }
});