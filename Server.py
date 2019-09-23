import os
import json
from flask import Flask, request, Response
import numpy as np
import face_recognition
from PIL import Image
import base64

import tensorflow as tf
import tensorflow.keras as keras

from utils import procImg as pi
#
# # tensorflow models

# # from tensorflow.keras import layers
# # import emtions

app = Flask(__name__)
# model = keras.models.load_model("./checkpoints/emotionDetection_1.h5")
graph = tf.compat.v1.get_default_graph()

with graph.as_default():

    global model

    def get_face_location(image):
        try:

            face = np.array(image)
            locations = face_recognition.face_locations(face)
            if len(locations) == 0:
                return "failed"
                print("face recognition failed")
            # evaluate_emotion(array)
            return locations
        except:
            print("face recognition failed")
            return "failed"


    # def evaluate_emotion(face_img_array):
    #
    #
    #     return model.fit(face_img_array)




    def get_emotion(image, coordinates):

        thumb = pi.crop_image(image, coordinates)
        # thumb.show()
        thumb = pi.thumbnail_image(thumb, 48)
        # thumb.show()
        # print(thumb.size)
        model = keras.models.load_model("./checkpoints/emotionDetection_1_1.h5")

        emotion = model.predict(np.array(np.array(thumb)).reshape((1, 48, 48, 1)))[0]

        return np.argmax(emotion)

    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    @app.route("/main")
    def main():
        return app.send_static_file("main.html")

    @app.route("/send", methods=['GET', "POST"])
    def upload():
        if request.method == "POST":
            a = request.get_data()
            if a :
                print(len(a))
                # emotion=model.predict()
                a = np.fromstring(a, dtype=np.uint8)
                height = 480
                width = 640
                pic = np.zeros((height, width, 3))
                for i in range(0, height):
                    for j in range(0, width):
                        # print(array[i * width * 4 + j*4: i * width * 4 + j*4 + 3])
                        pic[i][j] = a[i * width * 4 + j * 4: i * width * 4 + j * 4 + 3]
                image = None
                image = Image.fromarray(np.array(pic, dtype=np.uint8)).convert("L")
                # image.show()
                location = get_face_location(image)
                if location == "failed":
                    return "failed"
                emotion = get_emotion(image, location[0])
                return str(location)+","+str(emotion)
        return 'Wrong'

    @app.route("/gen_audio", methods=["GET"])
    def gen_audio():
        def generate():
            path = "./static/0.m4a"
            with open(path, 'rb') as audio:
                data = audio.read()
                while data:
                    yield data
                    data = audio.read(1024)
        return Response(generate(), mimetype="audio/mpeg3")

    if __name__ == "__main__":
        # app.debug=True

        app.run(host="0.0.0.0", port=5000, ssl_context='adhoc')
