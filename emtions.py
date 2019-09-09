import tensorflow as tf
import tensorflow.keras as keras
from tensorflow.keras import layers
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os
import numpy as np

def split_csv_3():
    dataset = pd.read_csv("fer2013.csv")
    # print(dataset[dataset["Usage"].isin(["Training"])])

    print(dataset.groupby(dataset["Usage"]).count())

    train_dataset = dataset[dataset["Usage"].isin(["Training"])]
    publicTest_dataset = dataset[dataset["Usage"].isin(["PublicTest"])]
    privateTest_dataset = dataset[dataset["Usage"].isin(["PrivateTest"])]

    train_dataset.to_csv("./data/fer2013_Training.csv")
    publicTest_dataset.to_csv("./data/fer2013_PublicTest.csv")
    privateTest_dataset.to_csv("./data/fer2013_PrivateTest.csv")

if len(os.listdir("./data")) < 3 :
    print("split csv file to 3 pages...")
    split_csv_3()

train_dataset = pd.read_csv("./data/fer2013_Training.csv")
publicTest_dataset = pd.read_csv("./data/fer2013_PublicTest.csv")
privateTest_dataset = pd.read_csv("./data/fer2013_PrivateTest.csv")

# Labels
train_labels = train_dataset.pop("emotion")
publicTest_labels = publicTest_dataset.pop("emotion")
privateTest_labels = privateTest_dataset.pop("emotion")

# Pixels
train_dataset = [np.array(i.split(" "), dtype=np.float) for i in train_dataset["pixels"]]
publicTest_dataset = [np.array(i.split(" "), dtype=np.float) for i in publicTest_dataset["pixels"]]
privateTest_dataset = [np.array(i.split(" "), dtype=np.float) for i in privateTest_dataset["pixels"]]

train_dataset = np.array(train_dataset).reshape((len(train_dataset), 48,48,1))
publicTest_dataset = np.array(publicTest_dataset).reshape((len(publicTest_dataset), 48,48,1))
privateTest_dataset = np.array(privateTest_dataset).reshape((len(privateTest_dataset), 48,48,1))

train_dataset= train_dataset/ 255.0
publicTest_dataset = publicTest_dataset / 255.0
privateTest_dataset = privateTest_dataset / 255.0



def build_model():
    model = keras.models.Sequential([
        layers.Conv2D(8, (3,3), kernel_regularizer="l1", input_shape=(48,48,1)),
        layers.BatchNormalization(),
        layers.Activation("relu"),

        layers.Conv2D(8, (3, 3), kernel_regularizer="l1", ),
        layers.BatchNormalization(),
        layers.Activation("relu"),


        # layers.MaxPooling2D((2,2)),
        layers.Conv2D(16, (3, 3), kernel_regularizer="l1", ),
        layers.BatchNormalization(),
        layers.Activation("relu"),

        layers.MaxPooling2D((3, 3), strides=(2,2)),

        layers.Conv2D(32, (3, 3), kernel_regularizer="l1", ),
        layers.BatchNormalization(),
        layers.Activation("relu"),

        layers.Conv2D(64, (3, 3), kernel_regularizer="l1", ),
        layers.BatchNormalization(),
        layers.Activation("relu"),

        layers.Conv2D(128, (3, 3), kernel_regularizer="l1", ),
        layers.BatchNormalization(),
        layers.Activation("relu"),
        layers.MaxPooling2D((2, 2)),

        layers.MaxPooling2D((3, 3), strides=(2,2)),

        layers.Flatten(),
        layers.Dense(64, activation="relu"),
        layers.Dropout(0.2),
        layers.Dense(64, activation="softmax")
    ])

    print(model.summary())
    model.compile(optimizer="adam",
                  loss="sparse_categorical_crossentropy",
                  metrics=["accuracy"])

    return model

model = build_model()

history = model.fit(train_dataset, train_labels, epochs=10)
model.evaluate(publicTest_dataset, publicTest_labels)
model.evaluate(privateTest_dataset, privateTest_labels)

model.save_weights("./checkpoints/emotionDetection_1")