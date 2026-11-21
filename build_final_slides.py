import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# 1. Load clean master plates
twin_pillars = cv2.imread('public/images/MASTER_TWIN_PILLARS_PERFECT.jpg')
single_pillar = cv2.imread('public/images/test_scene4_ABSOLUTE_PERFECTION.jpg')
fountain = cv2.imread('public/images/test_fountain_FIXED_X.jpg')
bismillah_png = Image.open('public/images/bismillah_authentic_calligraphy.png').convert('RGBA')

# Fonts
font_script_xl = ImageFont.truetype('fonts/GreatVibes.ttf', 52)
font_script_lg = ImageFont.truetype('fonts/GreatVibes.ttf', 44)
font_script_md = ImageFont.truetype('fonts/GreatVibes.ttf', 36)
font_serif_lg = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 19)
font_serif_md = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 16)
font_serif_sm = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 14)
font_serif_xs = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 12)
font_serif_italic = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 14.5)
font_serif_italic_sm = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 13.5)
font_serif_bold_sm = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 14.5)

crimson = (128, 27, 46)
charcoal = (74, 21, 33)
gold = (165, 120, 35)

def draw_slide(base_bgr, items, out_path, center_x=360, overlay_bismillah=False, bis_y=280, plaque_info=None):
    pil_img = Image.fromarray(cv2.cvtColor(base_bgr, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(pil_img)

    if overlay_bismillah:
        w_target = 390
        h_target = int(bismillah_png.height * (w_target / bismillah_png.width))
        bis_resized = bismillah_png.resize((w_target, h_target), Image.Resampling.LANCZOS)
        bis_x = (720 - w_target) // 2
        pil_img.paste(bis_resized, (bis_x, bis_y), bis_resized)

    for it in items:
        font = it['font']
        text = it['text']
        y = it['y']
        color = it.get('color', crimson)
        custom_x = it.get('center_x', center_x)
        
        bbox = draw.textbbox((0, 0), text, font=font)
        text_w = bbox[2] - bbox[0]
        x = custom_x - text_w // 2
        
        # Soft warm engraving shadow
        draw.text((x, y + 1), text, font=font, fill=(215, 200, 180))
        draw.text((x, y), text, font=font, fill=color)

    if plaque_info:
        plaque_text = plaque_info.get('text', 'YOUR PRESENCE & DUA IS OUR GREATEST GIFT')
        py = plaque_info['y']
        px_center = plaque_info.get('center_x', center_x)
        bbox = draw.textbbox((0, 0), plaque_text, font=font_serif_bold_sm)
        pw = bbox[2] - bbox[0]
        px = px_center - pw // 2
        draw.rounded_rectangle([px - 14, py - 6, px + pw + 14, py + 24], radius=6, outline=gold, width=2)
        draw.text((px, py + 1), plaque_text, font=font_serif_bold_sm, fill=(215, 200, 180))
        draw.text((px, py), plaque_text, font=font_serif_bold_sm, fill=gold)

    res = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
    cv2.imwrite(out_path, res)
    print(f'Rendered: {out_path}')

# =========================================================================
# SLIDE 1: SACRED INVOCATION & DUA
# =========================================================================
items_s1 = [
    {'text': 'IN THE NAME OF ALLAH THE MOST BENEFICENT & MOST MERCIFUL', 'font': font_serif_xs, 'y': 440, 'color': gold},
    {'text': '— • —', 'font': font_serif_bold_sm, 'y': 490, 'color': gold},
    {'text': '"Oh Allah guide this marriage to the best of understanding,', 'font': font_serif_italic, 'y': 540, 'color': charcoal},
    {'text': 'happiness, prosperity & success — Ameen"', 'font': font_serif_italic, 'y': 570, 'color': charcoal},
    {'text': '— • —', 'font': font_serif_bold_sm, 'y': 620, 'color': gold},
    {'text': 'Royal Wedding Ceremony', 'font': font_script_lg, 'y': 665, 'color': crimson},
    {'text': 'Mohammed Sinan & Aysha Zohara', 'font': font_serif_md, 'y': 735, 'color': gold},
]
draw_slide(twin_pillars, items_s1, 'public/images/final_slide1_bismillah.jpg', center_x=360, overlay_bismillah=True, bis_y=340)

# =========================================================================
# SLIDE 2: PARENTS & INVITATION (Single pillar, center_x = 430)
# =========================================================================
items_s2 = [
    {'text': '"A Day of togetherness, a moment of joy and emotions', 'font': font_serif_italic_sm, 'y': 245, 'color': charcoal},
    {'text': 'a dream of every parent today a reality of us"', 'font': font_serif_italic_sm, 'y': 270, 'color': charcoal},
    {'text': '— • —', 'font': font_serif_bold_sm, 'y': 315, 'color': gold},
    {'text': 'Mrs. & Mr.', 'font': font_script_md, 'y': 355, 'color': crimson},
    {'text': 'Mohammed Hussain Beary', 'font': font_script_lg, 'y': 395, 'color': crimson},
    {'text': 'solicit your blessing & request the pleasure of your family', 'font': font_serif_sm, 'y': 475, 'color': charcoal},
    {'text': 'on the occasion of the wedding ceremony of their son', 'font': font_serif_sm, 'y': 505, 'color': charcoal},
    {'text': '— • —', 'font': font_serif_bold_sm, 'y': 560, 'color': gold},
    {'text': 'Sugar & Dates • Warm Welcomes Await', 'font': font_serif_italic, 'y': 610, 'color': charcoal},
]
draw_slide(single_pillar, items_s2, 'public/images/final_slide2_parents.jpg', center_x=430, plaque_info={'y': 675, 'center_x': 430})

# =========================================================================
# SLIDE 3: THE ROYAL COUPLE (Twin pillars, center_x = 360)
# =========================================================================
items_s3 = [
    {'text': 'ROYAL WEDDING CEREMONY', 'font': font_serif_bold_sm, 'y': 225, 'color': gold},
    {'text': 'Mohammed Sinan', 'font': font_script_xl, 'y': 265, 'color': crimson},
    {'text': '(Grand S/o. Marhoom P. Hammabba Beary &', 'font': font_serif_sm, 'y': 345, 'color': charcoal},
    {'text': 'Marhoom Mohammad Abdullah Sheikh)', 'font': font_serif_sm, 'y': 370, 'color': charcoal},
    {'text': '=== WITH ===', 'font': font_serif_bold_sm, 'y': 420, 'color': gold},
    {'text': 'Aysha Zohara', 'font': font_script_xl, 'y': 465, 'color': crimson},
    {'text': '(D/o. Abdul Lateef Ibrahim)', 'font': font_serif_sm, 'y': 545, 'color': charcoal},
    {'text': '— • —', 'font': font_serif_bold_sm, 'y': 595, 'color': gold},
    {'text': '"May Allah bless this union with eternal love,', 'font': font_serif_italic, 'y': 635, 'color': charcoal},
    {'text': 'happiness and prosperity — Ameen"', 'font': font_serif_italic, 'y': 660, 'color': charcoal},
]
draw_slide(twin_pillars, items_s3, 'public/images/final_slide3_couple.jpg', center_x=360, plaque_info={'y': 715, 'center_x': 360})

# =========================================================================
# SLIDE 4: FOUNTAIN NIKAH & VENUE
# =========================================================================
items_s4 = [
    {'text': 'Insha Allah', 'font': font_script_xl, 'y': 190, 'color': crimson},
    {'text': 'Thursday | 31st | December 2026', 'font': font_serif_lg, 'y': 265, 'color': gold},
    {'text': '(21st Rajab, 1448 H.)', 'font': font_serif_italic, 'y': 300, 'color': charcoal},
    {'text': 'Nikah : After Namaz Maghrib', 'font': font_serif_bold_sm, 'y': 345, 'color': charcoal},
    {'text': 'Dinner : Followed till 10:00 p.m.', 'font': font_serif_bold_sm, 'y': 375, 'color': charcoal},
    {'text': '— • —', 'font': font_serif_bold_sm, 'y': 425, 'color': gold},
    {'text': 'Venue', 'font': font_script_lg, 'y': 465, 'color': crimson},
    {'text': 'Unity Hall, Thokkottu Mangalore', 'font': font_serif_lg, 'y': 530, 'color': gold},
    {'text': 'Mangalore, Karnataka', 'font': font_serif_italic, 'y': 565, 'color': charcoal},
]
draw_slide(fountain, items_s4, 'public/images/final_slide4_fountain.jpg', center_x=360)

# =========================================================================
# SLIDE 5: COMPLIMENTS, RSVP & RESIDENCE (Twin pillars, center_x = 360)
# =========================================================================
items_s5 = [
    {'text': 'With Best Compliments', 'font': font_script_lg, 'y': 225, 'color': crimson},
    {'text': 'WITH BEST COMPLIMENTS FROM :', 'font': font_serif_bold_sm, 'y': 295, 'color': crimson},
    {'text': 'Relatives & Friends', 'font': font_serif_lg, 'y': 335, 'color': charcoal},
    {'text': '— • —', 'font': font_serif_bold_sm, 'y': 390, 'color': gold},
    {'text': 'R.S.V.P', 'font': font_script_lg, 'y': 430, 'color': crimson},
    {'text': 'Beary & Ibrahim Family', 'font': font_serif_bold_sm, 'y': 495, 'color': charcoal},
    {'text': '— • —', 'font': font_serif_bold_sm, 'y': 545, 'color': gold},
    {'text': 'Resi. : Sugandh Palace, Nityanand Nagar,', 'font': font_serif_sm, 'y': 590, 'color': charcoal},
    {'text': 'Ghatkopar (W), Mumbai-400 086.', 'font': font_serif_sm, 'y': 620, 'color': charcoal},
]
draw_slide(twin_pillars, items_s5, 'public/images/final_slide5_rsvp.jpg', center_x=360, plaque_info={'y': 685, 'center_x': 360})

print('ALL 5 MASTER SLIDES COMPLETED SUCCESSFULLY!')
