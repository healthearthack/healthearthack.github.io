import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from gtts import gTTS
from moviepy.editor import ImageClip, CompositeVideoClip, AudioFileClip, concatenate_videoclips

BG_DARK = (18, 3, 7)
GOLD_TEXT = "#FFD700"
WHITE_TEXT = "#FFFDF5"

script_scenes = [
    {"text": "Step right up! Why are you still managing design systems like static paper blueprints? Buttons break in Figma and tokens get lost in Git.", "badge": "🎩 THE PROBLEM: 4,000 STATIC COMPONENTS"},
    {"text": "Behold the Renaissance of Design System as a Service! We stream live AI native tokens in golden craftsmanship across web, mobile, and hardware.", "badge": "✨ THE SOLUTION: LIVE AI-NATIVE ENGINE"},
    {"text": "According to my compiler logs... SHICKA SHICKA HUZZAH! Stop maintenance hell and let AI handle the tailored UI.", "badge": "🎷 SHICKA SHICKA HUZZAH!"},
    {"text": "The Universal Design System. Everything you need, beautifully embroidered in place.", "badge": "HEALTHEARTHACK.GITHUB.IO"}
]

def make_slide_image(badge, text):
    img = Image.new("RGB", (1920, 1080), color=BG_DARK)
    draw = ImageDraw.Draw(img)
    try:
        font_badge = ImageFont.truetype("georgiab.ttf", 55)
        font_sub = ImageFont.truetype("georgia.ttf", 38)
    except:
        font_badge = ImageFont.load_default()
        font_sub = ImageFont.load_default()
    draw.text((960, 320), badge, fill=GOLD_TEXT, font=font_badge, anchor="mm")
    words = text.split()
    lines, current = [], []
    for w in words:
        current.append(w)
        if len(" ".join(current)) > 45:
            lines.append(" ".join(current[:-1]))
            current = [w]
    lines.append(" ".join(current))
    y = 580
    for line in lines:
        draw.text((960, y), line, fill=WHITE_TEXT, font=font_sub, anchor="mm")
        y += 50
    return np.array(img)

clips = []
print("🎙️ Step 1/3: Generating Voiceover & PIL visual frames...")
for idx, scene in enumerate(script_scenes):
    audio_file = f"temp_voice_{idx}.mp3"
    tts = gTTS(text=scene["text"], lang="en", tld="com")
    tts.save(audio_file)
    audio_clip = AudioFileClip(audio_file)
    duration = audio_clip.duration + 0.6
    frame_array = make_slide_image(scene["badge"], scene["text"])
    img_clip = ImageClip(frame_array).set_duration(duration).set_audio(audio_clip)
    clips.append(img_clip)

print("🎬 Step 2/3: Concatenating and rendering MP4 video...")
final_video = concatenate_videoclips(clips)
output_file = "commercial_design_system.mp4"
final_video.write_videofile(output_file, fps=24, codec="libx264", audio_codec="aac")

for idx in range(len(script_scenes)):
    temp_p = f"temp_voice_{idx}.mp3"
    if os.path.exists(temp_p):
        os.remove(temp_p)

print(f"✨ Step 3/3 SUCCESS! '{output_file}' rendered smoothly!")
