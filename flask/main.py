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
import pytesseract

model = torch.jit.load("models/ts-model_final-cpu.pt")
model.eval()
ratioTransformer = ImageRatioTransform( shortest_length=800, max_length=1333)
custom_fig = r'--oem 3 --psm 5'
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'

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
  boxes = boxes.cpu().data.numpy()

  json_arr = []

  for i in boxes:
    img_roi = img_data[int(i[1]-4):int(i[3]+4), int(i[0]-4):int(i[2]+4)]
    ocr_result = pytesseract.image_to_string(img_roi, 'jpn_vert', config=custom_fig) # str
    ocr_result = ocr_result.replace("\n", "")
    ocr_result = ocr_result.replace(" ", "")
    json_arr.append( {'xmin':int(i[0]), 'ymin':int(i[1]), 'xmax':int(i[2]), 'ymax':int(i[3]), 'text':ocr_result} )

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