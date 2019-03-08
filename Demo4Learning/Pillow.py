# Image Module
# @description:
# Pillow is the friendly PIL fork,PIL is the Python Imaging Library.
# @author:Arron
# @begin-time:2019-03-07 21:00
#
# @Pillow-install:
# sudo pip3 install pillow
#
# @official-address:
# https://pillow.readthedocs.io/en/latest/
#
#


from PIL import Image, ImageDraw

#basic ops

image = Image.open("text.jpeg")

image.show()

print(type(image))
print(image.size)
print(image.mode)
print(image.height)
print(image.width)
print(image.format)
print(image.format_description)

#Thumbnail 缩略图

image.thumbnail((image.width // 2, image.height // 2))  #改变原图
#:param size: a tuple

image.show()

#Crop 剪裁图像

im_crop = image.crop((0,0,image.width //2,image.height //2)) #不改变原图
im_crop.show()

#ImageDraw Module
image2 = Image.open("text_face.jpeg")

#Line
draw_obj = ImageDraw.Draw(image2)
draw_obj.line([0,0, 10,10], 'red')

#Rectangle
draw_obj.rectangle([390,217, 613, 440], outline='red')
image2.show()



