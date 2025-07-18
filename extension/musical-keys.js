// Chrome Extension用 - 音楽キー (export削除版)
// 音楽のキー（12メジャー + 12マイナー）
const MUSICAL_KEYS = [
    // メジャーキー
    { id: 'c-major', name: 'C Major', category: 'major', notation: 'C', description: '明るく開放的' },
    { id: 'c-sharp-major', name: 'C# Major', category: 'major', notation: 'C#', description: '鋭く華やか' },
    { id: 'd-major', name: 'D Major', category: 'major', notation: 'D', description: '輝かしく堂々' },
    { id: 'e-flat-major', name: 'E♭ Major', category: 'major', notation: 'E♭', description: '温かく包み込む' },
    { id: 'e-major', name: 'E Major', category: 'major', notation: 'E', description: '力強く情熱的' },
    { id: 'f-major', name: 'F Major', category: 'major', notation: 'F', description: '牧歌的で平和' },
    { id: 'f-sharp-major', name: 'F# Major', category: 'major', notation: 'F#', description: '光輝く希望' },
    { id: 'g-major', name: 'G Major', category: 'major', notation: 'G', description: '自然で親しみやすい' },
    { id: 'a-flat-major', name: 'A♭ Major', category: 'major', notation: 'A♭', description: '優雅で上品' },
    { id: 'a-major', name: 'A Major', category: 'major', notation: 'A', description: '晴れやかで明朗' },
    { id: 'b-flat-major', name: 'B♭ Major', category: 'major', notation: 'B♭', description: '穏やかで安定' },
    { id: 'b-major', name: 'B Major', category: 'major', notation: 'B', description: '神秘的で崇高' },
    
    // マイナーキー
    { id: 'c-minor', name: 'C Minor', category: 'minor', notation: 'Cm', description: '悲劇的で深刻' },
    { id: 'c-sharp-minor', name: 'C# Minor', category: 'minor', notation: 'C#m', description: '情熱的で激しい' },
    { id: 'd-minor', name: 'D Minor', category: 'minor', notation: 'Dm', description: '悲しく美しい' },
    { id: 'e-flat-minor', name: 'E♭ Minor', category: 'minor', notation: 'E♭m', description: '暗く重々しい' },
    { id: 'e-minor', name: 'E Minor', category: 'minor', notation: 'Em', description: '憂鬱で内省的' },
    { id: 'f-minor', name: 'F Minor', category: 'minor', notation: 'Fm', description: '深い悲しみ' },
    { id: 'f-sharp-minor', name: 'F# Minor', category: 'minor', notation: 'F#m', description: '切ない美しさ' },
    { id: 'g-minor', name: 'G Minor', category: 'minor', notation: 'Gm', description: 'ドラマチックで情熱的' },
    { id: 'g-sharp-minor', name: 'G# Minor', category: 'minor', notation: 'G#m', description: '神秘的で幻想的' },
    { id: 'a-minor', name: 'A Minor', category: 'minor', notation: 'Am', description: '純粋で素朴' },
    { id: 'b-flat-minor', name: 'B♭ Minor', category: 'minor', notation: 'B♭m', description: '暗く陰鬱' },
    { id: 'b-minor', name: 'B Minor', category: 'minor', notation: 'Bm', description: '孤独で瞑想的' }
];

// キーの特徴的な使用例
const KEY_USAGE_EXAMPLES = {
    'c-major': ['The Beatles - Let It Be', 'John Lennon - Imagine'],
    'g-major': ['The Beatles - Here Comes the Sun', 'Ed Sheeran - Shape of You'],
    'f-major': ['The Beatles - Yesterday', 'Adele - Someone Like You'],
    'a-minor': ['The Beatles - Eleanor Rigby', 'Pink Floyd - Another Brick in the Wall'],
    'e-minor': ['The Beatles - We Can Work It Out', 'R.E.M. - Losing My Religion'],
    'd-major': ['The Beatles - Hey Jude', 'John Denver - Country Roads']
};

// 楽器との相性
const KEY_INSTRUMENT_COMPATIBILITY = {
    'c-major': ['Piano', 'Vocals', 'Guitar'],
    'g-major': ['Guitar', 'Violin', 'Vocals'],
    'f-major': ['Piano', 'Brass', 'Vocals'],
    'e-major': ['Guitar', 'Bass', 'Drums'],
    'd-major': ['Violin', 'Trumpet', 'Guitar'],
    'a-major': ['Guitar', 'Mandolin', 'Vocals']
};

// 人気のキー進行
const POPULAR_PROGRESSIONS = {
    'c-major': ['C - Am - F - G', 'C - F - G - C'],
    'g-major': ['G - Em - C - D', 'G - C - D - G'],
    'f-major': ['F - Dm - Bb - C', 'F - Bb - C - F'],
    'a-minor': ['Am - F - C - G', 'Am - Dm - G - C'],
    'e-minor': ['Em - C - G - D', 'Em - Am - B - Em'],
    'd-major': ['D - Bm - G - A', 'D - G - A - D']
};

// Chrome Extension用にグローバルに公開
window.MUSICAL_KEYS = MUSICAL_KEYS;
window.POPULAR_PROGRESSIONS = POPULAR_PROGRESSIONS;