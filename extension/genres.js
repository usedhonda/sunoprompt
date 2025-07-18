// Chrome Extension用 - ジャンル (export削除版)
// 音楽ジャンルの包括的なリスト
const MUSIC_GENRES = [
    // Pop & Mainstream
    { id: 'pop', name: 'Pop', category: 'mainstream', description: 'キャッチーなメロディとメインストリームアピール' },
    { id: 'indie-pop', name: 'Indie Pop', category: 'mainstream', description: 'インディペンデントなポップミュージック' },
    { id: 'synthpop', name: 'Synthpop', category: 'mainstream', description: 'シンセサイザー中心のポップ' },
    { id: 'k-pop', name: 'K-Pop', category: 'mainstream', description: '韓国発のポップミュージック' },
    { id: 'j-pop', name: 'J-Pop', category: 'mainstream', description: '日本のポップミュージック' },
    
    // Rock & Alternative
    { id: 'rock', name: 'Rock', category: 'rock', description: 'クラシックロック' },
    { id: 'indie-rock', name: 'Indie Rock', category: 'rock', description: 'インディペンデントロック' },
    { id: 'alternative', name: 'Alternative', category: 'rock', description: 'オルタナティブロック' },
    { id: 'punk', name: 'Punk', category: 'rock', description: 'パンクロック' },
    { id: 'metal', name: 'Metal', category: 'rock', description: 'ヘビーメタル' },
    { id: 'grunge', name: 'Grunge', category: 'rock', description: 'グランジ' },
    { id: 'shoegaze', name: 'Shoegaze', category: 'rock', description: 'シューゲイザー' },
    
    // Electronic & Dance
    { id: 'electronic', name: 'Electronic', category: 'electronic', description: 'エレクトロニックミュージック' },
    { id: 'house', name: 'House', category: 'electronic', description: 'ハウスミュージック' },
    { id: 'techno', name: 'Techno', category: 'electronic', description: 'テクノ' },
    { id: 'ambient', name: 'Ambient', category: 'electronic', description: 'アンビエント' },
    { id: 'edm', name: 'EDM', category: 'electronic', description: 'エレクトロニックダンスミュージック' },
    { id: 'trap-electronic', name: 'Trap (Electronic)', category: 'electronic', description: 'エレクトロニックトラップ' },
    { id: 'dubstep', name: 'Dubstep', category: 'electronic', description: 'ダブステップ' },
    { id: 'drum-bass', name: 'Drum & Bass', category: 'electronic', description: 'ドラムンベース' },
    { id: 'synthwave', name: 'Synthwave', category: 'electronic', description: 'シンセウェーブ' },
    
    // Hip Hop & R&B
    { id: 'hip-hop', name: 'Hip Hop', category: 'hip-hop', description: 'ヒップホップ' },
    { id: 'rap', name: 'Rap', category: 'hip-hop', description: 'ラップ' },
    { id: 'trap', name: 'Trap', category: 'hip-hop', description: 'トラップ' },
    { id: 'drill', name: 'Drill', category: 'hip-hop', description: 'ドリル' },
    { id: 'rnb', name: 'R&B', category: 'hip-hop', description: 'リズム&ブルース' },
    { id: 'soul', name: 'Soul', category: 'hip-hop', description: 'ソウル' },
    { id: 'neo-soul', name: 'Neo-Soul', category: 'hip-hop', description: 'ネオソウル' },
    { id: 'pluggnb', name: 'PluggnB', category: 'hip-hop', description: '2024年のブレイクアウトジャンル' },
    
    // Jazz & Blues
    { id: 'jazz', name: 'Jazz', category: 'jazz', description: 'ジャズ' },
    { id: 'blues', name: 'Blues', category: 'jazz', description: 'ブルース' },
    { id: 'fusion', name: 'Fusion', category: 'jazz', description: 'フュージョン' },
    { id: 'smooth-jazz', name: 'Smooth Jazz', category: 'jazz', description: 'スムースジャズ' },
    
    // Folk & Country
    { id: 'folk', name: 'Folk', category: 'folk', description: 'フォーク' },
    { id: 'country', name: 'Country', category: 'folk', description: 'カントリー' },
    { id: 'americana', name: 'Americana', category: 'folk', description: 'アメリカーナ' },
    { id: 'indie-folk', name: 'Indie Folk', category: 'folk', description: 'インディーフォーク' },
    { id: 'bluegrass', name: 'Bluegrass', category: 'folk', description: 'ブルーグラス' },
    
    // World Music
    { id: 'afrobeat', name: 'Afrobeat', category: 'world', description: 'アフロビート' },
    { id: 'afrobeats', name: 'Afrobeats', category: 'world', description: 'アフロビーツ（現代西アフリカ）' },
    { id: 'reggae', name: 'Reggae', category: 'world', description: 'レゲエ' },
    { id: 'ska', name: 'Ska', category: 'world', description: 'スカ' },
    { id: 'bossa-nova', name: 'Bossa Nova', category: 'world', description: 'ボサノヴァ' },
    { id: 'latin', name: 'Latin', category: 'world', description: 'ラテン' },
    { id: 'reggaeton', name: 'Reggaeton', category: 'world', description: 'レゲトン' },
    
    // Classical & Orchestral
    { id: 'classical', name: 'Classical', category: 'classical', description: 'クラシック' },
    { id: 'orchestral', name: 'Orchestral', category: 'classical', description: 'オーケストラ' },
    { id: 'cinematic', name: 'Cinematic', category: 'classical', description: 'シネマティック' },
    { id: 'neo-classical', name: 'Neo-Classical', category: 'classical', description: 'ネオクラシカル' },
    
    // Experimental & Avant-garde
    { id: 'experimental', name: 'Experimental', category: 'experimental', description: '実験的' },
    { id: 'noise', name: 'Noise', category: 'experimental', description: 'ノイズ' },
    { id: 'post-rock', name: 'Post-Rock', category: 'experimental', description: 'ポストロック' },
    { id: 'hyperpop', name: 'Hyperpop', category: 'experimental', description: 'ハイパーポップ' },
    { id: 'vaporwave', name: 'Vaporwave', category: 'experimental', description: 'ヴェイパーウェーブ' },
    
    // Pop & Mainstream 拡張
    { id: 'c-pop', name: 'C-Pop', category: 'mainstream', description: '中国のポップミュージック' },
    { id: 'bedroom-pop', name: 'Bedroom Pop', category: 'mainstream', description: 'ローファイなインディーポップ' },
    { id: 'dream-pop', name: 'Dream Pop', category: 'mainstream', description: '夢幻的なポップ' },
    { id: 'electropop', name: 'Electropop', category: 'mainstream', description: 'エレクトロニック・ポップ' },
    { id: 'art-pop', name: 'Art Pop', category: 'mainstream', description: '芸術的なポップ' },
    { id: 'city-pop', name: 'City Pop', category: 'mainstream', description: '80年代日本のシティポップ' },
    
    // Rock & Alternative 拡張
    { id: 'post-punk', name: 'Post-Punk', category: 'rock', description: 'ポストパンク' },
    { id: 'math-rock', name: 'Math Rock', category: 'rock', description: '数学的なロック' },
    { id: 'garage-rock', name: 'Garage Rock', category: 'rock', description: 'ガレージロック' },
    { id: 'psychedelic-rock', name: 'Psychedelic Rock', category: 'rock', description: 'サイケデリックロック' },
    { id: 'progressive-rock', name: 'Progressive Rock', category: 'rock', description: 'プログレッシブロック' },
    { id: 'emo', name: 'Emo', category: 'rock', description: 'エモ' },
    { id: 'hardcore', name: 'Hardcore', category: 'rock', description: 'ハードコア' },
    { id: 'post-hardcore', name: 'Post-Hardcore', category: 'rock', description: 'ポストハードコア' },
    { id: 'doom-metal', name: 'Doom Metal', category: 'rock', description: 'ドゥームメタル' },
    { id: 'stoner-rock', name: 'Stoner Rock', category: 'rock', description: 'ストーナーロック' },
    
    // Electronic & Dance 拡張
    { id: 'deep-house', name: 'Deep House', category: 'electronic', description: 'ディープハウス' },
    { id: 'tech-house', name: 'Tech House', category: 'electronic', description: 'テックハウス' },
    { id: 'progressive-house', name: 'Progressive House', category: 'electronic', description: 'プログレッシブハウス' },
    { id: 'trance', name: 'Trance', category: 'electronic', description: 'トランス' },
    { id: 'hardstyle', name: 'Hardstyle', category: 'electronic', description: 'ハードスタイル' },
    { id: 'uk-garage', name: 'UK Garage', category: 'electronic', description: 'UKガラージ' },
    { id: 'breakbeat', name: 'Breakbeat', category: 'electronic', description: 'ブレイクビート' },
    { id: 'idm', name: 'IDM', category: 'electronic', description: 'インテリジェント・ダンス・ミュージック' },
    { id: 'acid-house', name: 'Acid House', category: 'electronic', description: 'アシッドハウス' },
    { id: 'minimal-techno', name: 'Minimal Techno', category: 'electronic', description: 'ミニマルテクノ' },
    { id: 'industrial', name: 'Industrial', category: 'electronic', description: 'インダストリアル' },
    { id: 'glitch', name: 'Glitch', category: 'electronic', description: 'グリッチ' },
    { id: 'future-bass', name: 'Future Bass', category: 'electronic', description: 'フューチャーベース' },
    { id: 'liquid-dnb', name: 'Liquid DnB', category: 'electronic', description: 'リキッドドラムンベース' },
    { id: 'bass-music', name: 'Bass Music', category: 'electronic', description: 'ベースミュージック' },
    
    // Hip Hop & R&B 拡張
    { id: 'boom-bap', name: 'Boom Bap', category: 'hip-hop', description: 'ブームバップ' },
    { id: 'conscious-rap', name: 'Conscious Rap', category: 'hip-hop', description: 'コンシャス・ラップ' },
    { id: 'old-school-hip-hop', name: 'Old School Hip Hop', category: 'hip-hop', description: 'オールドスクール・ヒップホップ' },
    { id: 'alternative-hip-hop', name: 'Alternative Hip Hop', category: 'hip-hop', description: 'オルタナティブ・ヒップホップ' },
    { id: 'contemporary-rnb', name: 'Contemporary R&B', category: 'hip-hop', description: 'コンテンポラリーR&B' },
    { id: 'alternative-rnb', name: 'Alternative R&B', category: 'hip-hop', description: 'オルタナティブR&B' },
    { id: 'funk', name: 'Funk', category: 'hip-hop', description: 'ファンク' },
    { id: 'gospel', name: 'Gospel', category: 'hip-hop', description: 'ゴスペル' },
    { id: 'new-jack-swing', name: 'New Jack Swing', category: 'hip-hop', description: 'ニュージャックスウィング' },
    { id: 'cloud-rap', name: 'Cloud Rap', category: 'hip-hop', description: 'クラウドラップ' },
    { id: 'grime', name: 'Grime', category: 'hip-hop', description: 'グライム' },
    { id: 'afroswing', name: 'Afroswing', category: 'hip-hop', description: 'アフロスウィング' },
    
    // Jazz & Blues 拡張
    { id: 'bebop', name: 'Bebop', category: 'jazz', description: 'ビバップ' },
    { id: 'cool-jazz', name: 'Cool Jazz', category: 'jazz', description: 'クールジャズ' },
    { id: 'hard-bop', name: 'Hard Bop', category: 'jazz', description: 'ハードバップ' },
    { id: 'swing', name: 'Swing', category: 'jazz', description: 'スウィング' },
    { id: 'acid-jazz', name: 'Acid Jazz', category: 'jazz', description: 'アシッドジャズ' },
    { id: 'nu-jazz', name: 'Nu Jazz', category: 'jazz', description: 'ニュージャズ' },
    { id: 'latin-jazz', name: 'Latin Jazz', category: 'jazz', description: 'ラテンジャズ' },
    { id: 'free-jazz', name: 'Free Jazz', category: 'jazz', description: 'フリージャズ' },
    
    // Folk & Country 拡張
    { id: 'alt-country', name: 'Alt-Country', category: 'folk', description: 'オルタナティブカントリー' },
    { id: 'country-pop', name: 'Country Pop', category: 'folk', description: 'カントリーポップ' },
    { id: 'outlaw-country', name: 'Outlaw Country', category: 'folk', description: 'アウトローカントリー' },
    { id: 'celtic', name: 'Celtic', category: 'folk', description: 'ケルト音楽' },
    { id: 'psych-folk', name: 'Psych Folk', category: 'folk', description: 'サイケデリック・フォーク' },
    { id: 'chamber-folk', name: 'Chamber Folk', category: 'folk', description: 'チェンバー・フォーク' },
    
    // Latin & Caribbean (新カテゴリ)
    { id: 'bachata', name: 'Bachata', category: 'latin', description: 'バチャータ' },
    { id: 'salsa', name: 'Salsa', category: 'latin', description: 'サルサ' },
    { id: 'merengue', name: 'Merengue', category: 'latin', description: 'メレンゲ' },
    { id: 'cumbia', name: 'Cumbia', category: 'latin', description: 'クンビア' },
    { id: 'samba', name: 'Samba', category: 'latin', description: 'サンバ' },
    { id: 'bolero', name: 'Bolero', category: 'latin', description: 'ボレロ' },
    { id: 'mariachi', name: 'Mariachi', category: 'latin', description: 'マリアッチ' },
    { id: 'tango', name: 'Tango', category: 'latin', description: 'タンゴ' },
    
    // African & World 拡張
    { id: 'highlife', name: 'Highlife', category: 'world', description: 'ハイライフ' },
    { id: 'dancehall', name: 'Dancehall', category: 'world', description: 'ダンスホール' },
    { id: 'soca', name: 'Soca', category: 'world', description: 'ソカ' },
    { id: 'calypso', name: 'Calypso', category: 'world', description: 'カリプソ' },
    { id: 'bhangra', name: 'Bhangra', category: 'world', description: 'バングラ' },
    { id: 'bollywood', name: 'Bollywood', category: 'world', description: 'ボリウッド' },
    { id: 'qawwali', name: 'Qawwali', category: 'world', description: 'カッワーリー' },
    { id: 'gamelan', name: 'Gamelan', category: 'world', description: 'ガムラン' },
    { id: 'klezmer', name: 'Klezmer', category: 'world', description: 'クレズマー' }
];

// カテゴリ別のグループ化
const GENRE_CATEGORIES = {
    mainstream: { name: 'Pop & Mainstream', color: '#FF6B6B' },
    rock: { name: 'Rock & Alternative', color: '#4ECDC4' },
    electronic: { name: 'Electronic & Dance', color: '#45B7D1' },
    'hip-hop': { name: 'Hip Hop & R&B', color: '#96CEB4' },
    jazz: { name: 'Jazz & Blues', color: '#FFEAA7' },
    folk: { name: 'Folk & Country', color: '#DDA0DD' },
    latin: { name: 'Latin & Caribbean', color: '#FFA726' },
    world: { name: 'World Music', color: '#98D8C8' },
    classical: { name: 'Classical & Orchestral', color: '#F7DC6F' },
    experimental: { name: 'Experimental', color: '#BB8FCE' }
};

// 人気のジャンル組み合わせ（プリセット用）
const POPULAR_COMBINATIONS = [
    ['pop', 'electronic', 'indie-pop'],
    ['hip-hop', 'rnb', 'trap'],
    ['rock', 'indie-rock', 'alternative'],
    ['house', 'techno', 'ambient'],
    ['jazz', 'neo-soul', 'fusion'],
    ['folk', 'indie-folk', 'americana'],
    ['afrobeats', 'reggaeton', 'latin'],
    ['synthwave', 'vaporwave', 'ambient']
];

// Chrome Extension用にグローバルに公開
window.MUSIC_GENRES = MUSIC_GENRES;
window.GENRE_CATEGORIES = GENRE_CATEGORIES;
window.POPULAR_COMBINATIONS = POPULAR_COMBINATIONS;