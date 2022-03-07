from flask import Flask
import sys
from transforms import ImageRatioTransform, ImageResizeTransform
from PIL import Image
import numpy as np
import torch
import time

model = torch.jit.load("models/ts-model_final-cpu.pt")
model.eval()
ratioTransformer = ImageRatioTransform( shortest_length=800, max_length=1333)

with Image.open("001.jpg") as f:
  data = np.asarray(f) # H,W,C
  data = data[:,:,::-1] # RGB--> BGR



app = Flask(__name__)

@app.route("/")
def hello_world():
  t1 = time.time()
  formatted_inputs = ratioTransformer.getTransform(data).apply_transform( tensor_format=True, device="cpu" )
  scale = formatted_inputs[1][0][2]
  pred = model(formatted_inputs)
  boxes = pred[0] * scale
  t2 = time.time()
  return f'{t2-t1} \n \n \n {boxes}'