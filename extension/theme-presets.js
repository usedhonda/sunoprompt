// Chrome Extension用 - テーマプリセット (export削除版)
// テーマプリセットカテゴリ
const THEME_CATEGORIES = {
    love_general: {
        name: "恋愛・人間関係",
        color: "#f093fb",
        themes: ["nostalgic_love", "first_crush", "long_distance", "coffee_shop_meeting", "text_message_love", "summer_festival", "silent_understanding", "long_distance_longing", "social_media_checking", "gift_giving_anxiety", "meeting_parents", "unrequited_love", "confession_moment", "new_relationship", "honeymoon_phase", "relationship_doubt"]
    },
    love_male: {
        name: "恋愛・人間関係（男性視点）",
        color: "#4a90e2",
        themes: ["guy_shy_confession", "protective_instinct", "male_vulnerability", "guy_heartbreak", "jealous_boyfriend", "commitment_fear", "providing_pressure", "emotional_walls", "guy_first_love", "midnight_thinking"]
    },
    love_female: {
        name: "恋愛・人間関係（女性視点）",
        color: "#e91e63",
        themes: ["girl_intuition", "emotional_support", "independence_vs_love", "female_strength", "nurturing_love", "girl_heartbreak", "romantic_dreams", "emotional_expression", "girl_confidence", "maternal_feelings"]
    },
    urban: {
        name: "都市・現代生活",
        color: "#667eea",
        themes: ["digital_detox", "urban_solitude", "office_escape", "crowded_station", "late_night_convenience", "rooftop_view", "elevator_silence", "cafe_working", "delivery_waiting", "subway_poetry", "neon_reflection", "apartment_isolation"]
    },
    nature: {
        name: "季節・自然",
        color: "#4facfe",
        themes: ["spring_awakening", "summer_night", "autumn_leaves", "winter_solitude", "rainy_reflection", "morning_sunshine", "cherry_blossom_anxiety", "humid_summer_lethargy", "first_snow_magic", "typhoon_solitude"]
    },
    growth: {
        name: "成長・人生",
        color: "#43e97b",
        themes: ["coming_of_age", "quarter_life_crisis", "dream_chaser", "self_acceptance", "independence", "mentor_encounter", "comfort_zone_exit", "failure_recovery", "identity_search", "wisdom_gained", "career_crossroads", "skill_mastery", "work_passion_discovery"]
    },
    travel: {
        name: "旅・冒険",
        color: "#fa709a",
        themes: ["midnight_drive", "train_journey", "airport_departure", "backpack_adventure", "lighthouse_beacon", "mountain_hiking", "seaside_wandering", "foreign_city_discovery", "camping_under_stars", "road_trip_freedom"]
    },
    dream: {
        name: "夢・幻想",
        color: "#a8edea",
        themes: ["lucid_dream", "stargazing", "magic_hour", "parallel_universe", "dream_within_dream", "floating_consciousness", "time_loop_escape", "mirror_world", "childhood_imaginary_friend", "recurring_nightmare"]
    },
    social: {
        name: "社会・時代",
        color: "#fda085",
        themes: ["social_media_fatigue", "remote_work_isolation", "climate_anxiety", "generation_gap", "gig_economy_struggle", "subscription_fatigue", "privacy_paradox", "influencer_burnout", "digital_minimalism", "algorithm_resistance", "overtime_exhaustion", "workplace_friendship", "first_job_anxiety", "promotion_pressure"]
    },
    healing: {
        name: "癒し・内省",
        color: "#d299c2",
        themes: ["meditation_moment", "forest_therapy", "hot_spring_serenity", "yoga_flow", "candlelight_reflection", "journal_writing", "breath_awareness", "temple_visit", "sound_healing", "moonlight_meditation"]
    },
    creative: {
        name: "創造・芸術",
        color: "#ffecd2",
        themes: ["creative_flow", "art_gallery_visit", "music_discovery", "street_performance", "midnight_painting", "poetry_writing", "craft_workshop", "dance_expression", "photography_walk", "ceramic_creation"]
    },
    memory: {
        name: "記憶・ノスタルジア",
        color: "#b19cd9",
        themes: ["old_photograph", "school_days", "childhood_friend", "first_apartment", "old_diary", "music_box", "hometown_station", "sunset_memory", "letter_rediscovery", "time_capsule"]
    },
    emotions: {
        name: "感情・心境",
        color: "#ff9a9e",
        themes: ["midnight_tears", "overwhelming_joy", "quiet_anger", "sudden_loneliness", "peaceful_acceptance", "nervous_excitement", "melancholic_beauty", "hope_against_hope", "bittersweet_goodbye", "silent_understanding"]
    }
};

// テーマプリセットデータ - 大量追加版
const THEME_PRESETS = {
    // 都市・現代生活系
    digital_detox: {
        theme: "深夜にスマートフォンを眺める若い女性。商業的で示唆的なデジタル広告のノイズに対して冷めた視線を向け、自分の確かな感覚だけを信じる内面の葛藤と自己肯定を描く。クールでスタイリッシュな都会的孤独感。",
        keywords: "ノイズ, フィルター, プラスチック, 画面の光, スマートフォン, デジタル, 広告",
        genres: ["Synthpop", "Electronic", "Indie Pop"],
        mood: "Melancholic",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 95,
        key: "A Minor"
    },
    urban_solitude: {
        theme: "大都市の夜景を見下ろしながら感じる孤独感。多くの人に囲まれているのに誰ともつながれない現代人の心境。ネオンライトと高層ビルの間で自分の存在意義を問い直す内省的な瞬間。",
        keywords: "都市の光, 高層ビル, 群衆, 孤独, 夜景, ネオンライト, 現代人",
        genres: ["Ambient", "Electronic", "Neo-Soul"],
        mood: "Melancholic",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 70,
        key: "D Minor"
    },
    office_escape: {
        theme: "終電間際のオフィスビル。残業で疲れた心に突然訪れる解放感。窓の外の夜景を見つめながら、本当に大切なものを見つけ出す物語。",
        keywords: "オフィス, 残業, 解放感, 窓, 終電, 夜景, 疲労",
        genres: ["Indie Pop", "Alternative", "Synthpop"],
        mood: "Uplifting",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 105,
        key: "G Major"
    },
    crowded_station: {
        theme: "朝の通勤ラッシュの駅。人波に流されながらも自分だけの時間を見つける瞬間。イヤホンから流れる音楽が作り出す小さな聖域。",
        keywords: "駅, 人波, ラッシュ, 音楽, 通勤, イヤホン, 聖域",
        genres: ["Electronic", "Indie Rock", "Pop"],
        mood: "Energetic",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 125,
        key: "C Major"
    },
    late_night_convenience: {
        theme: "深夜のコンビニ。蛍光灯の明かりの下で偶然出会った人との短い会話。何気ない瞬間に隠された人間的な温かさを描く。",
        keywords: "コンビニ, 蛍光灯, 深夜, 出会い, 偶然, 会話, 温かさ",
        genres: ["Lo-Fi", "Indie Pop", "Electronic"],
        mood: "Calm",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 85,
        key: "F Major"
    },
    rooftop_view: {
        theme: "高層ビルの屋上から見下ろす街並み。風に吹かれながら感じる自由と孤独。都市の喧騒を離れて見つける自分だけの時間。",
        keywords: "rooftop, wind, freedom, cityscape, 屋上, 風, 自由, 街並み",
        genres: ["Ambient", "Electronic", "Indie Rock"],
        mood: "Dreamy",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 90,
        key: "E Minor"
    },
    elevator_silence: {
        theme: "エレベーターの中の沈黙。見知らぬ人との微妙な距離感と、短い時間に生まれる小さな人間ドラマ。現代都市生活の縮図。",
        keywords: "エレベーター, 沈黙, 見知らぬ人, 距離感, ドラマ, 都市生活",
        genres: ["Ambient", "Minimal", "Electronic"],
        mood: "Contemplative",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 60,
        key: "F Minor"
    },
    cafe_working: {
        theme: "カフェでのリモートワーク。コーヒーの香りとざわめきの中で集中する現代的な働き方。他人の気配を感じながらの孤独な作業。",
        keywords: "カフェ, リモートワーク, コーヒー, ざわめき, 集中, 孤独",
        genres: ["Lo-Fi", "Indie Pop", "Electronic"],
        mood: "Focused",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 85,
        key: "G Major"
    },
    delivery_waiting: {
        theme: "配達を待つ現代人の生活。アプリで追跡される荷物を待ちながら感じる便利さと依存への複雑な気持ち。",
        keywords: "配達, アプリ, 追跡, 荷物, 便利さ, 依存, 複雑",
        genres: ["Electronic", "Indie Pop", "Alternative"],
        mood: "Restless",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 100,
        key: "C Major"
    },
    subway_poetry: {
        theme: "地下鉄で見つける詩的な瞬間。車窓に映る自分の顔と、流れる地下トンネルの光が織りなす都市の美学。",
        keywords: "地下鉄, 詩的, 車窓, 地下トンネル, 光, 都市, 美学",
        genres: ["Ambient", "Indie Folk", "Electronic"],
        mood: "Poetic",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 75,
        key: "A Minor"
    },
    neon_reflection: {
        theme: "雨に濡れた街のネオンサインの反射。夜の都市が見せる色彩豊かな表情と、その美しさに隠された現代生活の孤独感。",
        keywords: "雨, ネオンサイン, 反射, 夜, 色彩, 美しさ, 孤独感",
        genres: ["Synthwave", "Electronic", "Ambient"],
        mood: "Nostalgic",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 95,
        key: "D Minor"
    },
    apartment_isolation: {
        theme: "マンションの一室での孤独。隣人の気配を感じながらも繋がりを持てない現代都市生活の矛盾と、その中で見つける小さな安らぎ。",
        keywords: "マンション, 孤独, 隣人, 気配, 繋がり, 矛盾, 安らぎ",
        genres: ["Ambient", "Indie Folk", "Electronic"],
        mood: "Introspective",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 70,
        key: "B Minor"
    },
    
    // 恋愛・人間関係系
    nostalgic_love: {
        theme: "昔の恋人との思い出を振り返る。古いアルバムや手紙を見つけて、甘酸っぱい記憶がよみがえる。時間の経過とともに美化された過去への憧憬と、現在の自分を受け入れる成熟した感情を描く。",
        keywords: "memories, photographs, letters, time, 思い出, 写真, 手紙, 時間",
        genres: ["Indie Folk", "Acoustic", "Singer-songwriter"],
        mood: "Nostalgic",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 80,
        key: "G Major"
    },
    first_crush: {
        theme: "初恋の甘酸っぱい記憶。学校の廊下で見かけた人への憧れ。純粋で一途な想いが胸を焦がす青春の1ページ。",
        keywords: "first love, school, corridor, pure, 初恋, 学校, 廊下, 純粋",
        genres: ["Pop", "Indie Pop", "Acoustic"],
        mood: "Happy",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 110,
        key: "D Major"
    },
    long_distance: {
        theme: "遠距離恋愛の切なさ。スマートフォンの画面越しに見る恋人の顔。距離が作り出す想いの強さと不安を描く現代的なラブストーリー。",
        keywords: "distance, phone, screen, longing, 距離, 電話, 画面, 憧憬",
        genres: ["Indie Pop", "Electronic", "Alternative"],
        mood: "Melancholic",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 95,
        key: "A Minor"
    },
    coffee_shop_meeting: {
        theme: "カフェで偶然再会した昔の友人。コーヒーカップを挟んで語り合う時間。変わったこと、変わらないこと、そして新しい発見。",
        keywords: "coffee, cafe, reunion, conversation, コーヒー, カフェ, 再会, 会話",
        genres: ["Acoustic", "Indie Folk", "Jazz"],
        mood: "Calm",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 75,
        key: "G Major"
    },
    text_message_love: {
        theme: "深夜のメッセージ交換。短い文章に込められた想い。既読スルーの不安と、返信が来た時の喜び。デジタル時代の恋愛模様。",
        keywords: "text, message, midnight, digital, メッセージ, 深夜, デジタル, 既読",
        genres: ["Electronic", "Indie Pop", "Synthpop"],
        mood: "Energetic",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 115,
        key: "C Major"
    },
    summer_festival: {
        theme: "夏祭りの夜。浴衣を着て歩く石畳の道。花火の音と屋台の匂い。特別な人と過ごす夏の夜の魔法のような時間。",
        keywords: "festival, summer, fireworks, yukata, 祭り, 夏, 花火, 浴衣",
        genres: ["Pop", "Folk", "Traditional"],
        mood: "Happy",
        energy: 7,
        vocal_type: "Female Solo",
        bpm: 130,
        key: "E Major"
    },
    
    // 季節・自然系
    spring_awakening: {
        theme: "桜の季節の到来。新しい生命の息吹と共に心も軽やかになる。変化への期待と不安を抱きながら、新しい章の始まりを迎える。",
        keywords: "cherry blossoms, spring, new life, change, 桜, 春, 新生, 変化",
        genres: ["Pop", "Indie Folk", "Acoustic"],
        mood: "Uplifting",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 115,
        key: "D Major"
    },
    summer_night: {
        theme: "夏の夜の海辺。波の音と星空の下で感じる無限の可能性。青春の1ページを飾る忘れられない夜の物語。",
        keywords: "beach, waves, stars, possibility, 海辺, 波, 星, 可能性",
        genres: ["Indie Pop", "Electronic", "Ambient"],
        mood: "Dreamy",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 100,
        key: "A Major"
    },
    autumn_leaves: {
        theme: "紅葉の季節。散りゆく葉を見つめながら感じる時の流れ。美しい終わりと新しい始まりの予感を描く叙情的な物語。",
        keywords: "autumn, leaves, time, beauty, 秋, 葉, 時間, 美しさ",
        genres: ["Indie Folk", "Acoustic", "Alternative"],
        mood: "Nostalgic",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 85,
        key: "F Major"
    },
    winter_solitude: {
        theme: "雪の降る静かな街。白い世界に包まれた孤独感と安らぎ。寒さの中で感じる心の温かさを描く冬の詩。",
        keywords: "snow, winter, solitude, warmth, 雪, 冬, 孤独, 温かさ",
        genres: ["Ambient", "Electronic", "Neo-Classical"],
        mood: "Calm",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 65,
        key: "C Minor"
    },
    rainy_reflection: {
        theme: "雨の日の部屋で過ごす静かな時間。窓を打つ雨音を聞きながら、人生の様々な出来事を振り返る。喜びも悲しみも受け入れ、穏やかな気持ちで現在を見つめ直す瞑想的な時間。",
        keywords: "rain, window, silence, reflection, 雨, 窓, 静寂, 内省",
        genres: ["Ambient", "Lo-Fi", "Acoustic"],
        mood: "Calm",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 60,
        key: "F Major"
    },
    morning_sunshine: {
        theme: "朝の陽射しが部屋に差し込む瞬間。新しい一日の始まりに感じる希望と可能性。昨日までの悩みが軽やかに感じられる朝の魔法。",
        keywords: "morning, sunshine, hope, possibility, 朝, 陽射し, 希望, 可能性",
        genres: ["Pop", "Indie Pop", "Acoustic"],
        mood: "Happy",
        energy: 7,
        vocal_type: "Female Solo",
        bpm: 125,
        key: "G Major"
    },
    cherry_blossom_anxiety: {
        theme: "桜の季節に感じる焦燥感。美しい花の短さが人生の儚さを思い起こさせる。新年度の始まりと共に押し寄せる変化への不安。",
        keywords: "桜, 焦燥感, 美しい, 儚さ, 人生, 新年度, 変化, 不安",
        genres: ["Indie Pop", "Alternative", "Folk"],
        mood: "Bittersweet",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 90,
        key: "F Major"
    },
    humid_summer_lethargy: {
        theme: "梅雨時期の怠惰な午後。湿気と暑さに包まれて動きたくない気持ち。時間がゆっくり流れる夏の昼下がりの心地よい無気力感。",
        keywords: "梅雨, 怠惰, 湿気, 暑さ, 動きたくない, ゆっくり, 無気力感",
        genres: ["Lo-Fi", "Ambient", "Indie Folk"],
        mood: "Lethargic",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 65,
        key: "D Minor"
    },
    first_snow_magic: {
        theme: "今冬初めての雪が降る夜。窓から見える雪景色に子供の頃の記憶がよみがえる。純白の世界が心を清めてくれる奇跡的な瞬間。",
        keywords: "初雪, 雪景色, 子供の頃, 記憶, 純白, 清める, 奇跡",
        genres: ["Ambient", "Neo-Classical", "Indie Folk"],
        mood: "Wonder",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 70,
        key: "C Major"
    },
    typhoon_solitude: {
        theme: "台風の夜の孤独感。強風と雨音に包まれた部屋で感じる自然の力強さと、その中で守られている安心感の矛盾した感情。",
        keywords: "台風, 孤独感, 強風, 雨音, 自然, 力強さ, 守られている, 安心感",
        genres: ["Ambient", "Electronic", "Indie Rock"],
        mood: "Contemplative",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 80,
        key: "A Minor"
    },
    
    // 成長・人生系
    coming_of_age: {
        theme: "青春の終わりと大人への移行期。学校を卒業し、新しい環境に飛び込む不安と期待。過去の自分と決別し、未来への希望を抱きながら一歩ずつ成長していく姿を描く。",
        keywords: "graduation, future, hope, fear, 卒業, 未来, 希望, 不安",
        genres: ["Pop", "Indie Rock", "Alternative"],
        mood: "Uplifting",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 120,
        key: "C Major"
    },
    quarter_life_crisis: {
        theme: "20代半ばの迷い。思い描いていた理想と現実のギャップに悩む日々。それでも前向きに歩き続ける意志を描く現代的な成長物語。",
        keywords: "crisis, reality, ideal, growth, 危機, 現実, 理想, 成長",
        genres: ["Indie Rock", "Alternative", "Pop"],
        mood: "Melancholic",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 100,
        key: "E Minor"
    },
    dream_chaser: {
        theme: "夢を追いかける情熱と挫折。諦めそうになった時に思い出す初心の気持ち。困難を乗り越えて前進する強い意志を歌う。",
        keywords: "dream, passion, perseverance, determination, 夢, 情熱, 忍耐, 決意",
        genres: ["Rock", "Pop", "Alternative"],
        mood: "Energetic",
        energy: 8,
        vocal_type: "Female Solo",
        bpm: 140,
        key: "D Major"
    },
    self_acceptance: {
        theme: "ありのままの自分を受け入れる瞬間。他人と比較することから解放され、自分だけの価値を見つける。内面の美しさに気づく自己肯定の物語。",
        keywords: "acceptance, self-love, beauty, worth, 受容, 自己愛, 美しさ, 価値",
        genres: ["Indie Pop", "Alternative", "Soul"],
        mood: "Uplifting",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 110,
        key: "F Major"
    },
    independence: {
        theme: "一人暮らしを始めた日。親元を離れて感じる自由と不安。新しい環境で自分らしく生きる決意を固める成長の物語。",
        keywords: "independence, freedom, anxiety, growth, 独立, 自由, 不安, 成長",
        genres: ["Indie Pop", "Folk", "Alternative"],
        mood: "Uplifting",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 105,
        key: "G Major"
    },
    mentor_encounter: {
        theme: "人生の師匠との出会い。年上の人からの教えが人生観を変える瞬間。経験から学ぶ知恵の価値と感謝の気持ち。",
        keywords: "師匠, 出会い, 教え, 人生観, 経験, 知恵, 感謝",
        genres: ["Folk", "Indie Rock", "Singer-songwriter"],
        mood: "Grateful",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 85,
        key: "D Major"
    },
    comfort_zone_exit: {
        theme: "慣れ親しんだ環境から飛び出す勇気。安全地帯を離れる不安と期待。新しい挑戦が待つ未知の世界への第一歩。",
        keywords: "慣れ親しんだ, 飛び出す, 勇気, 安全地帯, 挑戦, 未知",
        genres: ["Pop", "Alternative", "Electronic"],
        mood: "Courageous",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 120,
        key: "A Major"
    },
    failure_recovery: {
        theme: "挫折からの立ち直り。失敗の痛みを受け入れながら、そこから学んだ教訓を糧に再び歩き始める復活の物語。",
        keywords: "挫折, 立ち直り, 失敗, 痛み, 教訓, 糧, 復活",
        genres: ["Alternative", "Rock", "Indie Pop"],
        mood: "Resilient",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 110,
        key: "F Major"
    },
    identity_search: {
        theme: "本当の自分探しの旅。社会の期待と自分の気持ちの間で揺れ動く心。アイデンティティを確立していく過程の葛藤と発見。",
        keywords: "自分探し, 社会, 期待, 気持ち, アイデンティティ, 葛藤, 発見",
        genres: ["Indie Folk", "Alternative", "Singer-songwriter"],
        mood: "Searching",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 95,
        key: "B Minor"
    },
    wisdom_gained: {
        theme: "年を重ねて得た智慧。若い頃には分からなかった人生の深さと複雑さを理解する成熟した視点からの人生讃歌。",
        keywords: "年を重ね, 智慧, 若い頃, 深さ, 複雑さ, 成熟, 讃歌",
        genres: ["Folk", "Blues", "Singer-songwriter"],
        mood: "Wise",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 75,
        key: "E Minor"
    },
    career_crossroads: {
        theme: "キャリアの分岐点に立つ瞬間。安定した道か挑戦的な道か。人生を左右する決断を前にした深い内省と覚悟。",
        keywords: "キャリア, 分岐点, 安定, 挑戦, 決断, 人生, 内省, 覚悟",
        genres: ["Alternative", "Indie Rock", "Folk"],
        mood: "Contemplative",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 100,
        key: "D Minor"
    },
    skill_mastery: {
        theme: "長年の努力が実を結ぶ瞬間。技術を習得する喜びと、まだ見ぬ高みへの憧れ。成長し続ける人生の充実感。",
        keywords: "努力, 実を結ぶ, 技術, 習得, 喜び, 高み, 憧れ, 充実感",
        genres: ["Pop", "Indie Pop", "Rock"],
        mood: "Accomplished",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 115,
        key: "A Major"
    },
    work_passion_discovery: {
        theme: "仕事に情熱を見つけた日。労働が使命に変わる瞬間。やりがいを感じながら歩む新しい人生の始まり。",
        keywords: "仕事, 情熱, 労働, 使命, やりがい, 人生, 始まり",
        genres: ["Pop", "Alternative", "Indie Rock"],
        mood: "Inspired",
        energy: 7,
        vocal_type: "Female Solo",
        bpm: 125,
        key: "E Major"
    },
    
    // 旅・冒険系
    midnight_drive: {
        theme: "深夜の高速道路を一人で運転する解放感。日常から逃避し、風を感じながら新しい自分を発見する旅路。エンジン音と共に流れる景色が心の奥底にある感情を呼び覚ます。",
        keywords: "highway, freedom, wind, escape, 高速道路, 自由, 風, 逃避",
        genres: ["Synthwave", "Electronic", "Indie Pop"],
        mood: "Energetic",
        energy: 7,
        vocal_type: "Female Solo",
        bpm: 110,
        key: "E Major"
    },
    train_journey: {
        theme: "窓の外に流れる景色を眺めながらの電車の旅。目的地へ向かう期待と、過ぎ去る風景への郷愁。移り変わる景色と共に心も旅をする。",
        keywords: "train, window, scenery, journey, 電車, 窓, 景色, 旅",
        genres: ["Indie Folk", "Acoustic", "Ambient"],
        mood: "Dreamy",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 85,
        key: "A Major"
    },
    airport_departure: {
        theme: "空港での別れと旅立ち。新しい場所への期待と、残していくものへの想い。飛行機の窓から見下ろす街並みと雲海。",
        keywords: "airport, departure, clouds, journey, 空港, 出発, 雲, 旅",
        genres: ["Electronic", "Ambient", "Indie Pop"],
        mood: "Melancholic",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 95,
        key: "C Major"
    },
    backpack_adventure: {
        theme: "バックパック一つで始まる冒険。地図にない道を歩き、偶然の出会いを楽しむ。自由な旅路で見つける新しい自分。",
        keywords: "backpack, adventure, map, discovery, バックパック, 冒険, 地図, 発見",
        genres: ["Folk", "Indie Rock", "World"],
        mood: "Energetic",
        energy: 7,
        vocal_type: "Female Solo",
        bpm: 120,
        key: "D Major"
    },
    lighthouse_beacon: {
        theme: "海辺の灯台。嵐の夜に船を導く光のように、困難な時に希望を見つける物語。一人で立つ灯台の孤独と使命感。",
        keywords: "lighthouse, beacon, storm, hope, 灯台, 光, 嵐, 希望",
        genres: ["Indie Folk", "Alternative", "Ambient"],
        mood: "Dreamy",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 75,
        key: "F Major"
    },
    mountain_hiking: {
        theme: "山道を歩く一人旅。足音と呼吸音だけが響く静寂の中で、自分自身と向き合う内なる冒険。頂上で見る景色への憧れ。",
        keywords: "山道, 一人旅, 足音, 呼吸, 静寂, 内なる, 頂上",
        genres: ["Folk", "Ambient", "Indie Rock"],
        mood: "Contemplative",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 90,
        key: "C Major"
    },
    seaside_wandering: {
        theme: "海岸線を歩く黄昏時。波の音と潮風に包まれながら、無限に続く水平線を眺める瞑想的な時間。",
        keywords: "海岸線, 黄昏, 波音, 潮風, 水平線, 瞑想, 無限",
        genres: ["Ambient", "Indie Folk", "Electronic"],
        mood: "Peaceful",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 70,
        key: "D Major"
    },
    foreign_city_discovery: {
        theme: "異国の街での迷子体験。地図を頼りに歩く石畳の道。言葉の壁を越えて出会う人々の温かさと、旅の醍醐味。",
        keywords: "異国, 迷子, 地図, 石畳, 言葉の壁, 出会い, 醍醐味",
        genres: ["World", "Indie Pop", "Folk"],
        mood: "Adventurous",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 115,
        key: "G Major"
    },
    camping_under_stars: {
        theme: "星空の下でのキャンプ。焚き火を囲みながら聞く虫の声と風の音。都市生活では味わえない原始的な平和と自由。",
        keywords: "星空, キャンプ, 焚き火, 虫の声, 風音, 原始的, 平和",
        genres: ["Folk", "Acoustic", "Ambient"],
        mood: "Serene",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 65,
        key: "E Major"
    },
    road_trip_freedom: {
        theme: "終わりのないドライブ旅行。車窓から流れる景色と、行き先を決めない自由。音楽と共に駆け抜ける青春の1ページ。",
        keywords: "ドライブ, 車窓, 景色, 行き先, 自由, 音楽, 青春",
        genres: ["Rock", "Indie Pop", "Alternative"],
        mood: "Energetic",
        energy: 7,
        vocal_type: "Female Solo",
        bpm: 130,
        key: "A Major"
    },
    
    // 夢・幻想系
    lucid_dream: {
        theme: "明晰夢の世界。現実と夢の境界が曖昧になる不思議な体験。夢の中で自由に飛び回り、現実では不可能なことを体験する。",
        keywords: "lucid, dream, reality, flight, 明晰夢, 現実, 飛行, 境界",
        genres: ["Electronic", "Ambient", "Synthwave"],
        mood: "Dreamy",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 90,
        key: "A Minor"
    },
    stargazing: {
        theme: "満天の星空を見上げる夜。宇宙の広さに比べた自分の小ささを感じながらも、星座に込められた物語に想いを馳せる。",
        keywords: "stars, universe, constellation, infinity, 星, 宇宙, 星座, 無限",
        genres: ["Ambient", "Electronic", "Neo-Classical"],
        mood: "Dreamy",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 70,
        key: "E Minor"
    },
    magic_hour: {
        theme: "夕焼けの美しいマジックアワー。一日の終わりに空が見せる芸術的な色彩。この瞬間だけは時間が止まったかのような感覚。",
        keywords: "sunset, magic hour, colors, moment, 夕焼け, マジックアワー, 色彩, 瞬間",
        genres: ["Ambient", "Electronic", "Indie Pop"],
        mood: "Dreamy",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 80,
        key: "G Major"
    },
    parallel_universe: {
        theme: "もう一つの自分が存在する平行世界。違う選択をした自分と出会う想像。現実と可能性の間で揺れ動く心。",
        keywords: "parallel, universe, choice, possibility, 平行, 宇宙, 選択, 可能性",
        genres: ["Electronic", "Synthwave", "Alternative"],
        mood: "Melancholic",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 105,
        key: "B Minor"
    },
    dream_within_dream: {
        theme: "夢の中で夢を見る不思議な体験。どこまでが現実でどこからが夢なのか分からない境界線。意識の深い層で繰り広げられる内なる旅路。",
        keywords: "夢, 境界線, 意識, 現実, 層, 旅路, 体験",
        genres: ["Ambient", "Electronic", "Experimental"],
        mood: "Mysterious",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 60,
        key: "F# Minor"
    },
    floating_consciousness: {
        theme: "重力から解放された意識が宇宙空間を漂う感覚。身体を離れた魂が見つける新しい視点と自由。無重力の中で感じる究極の解放感。",
        keywords: "意識, 宇宙, 漂う, 魂, 重力, 解放, 無重力",
        genres: ["Ambient", "Space Rock", "Electronic"],
        mood: "Dreamy",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 70,
        key: "C Major"
    },
    time_loop_escape: {
        theme: "同じ日を何度も繰り返すタイムループからの脱出。運命を変えるために必要な小さな気づきと勇気。時間の檻を破る物語。",
        keywords: "タイムループ, 脱出, 運命, 気づき, 勇気, 時間, 檻",
        genres: ["Synthpop", "Electronic", "Alternative"],
        mood: "Intense",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 130,
        key: "E Minor"
    },
    mirror_world: {
        theme: "鏡の向こう側に広がる逆さまの世界。すべてが反転した不思議な空間で自分自身と向き合う内省的な旅。",
        keywords: "鏡, 逆さま, 反転, 空間, 向き合う, 内省, 旅",
        genres: ["Indie Pop", "Electronic", "Experimental"],
        mood: "Mysterious",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 90,
        key: "A Minor"
    },
    childhood_imaginary_friend: {
        theme: "子供の頃の空想の友達との再会。大人になって忘れていた純粋な想像力と無邪気さを取り戻す温かな物語。",
        keywords: "子供, 空想, 友達, 再会, 想像力, 無邪気, 純粋",
        genres: ["Indie Folk", "Acoustic", "Pop"],
        mood: "Nostalgic",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 85,
        key: "G Major"
    },
    recurring_nightmare: {
        theme: "何度も見る悪夢からの解放。恐怖と向き合い、夢の中で自分の力を取り戻していく成長の物語。闇を光に変える勇気。",
        keywords: "悪夢, 解放, 恐怖, 向き合い, 力, 成長, 勇気",
        genres: ["Alternative", "Electronic", "Rock"],
        mood: "Intense",
        energy: 7,
        vocal_type: "Female Solo",
        bpm: 140,
        key: "D Minor"
    },
    
    // 社会・時代系
    social_media_fatigue: {
        theme: "SNSに疲れた心。いいねの数に一喜一憂する日々から解放されたい願望。本当の自分を取り戻す物語。",
        keywords: "social media, likes, fatigue, authenticity, SNS, いいね, 疲労, 本当の自分",
        genres: ["Indie Pop", "Electronic", "Alternative"],
        mood: "Melancholic",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 95,
        key: "D Minor"
    },
    remote_work_isolation: {
        theme: "リモートワークの孤独感。画面越しのコミュニケーションと、家の中で過ごす単調な日々。新しい働き方への適応と人間関係の変化。",
        keywords: "remote work, isolation, screen, adaptation, リモートワーク, 孤独, 画面, 適応",
        genres: ["Electronic", "Indie Pop", "Lo-Fi"],
        mood: "Melancholic",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 85,
        key: "F Minor"
    },
    climate_anxiety: {
        theme: "環境問題への不安。地球の未来を憂い、今できることを考える若い世代の心境。小さな行動でも意味があることを信じる希望。",
        keywords: "climate, anxiety, future, action, 環境, 不安, 未来, 行動",
        genres: ["Indie Folk", "Alternative", "Ambient"],
        mood: "Melancholic",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 90,
        key: "G Minor"
    },
    generation_gap: {
        theme: "世代間のコミュニケーションギャップ。デジタルネイティブと従来世代の価値観の違い。理解し合う努力と歩み寄りの物語。",
        keywords: "generation, gap, communication, understanding, 世代, ギャップ, コミュニケーション, 理解",
        genres: ["Pop", "Indie Rock", "Folk"],
        mood: "Uplifting",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 110,
        key: "C Major"
    },
    gig_economy_struggle: {
        theme: "フリーランスとして働く現代人の不安定さ。案件に追われる日々と経済的不安。自由と引き換えに失った安定への複雑な思い。",
        keywords: "フリーランス, 不安定, 案件, 経済的不安, 自由, 安定",
        genres: ["Indie Folk", "Alternative", "Electronic"],
        mood: "Melancholic",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 95,
        key: "F Minor"
    },
    subscription_fatigue: {
        theme: "増え続けるサブスクリプション料金への疲労感。所有から利用へ変わった時代に感じる虚しさと、本当に大切なものへの渇望。",
        keywords: "サブスク, 疲労, 所有, 利用, 虚しさ, 大切, 渇望",
        genres: ["Indie Pop", "Electronic", "Alternative"],
        mood: "Contemplative",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 85,
        key: "D Minor"
    },
    privacy_paradox: {
        theme: "プライバシーと利便性のジレンマ。個人情報を差し出すことで得られる快適さと、監視社会への不安が入り混じる現代的な葛藤。",
        keywords: "プライバシー, 利便性, ジレンマ, 個人情報, 監視社会, 不安",
        genres: ["Electronic", "Synthpop", "Alternative"],
        mood: "Mysterious",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 115,
        key: "B Minor"
    },
    influencer_burnout: {
        theme: "インフルエンサーとして生きる疲労感。常に完璧な自分を演じ続ける重圧と、本当の自分を見失う恐怖。承認欲求の罠からの脱出。",
        keywords: "インフルエンサー, 疲労, 完璧, 演じる, 重圧, 承認欲求",
        genres: ["Pop", "Electronic", "Indie Rock"],
        mood: "Intense",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 125,
        key: "E Minor"
    },
    digital_minimalism: {
        theme: "デジタル機器に囲まれた生活からの解放。シンプルな暮らしへの憧れと、テクノロジーとの健全な距離感を見つける旅。",
        keywords: "デジタル, 解放, シンプル, 暮らし, テクノロジー, 距離感",
        genres: ["Acoustic", "Indie Folk", "Ambient"],
        mood: "Peaceful",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 75,
        key: "G Major"
    },
    algorithm_resistance: {
        theme: "アルゴリズムに支配される情報環境への反抗。推薦システムの檻から抜け出し、自分の意志で選択する自由を取り戻す物語。",
        keywords: "アルゴリズム, 支配, 情報, 反抗, 推薦, 檻, 自由",
        genres: ["Electronic", "Alternative", "Rock"],
        mood: "Powerful",
        energy: 7,
        vocal_type: "Female Solo",
        bpm: 135,
        key: "A Minor"
    },
    overtime_exhaustion: {
        theme: "残業続きの疲労感。蛍光灯の下で過ごす深夜のオフィス。家族への申し訳なさと、仕事への責任感の間で揺れる心境。",
        keywords: "残業, 疲労感, 蛍光灯, 深夜, オフィス, 家族, 責任感",
        genres: ["Indie Folk", "Alternative", "Lo-Fi"],
        mood: "Exhausted",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 70,
        key: "F Minor"
    },
    workplace_friendship: {
        theme: "職場で芽生えた友情。お昼休みの何気ない会話から生まれる絆。仕事の愚痴を言い合える貴重な存在への感謝。",
        keywords: "職場, 友情, お昼休み, 会話, 絆, 愚痴, 感謝",
        genres: ["Pop", "Indie Pop", "Folk"],
        mood: "Warm",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 110,
        key: "C Major"
    },
    first_job_anxiety: {
        theme: "初めての就職への不安。社会人としてやっていけるかという恐怖。新しいスーツを着た鏡の中の自分への複雑な思い。",
        keywords: "初めて, 就職, 不安, 社会人, 恐怖, スーツ, 鏡, 複雑",
        genres: ["Indie Pop", "Alternative", "Folk"],
        mood: "Nervous",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 95,
        key: "G Minor"
    },
    promotion_pressure: {
        theme: "昇進への重圧。責任の増加と期待の重さ。成功への階段を上りながらも、失うものへの不安と葛藤。",
        keywords: "昇進, 重圧, 責任, 期待, 階段, 成功, 失う, 葛藤",
        genres: ["Alternative", "Rock", "Electronic"],
        mood: "Pressured",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 120,
        key: "A Minor"
    },
    
    // 癒し・内省系
    meditation_moment: {
        theme: "瞑想の時間。呼吸に意識を向け、心を静める。忙しい日常から離れて自分自身と向き合う貴重な時間。",
        keywords: "meditation, breath, silence, peace, 瞑想, 呼吸, 静寂, 平和",
        genres: ["Ambient", "New Age", "Lo-Fi"],
        mood: "Calm",
        energy: 1,
        vocal_type: "Female Solo",
        bpm: 55,
        key: "C Major"
    },
    forest_therapy: {
        theme: "森林浴の癒し。木々の間を歩き、自然の音に耳を傾ける。都市の喧騒から離れて見つける心の平安。",
        keywords: "forest, therapy, nature, healing, 森林, 癒し, 自然, 平安",
        genres: ["Ambient", "Folk", "New Age"],
        mood: "Calm",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 65,
        key: "G Major"
    },
    hot_spring_serenity: {
        theme: "温泉での至福の時間。湯船に浸かりながら感じる身体と心の解放。山間の静けさと温かさに包まれる癒しの時間。",
        keywords: "hot spring, serenity, warmth, healing, 温泉, 静寂, 温かさ, 癒し",
        genres: ["Ambient", "New Age", "Traditional"],
        mood: "Calm",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 60,
        key: "F Major"
    },
    yoga_flow: {
        theme: "ヨガの流れるような動き。呼吸と身体の調和。心身のバランスを整える朝のルーティン。",
        keywords: "yoga, flow, breath, balance, ヨガ, 流れ, 呼吸, バランス",
        genres: ["Ambient", "Electronic", "World"],
        mood: "Calm",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 70,
        key: "D Major"
    },
    candlelight_reflection: {
        theme: "キャンドルの灯りに照らされた静かな夜。ゆらめく炎を見つめながら、一日を振り返り心を整える内省の時間。",
        keywords: "キャンドル, 灯り, ゆらめく, 炎, 振り返り, 内省, 静か",
        genres: ["Ambient", "Neo-Classical", "Meditation"],
        mood: "Peaceful",
        energy: 1,
        vocal_type: "Female Solo",
        bpm: 55,
        key: "F Major"
    },
    journal_writing: {
        theme: "日記を書く夜の習慣。ペンで紙に思いを綴る行為が心を軽やかにする。デジタル時代に残るアナログの温かさ。",
        keywords: "日記, ペン, 紙, 思い, 綴る, 軽やか, アナログ",
        genres: ["Indie Folk", "Acoustic", "Lo-Fi"],
        mood: "Contemplative",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 65,
        key: "G Major"
    },
    breath_awareness: {
        theme: "呼吸に意識を向ける瞑想の時間。吸って、吐いて、繰り返す単純なリズムに心が整っていく静寂の美しさ。",
        keywords: "呼吸, 意識, 瞑想, 吸って, 吐いて, リズム, 静寂",
        genres: ["Ambient", "Meditation", "Drone"],
        mood: "Serene",
        energy: 1,
        vocal_type: "Humming",
        bpm: 50,
        key: "C Major"
    },
    temple_visit: {
        theme: "古いお寺での祈りの時間。線香の香りと木魚の音が心を清める。現代の喧騒から離れた神聖な空間での魂の洗濯。",
        keywords: "お寺, 祈り, 線香, 木魚, 清める, 神聖, 魂",
        genres: ["Traditional", "Ambient", "World"],
        mood: "Spiritual",
        energy: 2,
        vocal_type: "Choir",
        bpm: 60,
        key: "A Minor"
    },
    sound_healing: {
        theme: "ティベタンボウルやクリスタルボウルの音による癒し。振動が身体の細胞レベルまで響き、深いリラクゼーションへ導く。",
        keywords: "ティベタンボウル, クリスタル, 音, 振動, 細胞, リラクゼーション",
        genres: ["Healing", "Ambient", "Sound Therapy"],
        mood: "Transcendent",
        energy: 1,
        vocal_type: "Instrumental",
        bpm: 45,
        key: "F# Major"
    },
    moonlight_meditation: {
        theme: "満月の夜に行う瞑想。月の光に包まれながら宇宙のエネルギーを感じる神秘的な体験。内なる女性性の覚醒。",
        keywords: "満月, 瞑想, 月光, 宇宙, エネルギー, 神秘的, 女性性",
        genres: ["Ambient", "New Age", "Ethereal"],
        mood: "Mystical",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 58,
        key: "E Major"
    },
    
    // 創造・芸術系
    creative_flow: {
        theme: "創作活動に没頭する時間。絵を描く、文章を書く、音楽を作る。時間を忘れて集中する至福の創造的瞬間。",
        keywords: "creative, flow, focus, inspiration, 創作, 集中, インスピレーション, 没頭",
        genres: ["Indie Pop", "Electronic", "Alternative"],
        mood: "Energetic",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 115,
        key: "A Major"
    },
    art_gallery_visit: {
        theme: "美術館での芸術との出会い。絵画や彫刻から受ける感動と刺激。アーティストの魂に触れる瞬間。",
        keywords: "art, gallery, painting, inspiration, 美術, ギャラリー, 絵画, インスピレーション",
        genres: ["Indie Pop", "Alternative", "Neo-Classical"],
        mood: "Dreamy",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 85,
        key: "E Major"
    },
    music_discovery: {
        theme: "新しい音楽との出会い。偶然聴いた曲に心を奪われる瞬間。音楽が人生に与える影響と感動。",
        keywords: "music, discovery, emotion, impact, 音楽, 発見, 感動, 影響",
        genres: ["Indie Pop", "Electronic", "Alternative"],
        mood: "Energetic",
        energy: 7,
        vocal_type: "Female Solo",
        bpm: 125,
        key: "B Major"
    },
    street_performance: {
        theme: "街角で見かけたストリートパフォーマンス。通りすがりの人々を魅了する音楽や芸術。日常に彩りを添える瞬間。",
        keywords: "street, performance, music, audience, 街角, パフォーマンス, 音楽, 観客",
        genres: ["Folk", "Indie Pop", "World"],
        mood: "Energetic",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 120,
        key: "D Major"
    },
    midnight_painting: {
        theme: "深夜に絵筆を握る芸術家。静寂の中で湧き上がるインスピレーション。キャンバスに魂を込める創造の時間。",
        keywords: "深夜, 絵筆, 芸術家, インスピレーション, キャンバス, 魂, 創造",
        genres: ["Ambient", "Indie Folk", "Neo-Classical"],
        mood: "Contemplative",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 75,
        key: "A Minor"
    },
    poetry_writing: {
        theme: "詩を書く静かな午後。言葉を紡ぎながら心の奥底にある感情を表現する。ペンから流れ出る魂の声。",
        keywords: "詩, 午後, 言葉, 紡ぐ, 感情, 表現, 魂",
        genres: ["Indie Folk", "Singer-songwriter", "Acoustic"],
        mood: "Introspective",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 70,
        key: "F Major"
    },
    craft_workshop: {
        theme: "手作りワークショップでの集中時間。粘土をこね、糸を紡ぎ、木を削る。手仕事の温かさと達成感に満ちた午後。",
        keywords: "手作り, ワークショップ, 粘土, 糸, 木, 手仕事, 達成感",
        genres: ["Folk", "Acoustic", "Indie Pop"],
        mood: "Peaceful",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 95,
        key: "C Major"
    },
    dance_expression: {
        theme: "身体で表現するダンスの喜び。音楽に身を委ね、感情を動きに変える。言葉を超えた表現の自由と解放感。",
        keywords: "ダンス, 身体, 表現, 音楽, 感情, 動き, 解放感",
        genres: ["Electronic", "Pop", "World"],
        mood: "Joyful",
        energy: 7,
        vocal_type: "Female Solo",
        bpm: 128,
        key: "E Major"
    },
    photography_walk: {
        theme: "カメラを手に街を歩く休日。何気ない瞬間に美しさを見つける眼差し。フレームに切り取る日常の詩。",
        keywords: "カメラ, 街, 休日, 瞬間, 美しさ, フレーム, 日常",
        genres: ["Indie Pop", "Electronic", "Lo-Fi"],
        mood: "Curious",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 105,
        key: "G Major"
    },
    ceramic_creation: {
        theme: "陶芸教室でのろくろ回し。土に触れる原始的な喜びと、形を作り上げる創造の醍醐味。手から生まれる芸術。",
        keywords: "陶芸, ろくろ, 土, 原始的, 喜び, 形, 創造",
        genres: ["Ambient", "Folk", "World"],
        mood: "Meditative",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 80,
        key: "D Major"
    },
    
    // 男性視点の恋愛テーマ
    guy_shy_confession: {
        theme: "内気な男性が好きな人への想いを伝えようと悩む日々。言葉にできない気持ちと、勇気を出せない自分への葛藤。ついに告白する瞬間への決意を描く。",
        keywords: "内気, 告白, 勇気, 躊躇, 想い, 決意, 葛藤",
        genres: ["Indie Pop", "Acoustic", "Alternative"],
        mood: "Melancholic",
        energy: 4,
        vocal_type: "Male Solo",
        bpm: 85,
        key: "F Major"
    },
    protective_instinct: {
        theme: "大切な人を守りたいという男性の本能的な想い。困難から彼女を守り、安心させてあげたい純粋な愛情と責任感。",
        keywords: "守る, 本能, 安全, 献身, 保護, 愛情, 責任感",
        genres: ["Rock", "Indie Rock", "Alternative"],
        mood: "Powerful",
        energy: 7,
        vocal_type: "Male Solo",
        bpm: 115,
        key: "E Minor"
    },
    male_vulnerability: {
        theme: "強がっている男性の内面の脆さ。誰にも見せられない弱い部分と、本当の気持ちを理解してもらいたい願望。",
        keywords: "脆さ, 弱さ, 本当の自分, 理解, 内面, 願望, 感情",
        genres: ["Indie Folk", "Alternative", "Acoustic"],
        mood: "Melancholic",
        energy: 3,
        vocal_type: "Male Solo",
        bpm: 75,
        key: "A Minor"
    },
    guy_heartbreak: {
        theme: "男性の失恋の痛み。プライドと悲しみの間で揺れ動く心。立ち直ろうとする意志と、まだ諦めきれない想いの複雑さ。",
        keywords: "失恋, プライド, 痛み, 立ち直り, 悲しみ, 複雑, 想い",
        genres: ["Alternative", "Indie Rock", "Blues"],
        mood: "Melancholic",
        energy: 5,
        vocal_type: "Male Solo",
        bpm: 95,
        key: "D Minor"
    },
    jealous_boyfriend: {
        theme: "彼女への嫉妬に苦しむ男性の心境。信じたい気持ちと疑ってしまう不安。愛情の深さゆえの複雑な感情を描く。",
        keywords: "嫉妬, 信頼, 不安, 愛情, 疑い, 複雑, 感情",
        genres: ["Alternative", "Indie Pop", "Rock"],
        mood: "Intense",
        energy: 6,
        vocal_type: "Male Solo",
        bpm: 110,
        key: "B Minor"
    },
    commitment_fear: {
        theme: "結婚への恐怖を抱く男性の内面。自由への憧れと愛する人との未来への想い。責任への不安と決断への葛藤。",
        keywords: "結婚, 恐怖, 自由, 責任, 憧れ, 未来, 決断",
        genres: ["Indie Rock", "Alternative", "Folk"],
        mood: "Melancholic",
        energy: 4,
        vocal_type: "Male Solo",
        bpm: 90,
        key: "G Minor"
    },
    providing_pressure: {
        theme: "家族を養う責任への重圧感。男性としての期待に応えようとする努力と、時にはその重さに疲れる心境。",
        keywords: "重圧, 責任, 養う, 負担, 期待, 努力, 疲労",
        genres: ["Alternative", "Indie Folk", "Rock"],
        mood: "Melancholic",
        energy: 5,
        vocal_type: "Male Solo",
        bpm: 100,
        key: "E Minor"
    },
    emotional_walls: {
        theme: "感情を隠してしまう男性の習慣。本当の気持ちを表現できずに築いてしまう心の壁。信頼できる人に心を開く勇気。",
        keywords: "壁, 感情, 表現, 信頼, 隠す, 心, 勇気",
        genres: ["Indie Rock", "Alternative", "Post-Rock"],
        mood: "Melancholic",
        energy: 4,
        vocal_type: "Male Solo",
        bpm: 85,
        key: "C Minor"
    },
    guy_first_love: {
        theme: "男性の初恋の純粋な想い。初めて人を好きになった時の混乱と喜び。すべてが新鮮で特別に感じられる青春の1ページ。",
        keywords: "初恋, 純粋, 混乱, 青春, 喜び, 新鮮, 特別",
        genres: ["Pop", "Indie Pop", "Acoustic"],
        mood: "Happy",
        energy: 6,
        vocal_type: "Male Solo",
        bpm: 115,
        key: "C Major"
    },
    midnight_thinking: {
        theme: "深夜に彼女のことを考える男性。仕事で疲れていても、ふと浮かぶ彼女の笑顔。静かな夜に感じる愛の深さ。",
        keywords: "深夜, 思考, 笑顔, 深さ, 疲労, 静寂, 愛",
        genres: ["Lo-Fi", "Indie Pop", "Electronic"],
        mood: "Dreamy",
        energy: 3,
        vocal_type: "Male Solo",
        bpm: 70,
        key: "F Major"
    },
    
    // 女性視点の恋愛テーマ  
    girl_intuition: {
        theme: "女性の直感が教えてくれる恋愛の真実。言葉では説明できない感覚で相手の気持ちを理解する繊細な心。",
        keywords: "直感, 感覚, 繊細さ, 真実, 感情, 理解, 洞察",
        genres: ["Indie Pop", "Dream Pop", "Alternative"],
        mood: "Dreamy",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 90,
        key: "A Major"
    },
    emotional_support: {
        theme: "大切な人を支えたいという女性の気持ち。相手の痛みを自分のことのように感じ、寄り添いたい愛情深い心。",
        keywords: "支え, 共感, 気遣い, 育む, 愛情, 寄り添い, 理解",
        genres: ["Indie Folk", "Acoustic", "Soul"],
        mood: "Gentle",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 80,
        key: "G Major"
    },
    independence_vs_love: {
        theme: "自立した女性として生きることと恋愛の両立。キャリアと愛情の間で悩む現代女性の複雑な心境。",
        keywords: "自立, キャリア, バランス, 現代, 両立, 選択, 葛藤",
        genres: ["Indie Pop", "Alternative", "Electronic"],
        mood: "Uplifting",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 110,
        key: "D Major"
    },
    female_strength: {
        theme: "困難を乗り越える女性の内なる強さ。試練を通して見つける自分の可能性と、諦めない意志の力。",
        keywords: "強さ, 回復力, 可能性, 決意, 意志, 試練, 成長",
        genres: ["Pop", "Rock", "Alternative"],
        mood: "Powerful",
        energy: 8,
        vocal_type: "Female Solo",
        bpm: 125,
        key: "E Major"
    },
    nurturing_love: {
        theme: "育み、包み込むような女性の愛情。相手の成長を願い、温かく見守る母性的な愛の形。",
        keywords: "育む, 成長, 温かさ, 母性, 愛情, 見守り, 包容",
        genres: ["Indie Folk", "Soul", "Acoustic"],
        mood: "Gentle",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 75,
        key: "F Major"
    },
    girl_heartbreak: {
        theme: "女性の失恋の深い痛み。感情の波に翻弄されながらも、自分を取り戻していく回復の物語。",
        keywords: "失恋, 感情, 回復, 癒し, 痛み, 立ち直り, 成長",
        genres: ["Ballad", "Indie Pop", "Alternative"],
        mood: "Melancholic",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 85,
        key: "D Minor"
    },
    romantic_dreams: {
        theme: "ロマンチックな理想への憧れ。映画のような恋愛を夢見る女性の純粋な想いと現実との葛藤。",
        keywords: "ロマンチック, 夢, 理想, 幻想, 憧れ, 純粋, 現実",
        genres: ["Dream Pop", "Indie Pop", "Synthpop"],
        mood: "Dreamy",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 100,
        key: "B Major"
    },
    emotional_expression: {
        theme: "感情を豊かに表現する女性の魅力。喜怒哀楽を素直に表現する美しさと、それが生み出す人とのつながり。",
        keywords: "表現, 感情, 真正性, つながり, 素直, 魅力, 豊か",
        genres: ["Soul", "Indie Pop", "Jazz"],
        mood: "Energetic",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 115,
        key: "A Major"
    },
    girl_confidence: {
        theme: "自信に満ちた女性の輝き。自分を愛し、自分の価値を知る強さ。内面から溢れる美しさの物語。",
        keywords: "自信, 自己愛, 価値, 輝き, 美しさ, 強さ, 内面",
        genres: ["Pop", "R&B", "Electronic"],
        mood: "Powerful",
        energy: 7,
        vocal_type: "Female Solo",
        bpm: 120,
        key: "C Major"
    },
    maternal_feelings: {
        theme: "母性的な愛情に目覚める女性の心。守りたい、育てたいという本能的な愛の形と、その美しさ。",
        keywords: "母性, 本能, 保護, 愛, 守る, 育てる, 美しさ",
        genres: ["Indie Folk", "Soul", "Ambient"],
        mood: "Gentle",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 70,
        key: "G Major"
    },
    
    // 共通恋愛テーマ
    silent_understanding: {
        theme: "言葉にしなくても通じ合う心。目を見つめるだけで分かり合える特別な関係。静かな理解の美しさ。",
        keywords: "沈黙, 理解, つながり, テレパシー, 通じ合う, 特別, 美しさ",
        genres: ["Ambient", "Indie Pop", "Neo-Soul"],
        mood: "Dreamy",
        energy: 3,
        vocal_type: "Male & Female Duet",
        bpm: 75,
        key: "E Major"
    },
    long_distance_longing: {
        theme: "遠距離恋愛の想い。離れていても変わらない愛情と、会えない切なさ。距離を越えて届く心の声。",
        keywords: "距離, 憧憬, 別れ, 献身, 遠距離, 切なさ, 愛情",
        genres: ["Ballad", "Indie Pop", "Electronic"],
        mood: "Melancholic",
        energy: 4,
        vocal_type: "Male & Female Duet",
        bpm: 85,
        key: "A Minor"
    },
    social_media_checking: {
        theme: "SNSで相手の動向をチェックしてしまう現代の恋愛。既読スルーの不安と、投稿に一喜一憂する心。",
        keywords: "SNS, チェック, 不安, デジタル, 既読, 投稿, 一喜一憂",
        genres: ["Electronic", "Indie Pop", "Synthpop"],
        mood: "Energetic",
        energy: 5,
        vocal_type: "Male & Female Duet",
        bpm: 105,
        key: "C Major"
    },
    gift_giving_anxiety: {
        theme: "相手にプレゼントを選ぶ時の緊張と期待。喜んでもらえるかわからない不安と、笑顔を見たい想い。",
        keywords: "プレゼント, 不安, 期待, サプライズ, 緊張, 笑顔, 喜び",
        genres: ["Pop", "Indie Pop", "Acoustic"],
        mood: "Energetic",
        energy: 6,
        vocal_type: "Male & Female Duet",
        bpm: 110,
        key: "D Major"
    },
    meeting_parents: {
        theme: "恋人の親に挨拶する緊張の瞬間。認めてもらいたい気持ちと、失敗への不安。愛の深さを証明する大切な時。",
        keywords: "両親, 挨拶, 緊張, 承認, 認める, 失敗, 愛",
        genres: ["Acoustic", "Indie Folk", "Pop"],
        mood: "Energetic",
        energy: 5,
        vocal_type: "Male & Female Duet",
        bpm: 95,
        key: "F Major"
    },
    unrequited_love: {
        theme: "報われない恋の切なさ。一方的な想いの美しさと痛み。それでも愛し続ける純粋な心の物語。",
        keywords: "片思い, 憧憬, 純粋, 痛み, 報われない, 切なさ, 美しさ",
        genres: ["Ballad", "Indie Folk", "Alternative"],
        mood: "Melancholic",
        energy: 3,
        vocal_type: "Solo with Backup",
        bpm: 70,
        key: "G Minor"
    },
    confession_moment: {
        theme: "告白の瞬間。心臓の鼓動が聞こえるほどの緊張と、勇気を振り絞って伝える想い。運命が決まる瞬間。",
        keywords: "告白, 心拍, 勇気, 運命, 緊張, 想い, 瞬間",
        genres: ["Pop", "Indie Pop", "Rock"],
        mood: "Intense",
        energy: 7,
        vocal_type: "Solo with Backup",
        bpm: 115,
        key: "C Major"
    },
    new_relationship: {
        theme: "付き合い始めの高揚感。すべてが新鮮で特別に感じられる時期。未来への期待と幸せな不安。",
        keywords: "新しい, 興奮, 新鮮, 期待, 高揚感, 特別, 幸せ",
        genres: ["Pop", "Indie Pop", "Electronic"],
        mood: "Happy",
        energy: 7,
        vocal_type: "Male & Female Duet",
        bpm: 125,
        key: "E Major"
    },
    honeymoon_phase: {
        theme: "恋人同士の蜜月期間。毎日が幸せで、相手のすべてが愛おしく感じられる特別な時間。",
        keywords: "蜜月, 至福, 幸福, 愛おしさ, 恋人, 特別, 時間",
        genres: ["Pop", "R&B", "Soul"],
        mood: "Happy",
        energy: 6,
        vocal_type: "Male & Female Duet",
        bpm: 110,
        key: "A Major"
    },
    relationship_doubt: {
        theme: "関係への疑問と不安。このまま続けていいのか悩む心。愛情と現実の間で揺れ動く複雑な感情。",
        keywords: "疑問, 質問, 不確実性, 葛藤, 不安, 複雑, 感情",
        genres: ["Alternative", "Indie Rock", "Ballad"],
        mood: "Melancholic",
        energy: 4,
        vocal_type: "Male & Female Duet",
        bpm: 90,
        key: "D Minor"
    },
    
    // 記憶・ノスタルジア系
    old_photograph: {
        theme: "色あせた古い写真を見つめる午後。そこに写る笑顔の自分と友人たち。時間の経過と共に変わってしまった関係への複雑な思い。",
        keywords: "古い写真, 色あせた, 笑顔, 友人, 時間, 関係, 複雑",
        genres: ["Indie Folk", "Acoustic", "Singer-songwriter"],
        mood: "Nostalgic",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 75,
        key: "G Major"
    },
    school_days: {
        theme: "卒業アルバムをめくる夜。制服姿の自分と、あの頃夢見ていた未来。現実との違いに苦笑いしながらも、純粋だった日々への愛おしさ。",
        keywords: "卒業アルバム, 制服, 夢, 未来, 現実, 苦笑い, 純粋",
        genres: ["Pop", "Indie Pop", "Acoustic"],
        mood: "Bittersweet",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 95,
        key: "C Major"
    },
    childhood_friend: {
        theme: "幼馴染との久しぶりの再会。変わったところと変わらないところ。秘密基地で交わした約束を覚えているかと聞けない気持ち。",
        keywords: "幼馴染, 再会, 変わった, 変わらない, 秘密基地, 約束, 気持ち",
        genres: ["Folk", "Indie Pop", "Alternative"],
        mood: "Warm",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 85,
        key: "F Major"
    },
    first_apartment: {
        theme: "初めての一人暮らしのアパート。がらんとした部屋に響く足音。不安と自由が入り混じった新生活の始まり。",
        keywords: "初めて, 一人暮らし, アパート, がらんとした, 足音, 不安, 自由",
        genres: ["Indie Folk", "Alternative", "Lo-Fi"],
        mood: "Contemplative",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 80,
        key: "A Minor"
    },
    old_diary: {
        theme: "昔の日記を読み返す深夜。恥ずかしい思い出と一緒に、その時の純粋な感情がよみがえる。過去の自分への優しさと理解。",
        keywords: "昔の日記, 読み返す, 深夜, 恥ずかしい, 純粋, 感情, 優しさ",
        genres: ["Indie Folk", "Acoustic", "Lo-Fi"],
        mood: "Introspective",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 70,
        key: "D Minor"
    },
    music_box: {
        theme: "古いオルゴールが奏でる懐かしいメロディー。子供の頃に大切にしていた宝物箱。今も心の奥で鳴り続ける記憶の音色。",
        keywords: "オルゴール, 懐かしい, メロディー, 子供の頃, 宝物箱, 記憶, 音色",
        genres: ["Neo-Classical", "Ambient", "Indie Folk"],
        mood: "Dreamy",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 60,
        key: "E Major"
    },
    hometown_station: {
        theme: "故郷の小さな駅。電車を待つホームで感じる時間の止まったような静寂。都会に出て行った日の記憶と、今の自分への複雑な思い。",
        keywords: "故郷, 小さな駅, ホーム, 静寂, 都会, 出て行った, 複雑",
        genres: ["Folk", "Country", "Indie Rock"],
        mood: "Melancholic",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 85,
        key: "B Minor"
    },
    sunset_memory: {
        theme: "あの日見た夕焼けの記憶。大切な人と一緒に眺めた空の色。時間は過ぎても心に残り続ける美しい瞬間への憧憬。",
        keywords: "あの日, 夕焼け, 記憶, 大切な人, 空の色, 美しい瞬間, 憧憬",
        genres: ["Indie Pop", "Acoustic", "Alternative"],
        mood: "Wistful",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 90,
        key: "D Major"
    },
    letter_rediscovery: {
        theme: "引っ越しの際に見つけた古い手紙。丁寧な文字で綴られた思い。デジタル時代に失われつつあるアナログなコミュニケーションの温かさ。",
        keywords: "引っ越し, 古い手紙, 丁寧な文字, 思い, デジタル, アナログ, 温かさ",
        genres: ["Folk", "Singer-songwriter", "Acoustic"],
        mood: "Tender",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 75,
        key: "G Major"
    },
    time_capsule: {
        theme: "学校で埋めたタイムカプセルを開ける日。未来の自分へのメッセージと、今の現実のギャップ。それでも続いている夢への愛着。",
        keywords: "タイムカプセル, 学校, 埋めた, 未来, メッセージ, 現実, ギャップ, 夢",
        genres: ["Pop", "Indie Pop", "Alternative"],
        mood: "Hopeful",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 105,
        key: "A Major"
    },
    
    // 感情・心境系
    midnight_tears: {
        theme: "深夜にひとり流す涙。誰にも見せられない弱さと、それを受け入れる強さ。暗闇の中で見つける本当の自分との対話。",
        keywords: "深夜, ひとり, 涙, 弱さ, 強さ, 暗闇, 本当の自分, 対話",
        genres: ["Ballad", "Indie Folk", "Alternative"],
        mood: "Vulnerable",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 65,
        key: "F Minor"
    },
    overwhelming_joy: {
        theme: "抑えきれない喜びが心を満たす瞬間。飛び跳ねたくなるような幸せと、この気持ちを誰かと分かち合いたい衝動。",
        keywords: "抑えきれない, 喜び, 満たす, 飛び跳ねたい, 幸せ, 分かち合い, 衝動",
        genres: ["Pop", "Indie Pop", "Electronic"],
        mood: "Euphoric",
        energy: 8,
        vocal_type: "Female Solo",
        bpm: 140,
        key: "C Major"
    },
    quiet_anger: {
        theme: "静かに燃える怒り。声を荒げることなく心の奥で煮えたぎる感情。冷静さを保ちながらも消えない正義感への葛藤。",
        keywords: "静かに燃える, 怒り, 声を荒げる, 煮えたぎる, 冷静さ, 正義感, 葛藤",
        genres: ["Alternative", "Rock", "Electronic"],
        mood: "Intense",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 115,
        key: "E Minor"
    },
    sudden_loneliness: {
        theme: "突然襲ってくる孤独感。人に囲まれていても感じる心の空洞。この感情の正体を理解しようとする内なる探求。",
        keywords: "突然, 襲ってくる, 孤独感, 人に囲まれて, 心の空洞, 正体, 内なる探求",
        genres: ["Indie Folk", "Alternative", "Ambient"],
        mood: "Lonely",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 80,
        key: "A Minor"
    },
    peaceful_acceptance: {
        theme: "すべてを受け入れる静かな心境。抵抗することをやめて得られた平和。流れに身を任せる穏やかな悟りの境地。",
        keywords: "受け入れる, 静かな心境, 抵抗, 平和, 流れ, 身を任せる, 悟り",
        genres: ["Ambient", "Folk", "Meditation"],
        mood: "Serene",
        energy: 2,
        vocal_type: "Female Solo",
        bpm: 70,
        key: "F Major"
    },
    nervous_excitement: {
        theme: "緊張と興奮が入り混じる心境。新しい挑戦を前にした高鳴る鼓動。不安と期待が共存する複雑な感情の波。",
        keywords: "緊張, 興奮, 入り混じる, 挑戦, 高鳴る鼓動, 不安, 期待, 感情の波",
        genres: ["Pop", "Electronic", "Indie Rock"],
        mood: "Anticipatory",
        energy: 6,
        vocal_type: "Female Solo",
        bpm: 125,
        key: "G Major"
    },
    melancholic_beauty: {
        theme: "美しい憂鬱に包まれる午後。悲しみの中に見つける詩的な美しさ。痛みさえも愛おしく感じる複雑な心の状態。",
        keywords: "美しい憂鬱, 午後, 悲しみ, 詩的, 美しさ, 痛み, 愛おしい, 複雑",
        genres: ["Indie Folk", "Alternative", "Neo-Classical"],
        mood: "Melancholic",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 75,
        key: "D Minor"
    },
    hope_against_hope: {
        theme: "絶望的な状況でも消えない希望の光。理性では諦めるべきと分かっていても、心の奥で燃え続ける小さな炎。",
        keywords: "絶望的, 消えない希望, 光, 理性, 諦める, 心の奥, 燃え続ける, 小さな炎",
        genres: ["Alternative", "Rock", "Indie Pop"],
        mood: "Determined",
        energy: 5,
        vocal_type: "Female Solo",
        bpm: 100,
        key: "A Major"
    },
    bittersweet_goodbye: {
        theme: "ほろ苦い別れの瞬間。感謝と寂しさが混在する複雑な心境。新しい出発への期待と失うものへの惜別。",
        keywords: "ほろ苦い, 別れ, 感謝, 寂しさ, 混在, 複雑, 出発, 期待, 惜別",
        genres: ["Ballad", "Indie Folk", "Pop"],
        mood: "Bittersweet",
        energy: 4,
        vocal_type: "Female Solo",
        bpm: 85,
        key: "E Major"
    },
    silent_understanding: {
        theme: "言葉を交わさなくても伝わる深い理解。目と目で通じ合う心の繋がり。沈黙の中に宿る最も美しいコミュニケーション。",
        keywords: "言葉を交わさない, 深い理解, 目と目, 通じ合う, 心の繋がり, 沈黙, コミュニケーション",
        genres: ["Ambient", "Indie Folk", "Neo-Soul"],
        mood: "Intimate",
        energy: 3,
        vocal_type: "Female Solo",
        bpm: 70,
        key: "C Major"
    }
};

// Chrome Extension用にグローバルに公開
window.THEME_CATEGORIES = THEME_CATEGORIES;
window.THEME_PRESETS = THEME_PRESETS;