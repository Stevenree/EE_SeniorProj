import io
import json
from typing import List
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
import pytesseract
from ocr import OCR

model = torch.jit.load("models/ts-panel-model_final-cpu.pt")
model.eval()
ratioTransformer = ImageRatioTransform( shortest_length=800, max_length=1333)
ocr = OCR()

def inferBoxes(model:any, transformer:any, img_data:any) -> List[List[int]]:
  '''
  Function that takes in inputted image, runs it through the transformer and into the inference model.
  Returns region in the form of [ [x1, y1, x2, y2], ...]
  '''
  t1 = time.time()
  
  formatted_inputs = transformer.getTransform(img_data).apply_transform( tensor_format=True, device="cpu" )
  scale = formatted_inputs[1][0][2]
  pred = model(formatted_inputs)
  print(pred)
  regions = pred[0] * scale
  regions = regions.cpu().data.numpy()
  labels = pred[2].cpu().data.numpy()

  json_arr = []
  panels = []

  # 0:text , 1:panel
  for region, label in zip(regions,labels):
    if label == 0: 
      json_arr.append( ocr.recognizeRegion(img_data, region, padding=4) )
    
    if label == 1:
      # Go through each text entry in json_array to figure out if it is nested within this panel
      left, top, right, bottom = [int(region[i]) for i in (0,1,2,3)]
      leniency = 20
      for i in range(len(json_arr)):
        if (  left-leniency < json_arr[i]['xmin'] and 
              right+leniency > json_arr[i]['xmax'] and 
              top-leniency < json_arr[i]['ymin'] and 
              bottom+leniency > json_arr[i]['ymax']
        ):
          json_arr[i]['panel'] = {'xmin':left, 'ymin':top, 'xmax':right, 'ymax':bottom}
          

  t2 = time.time()
  print(t2-t1)
  print(json_arr)
  return json_arr

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
    inf_json = json.dumps(inf)

    res = Response(inf_json)
    res.headers["content-type"] = 'application/json'
    res.headers["Access-Control-Allow-Origin"] = '*'
    return res
  else:
    return "blegh!"