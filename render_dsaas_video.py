
import os
from gtts import gTTS
from moviepy.editor import TextClip, CompositeVideoClip, ColorClip, AudioFileClip, concatenate_videoclips

# Configuration
BG_DARK = (18, 3, 7)
GOLD_TEXT = "#FFD700"

def create_scene(text, duration, is_intro=False):
    # This renders the frames programmatically to avoid AI filter triggers
    audio_file = "temp_audio.mp3"
    tts = gTTS(text=text, lang="en")
    tts.save(audio_file)
    audio = AudioFileClip(audio_file)
    
    # Placeholder: Replace these with your actual rendered character clips
    # In a real environment, you would swap these for your animated mp4s
    bg = ColorClip(size=(1920, 1080), color=BG_DARK, duration=duration)
    text_clip = TextClip(text, fontsize=70, color=GOLD_TEXT, font="Georgia-Bold", size=(1500, None), method="caption")
    
    final = CompositeVideoClip([bg, text_clip.set_position("center")]).set_audio(audio).set_duration(duration)
    return final

print("--- Rendering Roaring 20s DSaaS Commercial ---")
intro = create_scene("Knock Knock. Password? Sherbet Lemon.", 2.0, is_intro=True)
body = create_scene("Step right up! The Renaissance of Design System as a Service is here.", 10.0)

final = concatenate_videoclips([intro, body])
final.write_videofile("final_commercial.mp4", fps=24)
