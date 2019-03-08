# face_recognition Module
# @description:
# face recognitio easily
# @author:Arron
# @begin-time:2019-03-07 21:00
#
# @face_recognition-install:
# sudo pip3 install CMake
# sudo pip3 install dlib
# #https://gist.github.com/ageitgey/629d75c1baac34dfa5ca2a1928a7aeaf
#
# sudo pip3 install face_recognition
# @official-address:
# https://github.com/ageitgey/face_recognition
#

import face_recognition
from PIL import Image, ImageDraw
import numpy as np

def show_face(image_path):
    image = Image.open(image_path)
    face = np.array(image)
    locations = face_recognition.face_locations(face)
    print(locations)
    for location in locations:
        location = locations[0]
        face_im = image.crop((location[3], location[0], location[1], location[2]))
        face_im.show()

    face2 = Image.fromarray(face)
    d = ImageDraw.Draw(face2)
    face_landmarks_list = face_recognition.face_landmarks(face, face_locations=locations)
    for face_landmark in face_landmarks_list:
        for i in face_landmark.keys():
            d.line(face_landmark[i],fill='red', width=1)
    face2.show()

show_face("text.jpeg")