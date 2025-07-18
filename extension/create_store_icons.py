#!/usr/bin/env python3
"""
Chrome Web Store用アイコン生成スクリプト
"""
from PIL import Image, ImageDraw, ImageFont
import os

def create_store_icons():
    """Chrome Web Store用の追加アイコンを生成"""
    
    # 基本設定
    base_color = (52, 152, 219)  # 青色
    accent_color = (241, 196, 15)  # 黄色
    text_color = (255, 255, 255)  # 白色
    
    # 128x128アイコン（Store listing用）
    def create_128_icon():
        img = Image.new('RGBA', (128, 128), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # グラデーション背景
        for i in range(128):
            color = tuple(int(base_color[j] + (accent_color[j] - base_color[j]) * i / 128) for j in range(3))
            draw.rectangle([(0, i), (128, i+1)], fill=color)
        
        # 音符を描画
        # 音符の丸い部分
        draw.ellipse([35, 70, 55, 90], fill=text_color)
        # 音符の棒
        draw.rectangle([52, 30, 58, 75], fill=text_color)
        # 音符の旗
        draw.polygon([(58, 30), (58, 50), (85, 45), (85, 35)], fill=text_color)
        
        # 追加の音符（小さめ）
        draw.ellipse([70, 80, 85, 95], fill=text_color)
        draw.rectangle([82, 45, 87, 85], fill=text_color)
        
        # 角を丸く
        mask = Image.new('L', (128, 128), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([0, 0, 128, 128], radius=12, fill=255)
        
        # マスクを適用
        result = Image.new('RGBA', (128, 128), (0, 0, 0, 0))
        result.paste(img, (0, 0))
        result.putalpha(mask)
        
        return result
    
    # 440x280バナー作成
    def create_440_banner():
        img = Image.new('RGBA', (440, 280), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # グラデーション背景
        for i in range(440):
            color = tuple(int(base_color[j] + (accent_color[j] - base_color[j]) * i / 440) for j in range(3))
            draw.rectangle([(i, 0), (i+1, 280)], fill=color)
        
        # 大きな音符を描画
        # 音符1
        draw.ellipse([50, 150, 100, 200], fill=text_color)
        draw.rectangle([90, 60, 105, 170], fill=text_color)
        draw.polygon([(105, 60), (105, 110), (160, 95), (160, 70)], fill=text_color)
        
        # 音符2
        draw.ellipse([120, 180, 160, 220], fill=text_color)
        draw.rectangle([150, 100, 165, 195], fill=text_color)
        
        # 音符3
        draw.ellipse([190, 160, 230, 200], fill=text_color)
        draw.rectangle([220, 80, 235, 180], fill=text_color)
        
        # テキスト追加
        try:
            font_size = 36
            font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', font_size)
        except:
            font = ImageFont.load_default()
        
        text = "Sunoprompt"
        # テキストのサイズを取得
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        # 中央に配置
        x = (440 - text_width) // 2
        y = 40
        
        # テキストの影
        draw.text((x+2, y+2), text, font=font, fill=(0, 0, 0, 128))
        # テキスト本体
        draw.text((x, y), text, font=font, fill=text_color)
        
        # 角を丸く
        mask = Image.new('L', (440, 280), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([0, 0, 440, 280], radius=16, fill=255)
        
        result = Image.new('RGBA', (440, 280), (0, 0, 0, 0))
        result.paste(img, (0, 0))
        result.putalpha(mask)
        
        return result
    
    # 1400x560 大型バナー
    def create_1400_banner():
        img = Image.new('RGBA', (1400, 560), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # グラデーション背景
        for i in range(1400):
            color = tuple(int(base_color[j] + (accent_color[j] - base_color[j]) * i / 1400) for j in range(3))
            draw.rectangle([(i, 0), (i+1, 560)], fill=color)
        
        # 複数の音符を描画
        notes_positions = [
            (100, 300), (250, 350), (400, 280), (550, 330), (700, 300),
            (850, 350), (1000, 280), (1150, 320), (1300, 290)
        ]
        
        for x, y in notes_positions:
            size = 40
            # 音符の丸い部分
            draw.ellipse([x, y, x+size, y+size], fill=text_color)
            # 音符の棒
            draw.rectangle([x+size-8, y-60, x+size-2, y+10], fill=text_color)
            # 音符の旗
            if x % 2 == 0:
                draw.polygon([(x+size-2, y-60), (x+size-2, y-30), (x+size+35, y-40), (x+size+35, y-55)], fill=text_color)
        
        # メインテキスト
        try:
            font_size = 80
            font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', font_size)
        except:
            font = ImageFont.load_default()
        
        main_text = "Sunoprompt Extension"
        bbox = draw.textbbox((0, 0), main_text, font=font)
        text_width = bbox[2] - bbox[0]
        x = (1400 - text_width) // 2
        y = 100
        
        # テキストの影
        draw.text((x+3, y+3), main_text, font=font, fill=(0, 0, 0, 128))
        # テキスト本体
        draw.text((x, y), main_text, font=font, fill=text_color)
        
        # サブテキスト
        try:
            sub_font_size = 32
            sub_font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', sub_font_size)
        except:
            sub_font = ImageFont.load_default()
        
        sub_text = "AI-Powered Music Prompt Generator for Suno"
        bbox = draw.textbbox((0, 0), sub_text, font=sub_font)
        text_width = bbox[2] - bbox[0]
        x = (1400 - text_width) // 2
        y = 200
        
        draw.text((x+2, y+2), sub_text, font=sub_font, fill=(0, 0, 0, 128))
        draw.text((x, y), sub_text, font=sub_font, fill=text_color)
        
        # 角を丸く
        mask = Image.new('L', (1400, 560), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([0, 0, 1400, 560], radius=24, fill=255)
        
        result = Image.new('RGBA', (1400, 560), (0, 0, 0, 0))
        result.paste(img, (0, 0))
        result.putalpha(mask)
        
        return result
    
    # アイコンディレクトリ作成
    icons_dir = 'icons'
    if not os.path.exists(icons_dir):
        os.makedirs(icons_dir)
    
    # Store用アイコンを生成
    print("Chrome Web Store用アイコンを生成中...")
    
    # 128x128 Store listing icon
    icon128 = create_128_icon()
    icon128.save(f'{icons_dir}/store-icon-128.png', 'PNG')
    print("✅ 128x128 Store icon created")
    
    # 440x280 Store banner
    banner440 = create_440_banner()
    banner440.save(f'{icons_dir}/store-banner-440x280.png', 'PNG')
    print("✅ 440x280 Store banner created")
    
    # 1400x560 Large banner
    banner1400 = create_1400_banner()
    banner1400.save(f'{icons_dir}/store-banner-1400x560.png', 'PNG')
    print("✅ 1400x560 Large banner created")
    
    # 220x140 Small tile
    small_tile = banner440.resize((220, 140), Image.Resampling.LANCZOS)
    small_tile.save(f'{icons_dir}/store-tile-220x140.png', 'PNG')
    print("✅ 220x140 Small tile created")
    
    print("\n🎉 Chrome Web Store用アイコンの生成が完了しました！")
    print(f"保存先: {os.path.abspath(icons_dir)}/")

if __name__ == "__main__":
    create_store_icons()