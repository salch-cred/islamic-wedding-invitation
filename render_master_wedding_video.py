import cv2
import numpy as np
import os
import subprocess
import random
from PIL import Image, ImageDraw, ImageFont

def build_text_layers(w=720, h=1280):
    font_gold_header = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 18)
    font_gold_sub = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 16)
    font_serif_italic = ImageFont.truetype('C:/Windows/Fonts/georgiai.ttf', 20)
    font_serif_bold = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 20)
    font_serif_md = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', 18)
    font_script_hero = ImageFont.truetype('fonts/GreatVibes.ttf', 76)
    font_script_lg = ImageFont.truetype('fonts/GreatVibes.ttf', 62)
    font_script_md = ImageFont.truetype('fonts/GreatVibes.ttf', 44)
    font_script_with = ImageFont.truetype('fonts/GreatVibes.ttf', 36)
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

    # Layer 1: Bismillah & Sacred Dua (Twin Pillars, center_x = 360)
    img1 = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    bismillah = Image.open('public/images/bismillah_authentic_calligraphy.png').convert('RGBA')
    bw = 420
    bh = int(bismillah.height * (bw / bismillah.width))
    b_resized = bismillah.resize((bw, bh), Image.Resampling.LANCZOS)
    img1.paste(b_resized, ((w - bw) // 2, 380), b_resized)

    items1 = [
        {'text': 'IN THE NAME OF ALLAH', 'font': font_gold_header, 'y': 500, 'color': gold},
        {'text': 'THE MOST BENEFICENT & MOST MERCIFUL', 'font': font_gold_header, 'y': 526, 'color': gold},
        {'text': '— • —', 'font': font_serif_bold, 'y': 568, 'color': gold},
        {'text': '"Oh Allah guide this marriage to the best of understanding,', 'font': font_serif_italic, 'y': 610, 'color': charcoal},
        {'text': 'happiness, prosperity & success — Ameen"', 'font': font_serif_italic, 'y': 642, 'color': charcoal},
        {'text': '— • —', 'font': font_serif_bold, 'y': 685, 'color': gold},
        {'text': 'Royal Wedding Ceremony', 'font': font_script_hero, 'y': 725, 'color': crimson},
        {'text': 'Mohammed Sinan & Aysha Zohara', 'font': font_serif_bold, 'y': 820, 'color': gold},
    ]
    draw_items(img1, items1, 360)

    # Layer 2: Host Parents & Invitation (Single Column, center_x = 410)
    img2 = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    items2 = [
        {'text': '"A Day of togetherness, a moment of joy and emotions,', 'font': font_serif_italic, 'y': 360, 'color': charcoal},
        {'text': 'a dream of every parent today a reality of us"', 'font': font_serif_italic, 'y': 392, 'color': charcoal},
        {'text': '— • —', 'font': font_serif_bold, 'y': 445, 'color': gold},
        {'text': 'Mrs. & Mr.', 'font': font_script_md, 'y': 485, 'color': crimson},
        {'text': 'Mohammed Hussain Beary', 'font': font_script_lg, 'y': 530, 'color': crimson},
        {'text': 'solicit your blessing & request the pleasure of your family', 'font': font_serif_md, 'y': 620, 'color': charcoal},
        {'text': 'on the occasion of the wedding ceremony of their son', 'font': font_serif_md, 'y': 650, 'color': charcoal},
        {'text': 'Mohammed Sinan', 'font': font_script_md, 'y': 688, 'color': crimson},
        {'text': '— • —', 'font': font_serif_bold, 'y': 755, 'color': gold},
        {'text': 'Sugar & Dates • Warm Welcomes Await', 'font': font_serif_italic, 'y': 795, 'color': charcoal},
    ]
    draw_items(img2, items2, 410)
    draw_plaque(img2, 'YOUR PRESENCE & DUA IS OUR GREATEST GIFT', 410, 845)

    # Layer 3: The Royal Couple (Twin Pillars, center_x = 360)
    img3 = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    items3 = [
        {'text': 'ROYAL WEDDING CEREMONY', 'font': font_gold_header, 'y': 340, 'color': gold},
        {'text': 'Mohammed Sinan', 'font': font_script_hero, 'y': 375, 'color': crimson},
        {'text': 'Grand S/o. Marhoom P. Hammabba Beary', 'font': font_serif_bold, 'y': 485, 'color': charcoal},
        {'text': '& Marhoom Mohammad Abdullah Sheikh', 'font': font_serif_bold, 'y': 515, 'color': charcoal},
        {'text': '— with —', 'font': font_script_with, 'y': 565, 'color': gold},
        {'text': 'Aysha Zohara', 'font': font_script_hero, 'y': 615, 'color': crimson},
        {'text': 'D/o. Abdul Lateef Ibrahim', 'font': font_serif_bold, 'y': 725, 'color': charcoal},
        {'text': '— • —', 'font': font_serif_bold, 'y': 770, 'color': gold},
        {'text': '"May Allah bless this union with eternal love,', 'font': font_serif_italic, 'y': 808, 'color': charcoal},
        {'text': 'happiness and prosperity — Ameen"', 'font': font_serif_italic, 'y': 836, 'color': charcoal},
    ]
    draw_items(img3, items3, 360)
    draw_plaque(img3, 'YOUR PRESENCE & DUA IS OUR GREATEST GIFT', 360, 885)

    # Layer 4: Live Fountain Venue (Fountain on left, center_x = 435)
    img4 = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    items4 = [
        {'text': 'Insha Allah', 'font': font_script_hero, 'y': 330, 'color': crimson},
        {'text': 'Thursday, 31st December, 2026', 'font': font_serif_bold, 'y': 435, 'color': gold},
        {'text': '(21st Rajab, 1448 H.)', 'font': font_serif_italic, 'y': 470, 'color': charcoal},
        {'text': 'Nikah : After Namaz Maghrib', 'font': font_serif_bold, 'y': 525, 'color': charcoal},
        {'text': 'Followed by Dinner till 10:00 p.m.', 'font': font_serif_bold, 'y': 560, 'color': charcoal},
        {'text': '— • —', 'font': font_serif_bold, 'y': 610, 'color': gold},
        {'text': 'Venue :', 'font': font_gold_sub, 'y': 650, 'color': gold},
        {'text': 'Unity Hall, Thokkottu Mangalore', 'font': font_serif_bold, 'y': 685, 'color': crimson},
        {'text': 'Sugar & Dates • Warm Welcomes Await', 'font': font_serif_italic, 'y': 740, 'color': charcoal},
    ]
    draw_items(img4, items4, 435)

    # Layer 5: RSVP & Compliments (Twin Pillars, center_x = 360)
    img5 = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    items5 = [
        {'text': 'WITH BEST COMPLIMENTS FROM :', 'font': font_gold_header, 'y': 380, 'color': gold},
        {'text': 'Relatives & Friends', 'font': font_script_hero, 'y': 415, 'color': crimson},
        {'text': '— • —', 'font': font_serif_bold, 'y': 515, 'color': gold},
        {'text': 'R.S.V.P :', 'font': font_gold_header, 'y': 565, 'color': gold},
        {'text': 'Beary & Ibrahim Family', 'font': ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 24), 'y': 600, 'color': crimson},
        {'text': '— • —', 'font': font_serif_bold, 'y': 650, 'color': gold},
        {'text': 'Resi. : Sugandh Palace, Nityanand Nagar,', 'font': font_serif_md, 'y': 695, 'color': charcoal},
        {'text': 'Ghatkopar (W), Mumbai-400 086.', 'font': font_serif_md, 'y': 725, 'color': charcoal},
    ]
    draw_items(img5, items5, 360)
    draw_plaque(img5, 'YOUR PRESENCE & DUA IS OUR GREATEST GIFT', 360, 785)

    return img1, img2, img3, img4, img5

def main():
    print('Starting Master Wedding Video Rendering (720x1280)...')
    video_orig = r'c:\Users\salma\Downloads\e4852513bffb73404f545dcbd474aa00_720w.mp4'
    gate_video = r'public/video/gate-opening-clean.mp4'
    audio_track = r'public/audio/luxe-video-audio.mp3'
    temp_mp4 = r'public/video/temp_render_720p.mp4'
    final_mp4 = r'public/video/wedding-luxe-final.mp4'

    fps = 30.0
    width = 720
    height = 1280

    # 1. Load Clean Master Plates (720x1280)
    print('Loading 720p plates...')
    plate_twin = cv2.imread('public/images/MASTER_TWIN_PILLARS_PERFECT.jpg')
    plate_single = cv2.imread('public/images/test_scene4_ABSOLUTE_PERFECTION.jpg')
    plate_fountain = cv2.imread('public/images/test_fountain_100PCT_SPOTLESS.jpg')

    # 2. Build High-Clarity Typography Layers
    print('Building dynamic transparent text layers...')
    t_layer_s1, t_layer_s2, t_layer_s3, t_layer_s4, t_layer_s5 = build_text_layers(width, height)

    # 3. Fountain Water Mask (720x1280)
    water_mask = np.zeros((height, width), dtype=np.uint8)
    cv2.rectangle(water_mask, (135, 565), (205, 645), 255, -1)
    cv2.rectangle(water_mask, (75, 645), (225, 765), 255, -1)
    cv2.ellipse(water_mask, (150, 795), (85, 25), 0, 0, 360, 255, -1)
    water_mask_blur = cv2.GaussianBlur(water_mask, (17, 17), 0)
    water_mask_norm = (water_mask_blur.astype(float) / 255.0)[:, :, np.newaxis]

    # Pre-open video for fountain streaming (seek frame 930)
    cap_water = cv2.VideoCapture(video_orig)
    cap_water.set(cv2.CAP_PROP_POS_FRAMES, 930)

    # 4. Falling Rose Petals Simulation
    petal_img = Image.open('public/images/rose_petal_particle.png').convert('RGBA')
    num_petals = 10
    petals = []
    for _ in range(num_petals):
        petals.append({
            'x': random.uniform(140, 580),
            'y': random.uniform(-60, 1240),
            'speed_y': random.uniform(2.5, 4.5),
            'sway_amp': random.uniform(15, 30),
            'sway_speed': random.uniform(0.02, 0.045),
            'sway_phase': random.uniform(0, 6.28),
            'rot': random.uniform(0, 360),
            'rot_speed': random.uniform(-1.0, 1.0),
            'scale': random.uniform(0.7, 1.1),
        })

    def draw_petals_and_text(base_bgr, text_layer_pil, text_alpha, t):
        pil_frame = Image.fromarray(cv2.cvtColor(base_bgr, cv2.COLOR_BGR2RGB))

        # Text overlay with alpha
        if text_alpha > 0.001 and text_layer_pil is not None:
            if text_alpha < 0.999:
                r, g, b, a = text_layer_pil.split()
                a_mod = a.point(lambda p: int(p * text_alpha))
                alpha_layer = Image.merge('RGBA', (r, g, b, a_mod))
                pil_frame.paste(alpha_layer, (0, 0), alpha_layer)
            else:
                pil_frame.paste(text_layer_pil, (0, 0), text_layer_pil)

        # Falling rose petals
        for p in petals:
            y = p['y'] + p['speed_y']
            if y > height + 40:
                y = random.uniform(-60, -10)
                p['x'] = random.uniform(140, 580)
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
    # PART 1: GATE OPENING VIDEO (Frames 0 to 128)
    # =========================================================================
    print('Rendering Part 1: Gate Opening Sequence...')
    cap_gate = cv2.VideoCapture(gate_video)
    last_gate_frame = None
    while True:
        ret, f = cap_gate.read()
        if not ret:
            break
        last_gate_frame = f.copy()
        out.write(f)
        global_t += 1
    cap_gate.release()
    print(f'Part 1 finished! Wrote {global_t} frames.')

    # =========================================================================
    # Master Scene Rendering Function
    # =========================================================================
    def render_scene(plate_img, text_layer, total_frames, 
                     fade_in_len=22, fade_out_len=20, 
                     prev_plate=None, dissolve_len=18, 
                     is_fountain=False):
        nonlocal global_t
        for i in range(total_frames):
            progress = i / float(total_frames)

            zoomed_bg = apply_slow_zoom(plate_img, progress)

            if is_fountain:
                ret_w, water_f = cap_water.read()
                if not ret_w:
                    cap_water.set(cv2.CAP_PROP_POS_FRAMES, 930)
                    ret_w, water_f = cap_water.read()
                if ret_w and water_f is not None:
                    zoomed_water_f = apply_slow_zoom(water_f, progress)
                    zoomed_bg = (zoomed_water_f.astype(float) * water_mask_norm + 
                                 zoomed_bg.astype(float) * (1.0 - water_mask_norm)).astype(np.uint8)

            if i < dissolve_len and prev_plate is not None:
                alpha_bg = i / float(dissolve_len)
                prev_zoomed = apply_slow_zoom(prev_plate, 1.0)
                zoomed_bg = (prev_zoomed * (1.0 - alpha_bg) + zoomed_bg * alpha_bg).astype(np.uint8)

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

            final_frame = draw_petals_and_text(zoomed_bg, text_layer, text_alpha, global_t)

            out.write(final_frame)
            global_t += 1

    # =========================================================================
    # SCENE 1: BISMILLAH & SACRED DUA (7.5s, 225 frames)
    # =========================================================================
    print('Rendering Scene 1: Bismillah & Sacred Dua...')
    render_scene(plate_twin, t_layer_s1, 225, prev_plate=last_gate_frame, dissolve_len=18)

    # =========================================================================
    # SCENE 2: HOST PARENTS & INVITATION (8.0s, 240 frames)
    # =========================================================================
    print('Rendering Scene 2: Host Parents Invitation...')
    render_scene(plate_single, t_layer_s2, 240, prev_plate=plate_twin, dissolve_len=18)

    # =========================================================================
    # SCENE 3: THE ROYAL COUPLE (8.5s, 255 frames)
    # =========================================================================
    print('Rendering Scene 3: The Royal Couple Sinan & Aysha...')
    render_scene(plate_twin, t_layer_s3, 255, prev_plate=plate_single, dissolve_len=18)

    # =========================================================================
    # SCENE 4: LIVE FOUNTAIN CEREMONY & VENUE (9.5s, 285 frames)
    # =========================================================================
    print('Rendering Scene 4: Classical Fountain with LIVE FLOWING WATER...')
    render_scene(plate_fountain, t_layer_s4, 285, prev_plate=plate_twin, dissolve_len=18, is_fountain=True)

    # =========================================================================
    # SCENE 5: RSVP & COMPLIMENTS (9.5s, 285 frames)
    # =========================================================================
    print('Rendering Scene 5: RSVP & Best Compliments...')
    render_scene(plate_twin, t_layer_s5, 285, prev_plate=plate_fountain, dissolve_len=18)

    cap_water.release()
    out.release()
    print(f'Rendered total {global_t} frames to {temp_mp4}!')

    # Mux with original high-fidelity audio track using fast visually lossless CRF 18
    print('Muxing video with original high-quality audio track...')
    cmd = [
        'ffmpeg', '-y',
        '-i', temp_mp4,
        '-i', audio_track,
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '18',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '192k',
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
