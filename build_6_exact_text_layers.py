import os
from PIL import Image, ImageDraw, ImageFont

def build_6_layers(w=720, h=1280):
    os.makedirs('temp_6_layers', exist_ok=True)

    font_gold_header = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 18)
    font_gold_sub = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 16)
    font_serif_italic_lg = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 20)
    font_serif_italic = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 18)
    font_serif_bold_lg = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 22)
    font_serif_bold = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 18)
    font_serif_bold_sm = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 16)
    font_serif_md = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 18)
    
    # Elegant GreatVibes font sizes chosen so text never overflows
    font_script_hero = ImageFont.truetype('fonts/GreatVibes.ttf', 64)
    font_script_names = ImageFont.truetype('fonts/GreatVibes.ttf', 48)
    font_script_lg = ImageFont.truetype('fonts/GreatVibes.ttf', 54)
    font_script_md = ImageFont.truetype('fonts/GreatVibes.ttf', 40)
    font_plaque = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 16)

    crimson = (128, 27, 46, 255)
    charcoal = (55, 20, 26, 255)
    gold = (165, 120, 35, 255)
    shadow = (235, 222, 205, 220)

    def draw_items(img, items, center_x):
        draw = ImageDraw.Draw(img)
        for it in items:
            font = it['font']
            text = it['text']
            y = it['y']
            color = it['color']
            bbox = draw.textbbox((0, 0), text, font=font)
            tw = bbox[2] - bbox[0]
            x = center_x - tw // 2
            # Dual-pass embossed rendering
            draw.text((x, y + 1), text, font=font, fill=shadow)
            draw.text((x, y), text, font=font, fill=color)

    def draw_plaque(img, text, center_x, plaque_y):
        draw = ImageDraw.Draw(img)
        bbox = draw.textbbox((0, 0), text, font=font_plaque)
        pw = bbox[2] - bbox[0]
        px = center_x - pw // 2
        draw.rounded_rectangle([px - 14, plaque_y - 6, px + pw + 14, plaque_y + 24], radius=6, outline=gold, width=2)
        draw.text((px, plaque_y + 1), text, font=font_plaque, fill=shadow)
        draw.text((px, plaque_y), text, font=font_plaque, fill=gold)

    # =========================================================================
    # SCENE 1: BISMILLAH & SACRED DUA (Frames 129..345, center_x = 360)
    # =========================================================================
    img1 = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    bismillah = Image.open('public/images/bismillah_authentic_calligraphy.png').convert('RGBA')
    bw = 390
    bh = int(bismillah.height * (bw / bismillah.width))
    b_resized = bismillah.resize((bw, bh), Image.Resampling.LANCZOS)
    img1.paste(b_resized, ((w - bw) // 2, 400), b_resized)

    items1 = [
        {'text': 'IN THE NAME OF ALLAH', 'font': font_gold_header, 'y': 505, 'color': gold},
        {'text': 'THE MOST BENEFICENT & MOST MERCIFUL', 'font': font_gold_header, 'y': 532, 'color': gold},
        {'text': '— • —', 'font': font_serif_bold, 'y': 575, 'color': gold},
        {'text': '"Oh Allah guide this marriage to the', 'font': font_serif_italic_lg, 'y': 620, 'color': charcoal},
        {'text': 'best of understanding, happiness,', 'font': font_serif_italic_lg, 'y': 655, 'color': charcoal},
        {'text': 'prosperity & success - Ameen"', 'font': font_serif_italic_lg, 'y': 690, 'color': charcoal},
    ]
    draw_items(img1, items1, 360)
    img1.save('temp_6_layers/s1.png')

    # =========================================================================
    # SCENE 2: POETRY & GIFT PLAQUE (Frames 346..545, center_x = 430)
    # =========================================================================
    img2 = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    items2 = [
        {'text': '"A Day of togetherness,', 'font': font_serif_italic_lg, 'y': 440, 'color': charcoal},
        {'text': 'a moment of joy and emotions,', 'font': font_serif_italic_lg, 'y': 478, 'color': charcoal},
        {'text': 'a dream of every parent', 'font': font_serif_italic_lg, 'y': 516, 'color': charcoal},
        {'text': 'today a reality of us"', 'font': font_serif_italic_lg, 'y': 554, 'color': charcoal},
        {'text': '— • —', 'font': font_serif_bold, 'y': 608, 'color': gold},
    ]
    draw_items(img2, items2, 430)
    draw_plaque(img2, 'YOUR PRESENCE & DUA IS OUR GREATEST GIFT', 430, 660)
    img2.save('temp_6_layers/s2.png')

    # =========================================================================
    # SCENE 3: HOST PARENTS INVITATION (Frames 546..729, center_x = 430)
    # =========================================================================
    img3 = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    items3 = [
        {'text': 'Mrs. & Mr.', 'font': font_script_md, 'y': 430, 'color': crimson},
        {'text': 'Mohammed Hussain Beary', 'font': font_script_names, 'y': 475, 'color': crimson},
        {'text': '— • —', 'font': font_serif_bold, 'y': 565, 'color': gold},
        {'text': 'solicit your blessing & request the pleasure', 'font': font_serif_md, 'y': 610, 'color': charcoal},
        {'text': 'of your family on the occasion of the', 'font': font_serif_md, 'y': 640, 'color': charcoal},
        {'text': 'wedding ceremony of their son', 'font': font_serif_md, 'y': 670, 'color': charcoal},
    ]
    draw_items(img3, items3, 430)
    img3.save('temp_6_layers/s3.png')

    # =========================================================================
    # SCENE 4: THE ROYAL COUPLE (Frames 730..915, center_x = 360)
    # =========================================================================
    img4 = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    items4 = [
        {'text': 'Mohammed Sinan', 'font': font_script_hero, 'y': 385, 'color': crimson},
        {'text': '(Grand S/o. Marhoom P. Hammabba Beary &', 'font': font_serif_bold_sm, 'y': 480, 'color': charcoal},
        {'text': 'Marhoom Mohammad Abdullah Sheikh)', 'font': font_serif_bold_sm, 'y': 508, 'color': charcoal},
        {'text': '==== WITH ====', 'font': font_gold_header, 'y': 560, 'color': gold},
        {'text': 'Aysha Zohara', 'font': font_script_hero, 'y': 610, 'color': crimson},
        {'text': '(D/o. Abdul Lateef Ibrahim)', 'font': font_serif_bold, 'y': 710, 'color': charcoal},
    ]
    draw_items(img4, items4, 360)
    img4.save('temp_6_layers/s4.png')

    # =========================================================================
    # SCENE 5: FOUNTAIN - DATE, NIKAH, DINNER, VENUE (Frames 916..1180, center_x = 440)
    # =========================================================================
    img5 = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    items5 = [
        {'text': 'Insha Allah', 'font': font_script_hero, 'y': 335, 'color': crimson},
        {'text': 'Nikah : On Thursday, 31st December, 2026', 'font': font_serif_bold, 'y': 430, 'color': gold},
        {'text': '(21st Rajab, 1448 H.) After Namaz Maghrib', 'font': font_serif_italic, 'y': 465, 'color': charcoal},
        {'text': 'Followed by Dinner till 10-00 p.m.', 'font': font_serif_bold, 'y': 510, 'color': charcoal},
        {'text': '— • —', 'font': font_serif_bold, 'y': 555, 'color': gold},
        {'text': 'Venue :', 'font': font_gold_sub, 'y': 595, 'color': gold},
        {'text': 'Unity Hall, Thokkottu Mangalore', 'font': font_serif_bold_lg, 'y': 630, 'color': crimson},
    ]
    draw_items(img5, items5, 440)
    img5.save('temp_6_layers/s5.png')

    # =========================================================================
    # SCENE 6: COMPLIMENTS, RESIDENCE & GIFT PLAQUE (Frames 1181..1455, center_x = 360)
    # =========================================================================
    img6 = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    items6 = [
        {'text': 'WITH BEST COMPLIMENTS FROM :', 'font': font_gold_header, 'y': 410, 'color': gold},
        {'text': 'Relatives & Friends', 'font': font_script_lg, 'y': 450, 'color': crimson},
        {'text': '— • —', 'font': font_serif_bold, 'y': 545, 'color': gold},
        {'text': 'Resi. :', 'font': font_gold_sub, 'y': 585, 'color': gold},
        {'text': 'Sugandh Palace, Nityanand Nagar,', 'font': font_serif_md, 'y': 615, 'color': charcoal},
        {'text': 'Ghatkopar (W), Mumbai-400 086.', 'font': font_serif_md, 'y': 645, 'color': charcoal},
        {'text': '— • —', 'font': font_serif_bold, 'y': 690, 'color': gold},
    ]
    draw_items(img6, items6, 360)
    draw_plaque(img6, 'YOUR PRESENCE & DUA IS OUR GREATEST GIFT', 360, 730)
    img6.save('temp_6_layers/s6.png')

    print('Built all 6 exact text layers with perfect sizing!')

if __name__ == '__main__':
    build_6_layers()
