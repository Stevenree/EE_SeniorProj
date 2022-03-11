from flask import Flask
from flask import request
from flask import response
import sys
from transforms import ImageRatioTransform, ImageResizeTransform
from PIL import Image
import numpy as np
import torch
import time

model = torch.jit.load("models/ts-model_final-cpu.pt")
model.eval()
ratioTransformer = ImageRatioTransform( shortest_length=800, max_length=1333)


def inferBoxes(model:any, transformer:any, img_data:any) -> list[list[int]]:
  '''
  Function that takes in inputted image, runs it through the transformer and into the inference model.
  Returns region in the form of [ [x1, y1, x2, y2], ...]
  '''
  t1 = time.time()
  formatted_inputs = transformer.getTransform(img_data).apply_transform( tensor_format=True, device="cpu" )
  scale = formatted_inputs[1][0][2]
  pred = model(formatted_inputs)
  boxes = pred[0] * scale
  t2 = time.time()
  print(t2-t1)
  return boxes
# with Image.open("001.jpg") as f:
#   data = np.asarray(f) # H,W,C
#   data = data[:,:,::-1] # RGB--> BGR



app = Flask(__name__)

@app.route("/")
def index():
  return "Hello world"

@app.route("/infer", methods=['POST'])
def infer():
  if request.method == 'POST':
    image = request.data
    print(image)
    inference = inferBoxes(model, ratioTransformer, image)
    return f'{t2-t1} \n \n \n {boxes}'
  else:
    return "blegh!"