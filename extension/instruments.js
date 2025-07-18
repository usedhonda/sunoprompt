// Chrome Extension用 - 楽器カテゴリとデータ
// 楽器カテゴリ
const INSTRUMENT_CATEGORIES = {
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

// 楽器の詳細データ（オプション）
const INSTRUMENT_DETAILS = {
    "Piano": { emoji: "🎹", description: "定番の鍵盤楽器" },
    "Guitar": { emoji: "🎸", description: "汎用的な弦楽器" },
    "Synthesizer": { emoji: "🎹", description: "電子音楽の主役" },
    "Drums": { emoji: "🥁", description: "リズムの基盤" },
    "Saxophone": { emoji: "🎷", description: "ジャズの花形" },
    "Violin": { emoji: "🎻", description: "クラシックの女王" },
    "Bass": { emoji: "🎸", description: "低音域の支柱" },
    "Trumpet": { emoji: "🎺", description: "華やかな金管楽器" },
    // ... 他の楽器の詳細も追加可能
};

// Chrome Extension用にグローバルに公開
window.INSTRUMENT_CATEGORIES = INSTRUMENT_CATEGORIES;
window.INSTRUMENT_DETAILS = INSTRUMENT_DETAILS;