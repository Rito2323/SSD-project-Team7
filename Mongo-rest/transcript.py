# print('Hello React from Backend Express and Python')
from moviepy import editor         # for video and audio editing
# for diving some interval into number of equal lengh parts.
from numpy import linspace
import speech_recognition as sr    # actual speech recognition library
# ceil function for finding ceil of some float value
from math import ceil
import sys 

if sys.argv[1] == "video":
    # Reads the video into video variable
    video = editor.VideoFileClip('file.mp4')
    # extract Audio video
    converted_audio = video.audio
    # by writing onto a wav file creating hormony in fps(44100)
    converted_audio.write_audiofile('file.wav', logger = None, verbose = False)


audio = editor.AudioFileClip('file.wav')

# specch recognizer
r = sr.Recognizer()

out_text = ""
chunk_duration = 60  # duration of each chunk

spaces = linspace(0, audio.duration, int(ceil(audio.duration/chunk_duration)))
# utility variables for time conversion
hrs, min, sec = 0, 0, 0

# recognition process
if audio.duration > chunk_duration:

    for i in range(len(spaces)-1):
        audio.subclip(
            spaces[i], spaces[i+1]).write_audiofile('out.wav', verbose=False, logger=None)
        sec += chunk_duration
        if sec >= 60:
            min += 1
            sec -= 60
        if min >= 60:
            hrs += 1
            min -= 60
        with sr.AudioFile('out.wav') as source:

            audio_r = r.listen(source)
            try:
                sentence = r.recognize_google(audio_r)
                sentence = sentence.lower()
                # obj.make_trie(sentence.split(), time="%02d:%02d:%02d"%(hrs, min, sec))
                out_text += "%02d:%02d:%02d" % (hrs,
                                                min, sec)+" "+sentence+"\n\n"
                # print(out_text)
            except:
                pass
else:
    audio.write_audiofile('out.wav', verbose=False, logger=None)
    with sr.AudioFile('out.wav') as source:
        audio_r = r.listen(source)
        try:
            sentence = r.recognize_google(audio_r)
            sentence = sentence.lower()
            # obj.make_trie(sentence.split(" "), time=seconds)
            out_text += "%02d:%02d:%02d" % (hrs, min, sec)+" "+sentence+"\n\n"
        except:
            pass
# Debug output
print("Text: ", out_text)
