import numpy as np
from PIL import Image

# import tensorflow as tf
# import tensorflow.keras as keras

# path of pic for test
# path = "./i_for_test.png"
# image = Image.open(path).convert("L")
#
# # (top, right, bottom, left)
# coordinates = (180, 428, 366, 242)
# # (left, upper, right, lower)


def crop_image(image, coordinates):
    horiz = coordinates[1]-coordinates[3]
    vert = coordinates[2] - coordinates[0]
    p = horiz if horiz > vert else vert
    return image.crop((coordinates[3], coordinates[0], coordinates[3] + p, coordinates[0] +p))

def thumbnail_image(image, length):

    temp = image

    pic_size = temp.size
    temp.thumbnail((length, length))
    return temp


# print(get_emotion(image, coordinates))