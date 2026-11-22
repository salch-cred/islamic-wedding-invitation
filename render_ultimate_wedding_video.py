import cv2
import numpy as np
import os
import subprocess
import random
from PIL import Image, ImageDraw, ImageFont

def create_text_layer_s1():
    # 720 x 1280 RGBA transparent layer
    img = Image.new('RGBA', (720, 1280), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    font_serif_xs = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 12)
    font_serif_italic = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 14.5)
    font_serif_bold_sm = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 14)
    font_script_xl = ImageFont.truetype('fonts/GreatVibes.ttf', 54)
    font_script_lg = ImageFont.truetype('fonts/GreatVibes.ttf', 44)

    crimson = (128, 27, 46, 255)
    charcoal = (74, 21, 33, 255)
    gold = (165, 120, 35, 255)
    shadow = (225, 210, 190, 200)

    # 1. Bismillah Calligraphy (Authentic Arabic PNG)
    bismillah = Image.open('public/images/bismillah_authentic_calligraphy.png').convert('RGBA')
    # Resize to width ~410
    target_w = 410
    target_h = int(bismillah.height * (target_w / bismillah.width))
    bismillah_resized = bismillah.resize((target_w, target_h), Image.Resampling.LANCZOS)
    bx = (720 - target_w) // 2
    by = 380
    img.paste(bismillah_resized, (bx, by), bismillah_resized)

    # Text items
    items = [
        {'text': 'IN THE NAME OF ALLAH THE MOST BENEFICENT & MOST MERCIFUL', 'font': font_serif_xs, 'y': 485, 'color': gold},
        {'text': '— • —', 'font': font_serif_bold_sm, 'y': 525, 'color': gold},
        {'text': '"Oh Allah guide this marriage to the best of understanding,', 'font': font_serif_italic, 'y': 565, 'color': charcoal},
        {'text': 'happiness, prosperity & success — Ameen"', 'font': font_serif_italic, 'y': 590, 'color': charcoal},
        {'text': '— • —', 'font': font_serif_bold_sm, 'y': 635, 'color': gold},
        {'text': 'Royal Wedding Ceremony', 'font': font_script_xl, 'y': 675, 'color': crimson},
        {'text': 'Mohammed Sinan & Aysha Zohara', 'font': font_serif_bold_sm, 'y': 745, 'color': gold},
    ]

    for it in items:
        font = it['font']
        text = it['text']
        y = it['y']
        color = it['color']
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        x = (720 - tw) // 2
        draw.text((x, y + 1), text, font=font, fill=shadow)
        draw.text((x, y), text, font=font, fill=color)

    return img

def create_text_layer_s2():
    img = Image.new('RGBA', (720, 1280), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    font_serif_xs = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 12)
    font_serif_sm = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 14)
    font_serif_italic = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 14.5)
    font_serif_bold_sm = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 14)
    font_script_xl = ImageFont.truetype('fonts/GreatVibes.ttf', 56)
    font_script_md = ImageFont.truetype('fonts/GreatVibes.ttf', 38)

    crimson = (128, 27, 46, 255)
    charcoal = (74, 21, 33, 255)
    gold = (165, 120, 35, 255)
    shadow = (225, 210, 190, 200)

    # Shifted to x: 230-670 (centered around x=450 because pillar is on the left)
    center_x = 445

    items = [
        {'text': '"A Day of togetherness, a moment of joy and emotions', 'font': font_serif_italic, 'y': 225, 'color': charcoal},
        {'text': 'a dream of every parent today a reality of us"', 'font': font_serif_italic, 'y': 250, 'color': charcoal},
        {'text': '— • —', 'font': font_serif_bold_sm, 'y': 295, 'color': gold},
        {'text': 'Mrs. & Mr.', 'font': font_script_md, 'y': 335, 'color': crimson},
        {'text': 'Mohammed Hussain Beary', 'font': font_script_xl, 'y': 380, 'color': crimson},
        {'text': 'solicit your blessing & request the pleasure of your family', 'font': font_serif_sm, 'y': 465, 'color': charcoal},
        {'text': 'on the occasion of the wedding ceremony of their son', 'font': font_serif_sm, 'y': 490, 'color': charcoal},
        {'text': '— • —', 'font': font_serif_bold_sm, 'y': 540, 'color': gold},
        {'text': 'Sugar & Dates • Warm Welcomes Await', 'font': font_serif_italic, 'y': 585, 'color': charcoal},
    ]

    for it in items:
        font = it['font']
        text = it['text']
        y = it['y']
        color = it['color']
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        x = center_x - tw // 2
        draw.text((x, y + 1), text, font=font, fill=shadow)
        draw.text((x, y), text, font=font, fill=color)

    # Boxed plaque
    plaque_text = 'YOUR PRESENCE & DUA IS OUR GREATEST GIFT'
    bbox = draw.textbbox((0, 0), plaque_text, font=font_serif_bold_sm)
    pw = bbox[2] - bbox[0]
    px = center_x - pw // 2
    plaque_y = 650
    draw.rounded_rectangle([px - 14, plaque_y - 6, px + pw + 14, plaque_y + 24], radius=6, outline=gold, width=2)
    draw.text((px, plaque_y + 1), plaque_text, font=font_serif_bold_sm, fill=shadow)
    draw.text((px, plaque_y), plaque_text, font=font_serif_bold_sm, fill=gold)

    return img

def create_text_layer_s3():
    img = Image.new('RGBA', (720, 1280), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    font_serif_sm = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 14)
    font_serif_lg = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 17)
    font_serif_italic = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 14.5)
    font_serif_bold_sm = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 14)
    font_script_xl = ImageFont.truetype('fonts/GreatVibes.ttf', 58)

    crimson = (128, 27, 46, 255)
    charcoal = (74, 21, 33, 255)
    gold = (165, 120, 35, 255)
    shadow = (225, 210, 190, 200)

    center_x = 360

    items = [
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

    for it in items:
        font = it['font']
        text = it['text']
        y = it['y']
        color = it['color']
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        x = center_x - tw // 2
        draw.text((x, y + 1), text, font=font, fill=shadow)
        draw.text((x, y), text, font=font, fill=color)

    # Boxed plaque
    plaque_text = 'YOUR PRESENCE & DUA IS OUR GREATEST GIFT'
    bbox = draw.textbbox((0, 0), plaque_text, font=font_serif_bold_sm)
    pw = bbox[2] - bbox[0]
    px = center_x - pw // 2
    plaque_y = 715
    draw.rounded_rectangle([px - 14, plaque_y - 6, px + pw + 14, plaque_y + 24], radius=6, outline=gold, width=2)
    draw.text((px, plaque_y + 1), plaque_text, font=font_serif_bold_sm, fill=shadow)
    draw.text((px, plaque_y), plaque_text, font=font_serif_bold_sm, fill=gold)

    return img

def create_text_layer_s4():
    img = Image.new('RGBA', (720, 1280), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    font_serif_sm = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 14)
    font_serif_md = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 15)
    font_serif_lg = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 18)
    font_serif_italic = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 14.5)
    font_serif_bold_sm = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 14)
    font_script_xl = ImageFont.truetype('fonts/GreatVibes.ttf', 58)

    crimson = (128, 27, 46, 255)
    charcoal = (74, 21, 33, 255)
    gold = (165, 120, 35, 255)
    shadow = (225, 210, 190, 200)

    center_x = 425

    items = [
        {'text': 'Insha Allah', 'font': font_script_xl, 'y': 190, 'color': crimson},
        {'text': 'Thursday, 31st December, 2026', 'font': font_serif_lg, 'y': 265, 'color': gold},
        {'text': '(21st Rajab, 1448 H.)', 'font': font_serif_italic, 'y': 300, 'color': charcoal},
        {'text': 'Nikah : After Namaz Maghrib', 'font': font_serif_md, 'y': 355, 'color': charcoal},
        {'text': 'Followed by Dinner till 10:00 p.m.', 'font': font_serif_md, 'y': 390, 'color': charcoal},
        {'text': '— • —', 'font': font_serif_bold_sm, 'y': 440, 'color': gold},
        {'text': 'Venue :', 'font': font_serif_bold_sm, 'y': 485, 'color': gold},
        {'text': 'Unity Hall, Thokkottu Mangalore', 'font': font_serif_lg, 'y': 515, 'color': crimson},
        {'text': 'Sugar & Dates • Warm Welcomes Await', 'font': font_serif_italic, 'y': 570, 'color': charcoal},
    ]

    for it in items:
        font = it['font']
        text = it['text']
        y = it['y']
        color = it['color']
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        x = center_x - tw // 2
        draw.text((x, y + 1), text, font=font, fill=shadow)
        draw.text((x, y), text, font=font, fill=color)

    # Boxed plaque
    plaque_text = 'YOUR PRESENCE & DUA IS OUR GREATEST GIFT'
    bbox = draw.textbbox((0, 0), plaque_text, font=font_serif_bold_sm)
    pw = bbox[2] - bbox[0]
    px = center_x - pw // 2
    plaque_y = 635
    draw.rounded_rectangle([px - 14, plaque_y - 6, px + pw + 14, plaque_y + 24], radius=6, outline=gold, width=2)
    draw.text((px, plaque_y + 1), plaque_text, font=font_serif_bold_sm, fill=shadow)
    draw.text((px, plaque_y), plaque_text, font=font_serif_bold_sm, fill=gold)

    return img

def create_text_layer_s5():
    img = Image.new('RGBA', (720, 1280), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    font_serif_sm = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 14)
    font_serif_md = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 15)
    font_serif_lg = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 18)
    font_serif_italic = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 14.5)
    font_serif_bold_sm = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 14)
    font_script_xl = ImageFont.truetype('fonts/GreatVibes.ttf', 56)

    crimson = (128, 27, 46, 255)
    charcoal = (74, 21, 33, 255)
    gold = (165, 120, 35, 255)
    shadow = (225, 210, 190, 200)

    center_x = 360

    items = [
        {'text': 'WITH BEST COMPLIMENTS FROM :', 'font': font_serif_bold_sm, 'y': 240, 'color': gold},
        {'text': 'Relatives & Friends', 'font': font_script_xl, 'y': 275, 'color': crimson},
        {'text': '— • —', 'font': font_serif_bold_sm, 'y': 365, 'color': gold},
        {'text': 'R.S.V.P :', 'font': font_serif_bold_sm, 'y': 410, 'color': gold},
        {'text': 'Beary & Ibrahim Family', 'font': font_serif_lg, 'y': 440, 'color': crimson},
        {'text': '— • —', 'font': font_serif_bold_sm, 'y': 495, 'color': gold},
        {'text': 'Resi. : Sugandh Palace, Nityanand Nagar,', 'font': font_serif_sm, 'y': 540, 'color': charcoal},
        {'text': 'Ghatkopar (W), Mumbai-400 086.', 'font': font_serif_sm, 'y': 565, 'color': charcoal},
    ]

    for it in items:
        font = it['font']
        text = it['text']
        y = it['y']
        color = it['color']
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        x = center_x - tw // 2
        draw.text((x, y + 1), text, font=font, fill=shadow)
        draw.text((x, y), text, font=font, fill=color)

    # Boxed plaque
    plaque_text = 'YOUR PRESENCE & DUA IS OUR GREATEST GIFT'
    bbox = draw.textbbox((0, 0), plaque_text, font=font_serif_bold_sm)
    pw = bbox[2] - bbox[0]
    px = center_x - pw // 2
    plaque_y = 635
    draw.rounded_rectangle([px - 14, plaque_y - 6, px + pw + 14, plaque_y + 24], radius=6, outline=gold, width=2)
    draw.text((px, plaque_y + 1), plaque_text, font=font_serif_bold_sm, fill=shadow)
    draw.text((px, plaque_y), plaque_text, font=font_serif_bold_sm, fill=gold)

    return img

def main():
    print('Starting Master Wedding Video Rendering...')
    video_orig = r'c:\Users\salma\Downloads\e4852513bffb73404f545dcbd474aa00_720w.mp4'
    gate_video = r'public/video/gate-opening-clean.mp4'
    audio_track = r'public/audio/luxe-video-audio.mp3'
    temp_mp4 = r'public/video/temp_render_luxe.mp4'
    final_mp4 = r'public/video/wedding-luxe-final.mp4'

    fps = 30.0
    width = 720
    height = 1280

    # 1. Load Master Plates
    plate_twin = cv2.imread('public/images/MASTER_TWIN_PILLARS_PERFECT.jpg')
    plate_single = cv2.imread('public/images/test_scene4_ABSOLUTE_PERFECTION.jpg')
    plate_fountain = cv2.imread('public/images/test_fountain_100PCT_SPOTLESS.jpg')

    # 2. Build Text RGBA Layers
    print('Generating dynamic transparent text layers...')
    t_layer_s1 = create_text_layer_s1()
    t_layer_s2 = create_text_layer_s2()
    t_layer_s3 = create_text_layer_s3()
    t_layer_s4 = create_text_layer_s4()
    t_layer_s5 = create_text_layer_s5()

    # Pre-render live fountain water frames from original video
    print('Extracting live flowing fountain water frames from template video...')
    cap_orig = cv2.VideoCapture(video_orig)
    # Original video fountain scene is roughly frame 990 to 1245
    cap_orig.set(cv2.CAP_PROP_POS_FRAMES, 995)
    fountain_water_frames = []
    for _ in range(320):
        ret, f = cap_orig.read()
        if not ret:
            break
        fountain_water_frames.append(f)
    cap_orig.release()
    print(f'Extracted {len(fountain_water_frames)} live water frames.')

    # Mask for live fountain water
    water_mask = np.zeros((height, width), dtype=np.uint8)
    cv2.rectangle(water_mask, (135, 565), (205, 645), 255, -1)
    cv2.rectangle(water_mask, (75, 645), (225, 765), 255, -1)
    cv2.ellipse(water_mask, (150, 795), (85, 25), 0, 0, 360, 255, -1)
    water_mask_blur = cv2.GaussianBlur(water_mask, (11, 11), 0)
    water_mask_norm = (water_mask_blur.astype(float) / 255.0)[:, :, np.newaxis]

    # Falling Rose Petals Simulation
    petal_img = Image.open('public/images/rose_petal_particle.png').convert('RGBA')
    num_petals = 8
    petals = []
    for i in range(num_petals):
        petals.append({
            'x': random.uniform(180, 540),
            'y': random.uniform(-100, 1200),
            'speed_y': random.uniform(2.3, 4.0),
            'sway_amp': random.uniform(14, 30),
            'sway_speed': random.uniform(0.02, 0.045),
            'sway_phase': random.uniform(0, 6.28),
            'rot': random.uniform(0, 360),
            'rot_speed': random.uniform(-1.2, 1.2),
            'scale': random.uniform(0.65, 1.05),
        })

    def draw_petals_and_text(base_bgr, text_layer_pil, text_alpha, t):
        pil_frame = Image.fromarray(cv2.cvtColor(base_bgr, cv2.COLOR_BGR2RGB))
        
        # 1. Overlay text with current alpha (fade-in / fade-out)
        if text_alpha > 0.001 and text_layer_pil is not None:
            if text_alpha < 0.999:
                # Modulate alpha
                r, g, b, a = text_layer_pil.split()
                a_mod = a.point(lambda p: int(p * text_alpha))
                alpha_layer = Image.merge('RGBA', (r, g, b, a_mod))
                pil_frame.paste(alpha_layer, (0, 0), alpha_layer)
            else:
                pil_frame.paste(text_layer_pil, (0, 0), text_layer_pil)

        # 2. Falling rose petals (floating naturally in front of text and columns)
        for p in petals:
            y = p['y'] + p['speed_y']
            if y > height + 40:
                y = random.uniform(-60, -20)
                p['x'] = random.uniform(180, 540)
            p['y'] = y

            x = p['x'] + p['sway_amp'] * np.sin(t * p['sway_speed'] + p['sway_phase'])
            p['rot'] += p['rot_speed']

            w = max(10, int(petal_img.width * p['scale']))
            h = max(10, int(petal_img.height * p['scale']))
            scaled_p = petal_img.resize((w, h), Image.Resampling.BILINEAR)
            rotated_p = scaled_p.rotate(p['rot'], resample=Image.Resampling.BILINEAR, expand=True)

            paste_x = int(x - rotated_p.width // 2)
            paste_y = int(y - rotated_p.height // 2)
            if -50 <= paste_x <= width + 50 and -50 <= paste_y <= height + 50:
                pil_frame.paste(rotated_p, (paste_x, paste_y), rotated_p)

        return cv2.cvtColor(np.array(pil_frame), cv2.COLOR_RGB2BGR)

    def apply_slow_zoom(img, progress, max_zoom=1.035):
        scale = 1.0 + (max_zoom - 1.0) * progress
        new_w = int(width * scale)
        new_h = int(height * scale)
        resized = cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_LINEAR)
        x_start = (new_w - width) // 2
        y_start = (new_h - height) // 2
        return resized[y_start:y_start+height, x_start:x_start+width]

    # Video Writer
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(temp_mp4, fourcc, fps, (width, height))

    global_t = 0

    # =========================================================================
    # PART 1: GATE OPENING VIDEO (Frames 0 to ~128, 4.3s)
    # =========================================================================
    print('Rendering Part 1: Gate Opening Video...')
    cap_gate = cv2.VideoCapture(gate_video)
    gate_frames = []
    while True:
        ret, f = cap_gate.read()
        if not ret:
            break
        gate_frames.append(f)
    cap_gate.release()

    for f in gate_frames:
        out.write(f)
        global_t += 1
    print(f'Part 1 finished! Wrote {len(gate_frames)} frames.')

    # =========================================================================
    # Master Scene Rendering Function with Independent Text Fade & Clean BG Dissolve
    # =========================================================================
    def render_scene(plate_img, text_layer, total_frames, 
                     fade_in_len=24, fade_out_len=22, 
                     prev_plate=None, dissolve_len=18, 
                     is_fountain=False):
        nonlocal global_t
        for i in range(total_frames):
            progress = i / float(total_frames)

            # 1. Base zoomed background plate
            zoomed_bg = apply_slow_zoom(plate_img, progress)

            # If fountain scene: composite live flowing water jets
            if is_fountain:
                water_f_idx = i % len(fountain_water_frames)
                water_f = fountain_water_frames[water_f_idx]
                zoomed_water_f = apply_slow_zoom(water_f, progress)
                zoomed_bg = (zoomed_water_f.astype(float) * water_mask_norm + 
                             zoomed_bg.astype(float) * (1.0 - water_mask_norm)).astype(np.uint8)

            # 2. Background cross-dissolve from previous plate (only at start of scene)
            if i < dissolve_len and prev_plate is not None:
                alpha_bg = i / float(dissolve_len)
                prev_zoomed = apply_slow_zoom(prev_plate, 1.0)
                zoomed_bg = (prev_zoomed * (1.0 - alpha_bg) + zoomed_bg * alpha_bg).astype(np.uint8)

            # 3. Text Alpha calculation:
            # Text starts fading in AFTER the background dissolve is halfway done
            text_start = max(10, dissolve_len // 2)
            text_end = total_frames - fade_out_len

            if i < text_start:
                text_alpha = 0.0
            elif i < text_start + fade_in_len:
                text_alpha = (i - text_start) / float(fade_in_len)
            elif i < text_end:
                text_alpha = 1.0
            else:
                text_alpha = max(0.0, 1.0 - (i - text_end) / float(fade_out_len))

            # 4. Render text and falling petals on top
            final_frame = draw_petals_and_text(zoomed_bg, text_layer, text_alpha, global_t)

            out.write(final_frame)
            global_t += 1

    # =========================================================================
    # SCENE 1: BISMILLAH & SACRED DUA (7.5s, 225 frames)
    # =========================================================================
    print('Rendering Scene 1: Bismillah & Sacred Dua...')
    render_scene(plate_twin, t_layer_s1, 225, prev_plate=gate_frames[-1], dissolve_len=20)

    # =========================================================================
    # SCENE 2: PARENTS & INVITATION (8.0s, 240 frames)
    # =========================================================================
    print('Rendering Scene 2: Host Parents...')
    render_scene(plate_single, t_layer_s2, 240, prev_plate=plate_twin, dissolve_len=20)

    # =========================================================================
    # SCENE 3: THE ROYAL COUPLE (8.5s, 255 frames)
    # =========================================================================
    print('Rendering Scene 3: The Royal Couple Sinan & Aysha...')
    render_scene(plate_twin, t_layer_s3, 255, prev_plate=plate_single, dissolve_len=20)

    # =========================================================================
    # SCENE 4: LIVE FOUNTAIN CEREMONY & VENUE (9.5s, 285 frames)
    # =========================================================================
    print('Rendering Scene 4: Classical Fountain with LIVE FLOWING WATER...')
    render_scene(plate_fountain, t_layer_s4, 285, prev_plate=plate_twin, dissolve_len=20, is_fountain=True)

    # =========================================================================
    # SCENE 5: RSVP & COMPLIMENTS (9.5s, 285 frames)
    # =========================================================================
    print('Rendering Scene 5: RSVP & Best Compliments...')
    render_scene(plate_twin, t_layer_s5, 285, prev_plate=plate_fountain, dissolve_len=20)

    out.release()
    print(f'Rendered total {global_t} frames to {temp_mp4}!')

    # Mux with original high quality stereo audio
    print('Muxing video with original high-quality audio track...')
    cmd = [
        'ffmpeg', '-y',
        '-i', temp_mp4,
        '-i', audio_track,
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '20',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '160k',
        '-shortest',
        '-movflags', '+faststart',
        final_mp4
    ]
    subprocess.run(cmd, check=True)
    if os.path.exists(temp_mp4):
        os.remove(temp_mp4)
    print(f'Master Wedding Video rendered successfully to: {final_mp4}')

if __name__ == '__main__':
    main()
