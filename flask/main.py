import io
import json
from flask import Flask
from flask import request
from flask import Response
import sys
from transforms import ImageRatioTransform, ImageResizeTransform
from PIL import Image
import numpy as np
import torch
import time
import base64

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

def inferenceToList(boxes:torch.Tensor):
  lst = []
  for x in boxes:
    lst.append( {'xmin':x[0].item(), 'ymin':x[1].item(), 'xmax':x[2].item(), 'ymax':x[3].item()} )
  return lst

app = Flask(__name__)

@app.route("/")
def index():
  return "Hello world"

@app.route("/infer", methods=['POST'])
def infer():
  # Infers text bubbles from image posted
  # converts tensor to 
  if request.method == 'POST':
    image64 = request.data
    image64_decoded = base64.b64decode(image64)
    image_pil = Image.open( io.BytesIO(image64_decoded) )

    data = np.asarray(image_pil) # H,W,C
    data = data[:,:,::-1]       # RGB --> BGR

    inf = inferBoxes(model, ratioTransformer, data)
    inf_list = inferenceToList(inf)
    inf_json = json.dumps(inf_list)

    res = Response(inf_json)
    res.headers["content-type"] = 'application/json'
    res.headers["Access-Control-Allow-Origin"] = '*'
    return res
  else:
    return "blegh!"