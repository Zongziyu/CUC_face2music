import os
import json
from flask import Flask, request
import numpy as np
import face_recognition
from PIL import Image
import base64

app = Flask(__name__)

def get_face_location(width, height, array):
    pic=np.zeros((height, width, 3))
    for i in range(0,height):
        for j in range(0,width):
            # print(array[i * width * 4 + j*4: i * width * 4 + j*4 + 3])
            pic[i][j] = array[i * width * 4 + j*4: i * width * 4 + j*4 + 3]
    image=Image.fromarray(np.array(pic, dtype=np.uint8)).convert("L")
    try:
        face = np.array(image)
        locations = face_recognition.face_locations(face)
        return str(locations)
    except:
        return "faild"


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
            return get_face_location(640, 480, np.fromstring(a, dtype=np.uint8))
    return 'Wrong'

if __name__ == "__main__":
    app.debug=True
    app.run(host="0.0.0.0", port=5000, ssl_context='adhoc')
