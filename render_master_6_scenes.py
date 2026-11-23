import cv2
import numpy as np
import os
import subprocess
import random
from PIL import Image, ImageDraw, ImageFont

def main():
    print('Starting Master 6-Scene Wedding Video Rendering (720x1280, 1455 frames, 48.50s)...')

    video_orig = r'c:\Users\salma\Downloads\e4852513bffb73404f545dcbd474aa00_720w.mp4'
    gate_video = r'public/video/gate-opening-spotless.mp4'
    audio_track = r'public/audio/new_wedding_audio.mp3'
    temp_mp4 = r'public/video/temp_master_6scenes.mp4'
    final_mp4 = r'public/video/wedding-luxe-final.mp4'

    fps = 30.0
    width = 720
    height = 1280

    # 1. Load Master Plates
    print('Loading 720p master plates...')
    plate_twin = cv2.imread('public/images/MASTER_TWIN_PILLARS_PERFECT.jpg')
    plate_single = cv2.imread('public/images/test_scene4_ABSOLUTE_PERFECTION.jpg')
    plate_fountain = cv2.imread('public/images/test_fountain_100PCT_SPOTLESS.jpg')

    # 2. Load 6 Exact Text Layers (RGBA)
    print('Loading 6 exact typography layers...')
    t_layers = [
        Image.open('temp_6_layers/s1.png').convert('RGBA'),
        Image.open('temp_6_layers/s2.png').convert('RGBA'),
        Image.open('temp_6_layers/s3.png').convert('RGBA'),
        Image.open('temp_6_layers/s4.png').convert('RGBA'),
        Image.open('temp_6_layers/s5.png').convert('RGBA'),
        Image.open('temp_6_layers/s6.png').convert('RGBA'),
    ]

    # 3. Fountain Water Mask (Gaussian feathered)
    water_mask = np.zeros((height, width), dtype=np.uint8)
    cv2.rectangle(water_mask, (135, 565), (205, 645), 255, -1)
    cv2.rectangle(water_mask, (75, 645), (225, 765), 255, -1)
    cv2.ellipse(water_mask, (150, 795), (85, 25), 0, 0, 360, 255, -1)
    water_mask_blur = cv2.GaussianBlur(water_mask, (17, 17), 0)
    water_mask_norm = (water_mask_blur.astype(float) / 255.0)[:, :, np.newaxis]

    cap_water = cv2.VideoCapture(video_orig)
    cap_water.set(cv2.CAP_PROP_POS_FRAMES, 930)

    # 4. Realistic Falling Rose Petals
    petal_img = Image.open('public/images/rose_petal_particle.png').convert('RGBA')
    num_petals = 12
    petals = []
    random.seed(42)  # Deterministic seed for reproducible beauty
    for _ in range(num_petals):
        petals.append({
            'x': random.uniform(140, 580),
            'y': random.uniform(-60, 1240),
            'speed_y': random.uniform(2.2, 4.2),
            'sway_amp': random.uniform(16, 32),
            'sway_speed': random.uniform(0.022, 0.045),
            'sway_phase': random.uniform(0, 6.28),
            'rot': random.uniform(0, 360),
            'rot_speed': random.uniform(-1.2, 1.2),
            'scale': random.uniform(0.65, 1.05),
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

        # Falling rose petals simulation
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

    def apply_slow_zoom(img, progress, max_zoom=1.025):
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
    # PART 1: GATE OPENING VIDEO (Frames 0 to 128 = 129 frames)
    # =========================================================================
    print('Rendering Part 1: Gate Opening Sequence (129 frames)...')
    cap_gate = cv2.VideoCapture(gate_video)
    last_gate_frame = None
    gate_frames_count = 0
    while True:
        ret, f = cap_gate.read()
        if not ret:
            break
        last_gate_frame = f.copy()
        out.write(f)
        global_t += 1
        gate_frames_count += 1
    cap_gate.release()
    print(f'Gate opening wrote {gate_frames_count} frames (global_t={global_t}).')

    # =========================================================================
    # Master Scene Rendering Helper
    # =========================================================================
    def render_scene(plate_img, text_layer, total_frames, 
                     fade_in_len=24, fade_out_len=20, 
                     prev_plate=None, dissolve_len=18, 
                     is_fountain=False, fade_to_black_len=0):
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

            # Scene cross-dissolve
            if i < dissolve_len and prev_plate is not None:
                alpha_bg = i / float(dissolve_len)
                prev_zoomed = apply_slow_zoom(prev_plate, 1.0)
                zoomed_bg = (prev_zoomed * (1.0 - alpha_bg) + zoomed_bg * alpha_bg).astype(np.uint8)

            # Text alpha timing
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

            # Optional fade to black at end of video
            if fade_to_black_len > 0 and i >= total_frames - fade_to_black_len:
                black_progress = (i - (total_frames - fade_to_black_len)) / float(fade_to_black_len)
                final_frame = (final_frame * (1.0 - black_progress)).astype(np.uint8)

            out.write(final_frame)
            global_t += 1

    # =========================================================================
    # SCENE 1: BISMILLAH & SACRED DUA (Frames 129..345, 217 frames, 7.23s)
    # =========================================================================
    print('Rendering Scene 1: Bismillah & Sacred Dua (217 frames)...')
    render_scene(plate_twin, t_layers[0], 217, prev_plate=last_gate_frame, dissolve_len=18)

    # =========================================================================
    # SCENE 2: POETRY & GIFT PLAQUE (Frames 346..545, 200 frames, 6.67s)
    # =========================================================================
    print('Rendering Scene 2: Poetry & Gift Plaque (200 frames)...')
    render_scene(plate_single, t_layers[1], 200, prev_plate=plate_twin, dissolve_len=20)

    # =========================================================================
    # SCENE 3: HOST PARENTS INVITATION (Frames 546..729, 184 frames, 6.13s)
    # =========================================================================
    print('Rendering Scene 3: Host Parents Invitation (184 frames)...')
    # Plate remains single pillar - smooth continuation without cut
    render_scene(plate_single, t_layers[2], 184, prev_plate=None, dissolve_len=0)

    # =========================================================================
    # SCENE 4: THE ROYAL COUPLE (Frames 730..915, 186 frames, 6.20s)
    # =========================================================================
    print('Rendering Scene 4: The Royal Couple (186 frames)...')
    render_scene(plate_twin, t_layers[3], 186, prev_plate=plate_single, dissolve_len=20)

    # =========================================================================
    # SCENE 5: LIVE FOUNTAIN - NIKAH & VENUE (Frames 916..1180, 265 frames, 8.83s)
    # =========================================================================
    print('Rendering Scene 5: Live Fountain - Nikah & Venue (265 frames)...')
    render_scene(plate_fountain, t_layers[4], 265, prev_plate=plate_twin, dissolve_len=22, is_fountain=True)

    # =========================================================================
    # SCENE 6: COMPLIMENTS, RESIDENCE & GIFT PLAQUE (Frames 1181..1454, 274 frames, 9.13s)
    # =========================================================================
    print('Rendering Scene 6: Compliments, Residence & Gift Plaque (274 frames)...')
    render_scene(plate_twin, t_layers[5], 274, prev_plate=plate_fountain, dissolve_len=22, fade_to_black_len=28)

    out.release()
    cap_water.release()
    print(f'Raw rendering complete! Total frames written: {global_t} (expected 1455).')

    # =========================================================================
    # FFMPEG MOBILE-OPTIMIZED ENCODING
    # =========================================================================
    print('Re-encoding with mobile-optimized H.264 Main Profile Level 3.1 + FastStart...')
    cmd = [
        'ffmpeg', '-y',
        '-i', temp_mp4,
        '-i', audio_track,
        '-filter_complex', '[1:a]afade=t=out:st=46.2:d=2.5[a]',
        '-map', '0:v',
        '-map', '[a]',
        '-c:v', 'libx264',
        '-preset', 'slow',
        '-crf', '22',
        '-maxrate', '2000k',
        '-bufsize', '4000k',
        '-profile:v', 'main',
        '-level', '3.1',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '160k',
        '-shortest',
        '-movflags', '+faststart',
        final_mp4
    ]
    subprocess.run(cmd, check=True)

    final_size_mb = os.path.getsize(final_mp4) / (1024 * 1024)
    print(f'SUCCESS! Final mobile-optimized video created at {final_mp4} ({final_size_mb:.2f} MB)!')

if __name__ == '__main__':
    main()
