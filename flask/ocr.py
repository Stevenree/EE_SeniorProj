import logging
import traceback
from typing import List
from jamdict import Jamdict
import pytesseract
from sudachipy import tokenizer
from sudachipy import dictionary

# https://github.com/neocl/jamdict/blob/main/jamdict/util.py

#! Change this to the proper pytesseract bin file for your system.
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'

class OCR():
  def __init__(self):
    self.custom_fig = r'--oem 3 --psm 5' # Pytesseract presets for vertical text detection
    self.tokenizationMode = tokenizer.Tokenizer.SplitMode.C
    self.tokenizer_obj = dictionary.Dictionary().create()
    self.jam = Jamdict()
  
  def recognizeRegion(self, original_img, xyxy, padding:int=0) -> dict:
    '''
    Takes in a RGB array for an image and the region of interest (with padding) to perform vertical Japanese OCR.
    Returns a JSON for the region with the xyxy region and text
    '''
    try:
      p = padding
      left, top, right, bottom = int(xyxy[0]-p), int(xyxy[1]-p), int(xyxy[2]+p), int(xyxy[3]+p)
      img_roi = original_img[top:bottom, left:right]

      text = pytesseract.image_to_string(img_roi, 'jpn_vert', config=self.custom_fig) # str
      text = text.replace("\n", "")
      text = text.replace(" ", "")
      tokens = self.tokenize(text)
      return {'xmin':left, 'ymin':top, 'xmax':right, 'ymax':bottom, 'text':tokens}
    except Exception as e:
      print(e)

  def tokenize(self, text:str) -> List:
    '''
    [{"token": "__", "dictForm": "__", "definitions": ["__",...}, ...]
    '''
    jam = Jamdict()
    tokens  = [{"token":m.surface(), "lemma":m.dictionary_form()} for m in self.tokenizer_obj.tokenize(text, self.tokenizationMode)]

    for i in range(len(tokens)):
      tokens[i]["definitions"] = []
      
      if tokens[i]["lemma"] != "":
        try:
          result = jam.lookup(query=tokens[i]["lemma"])
          for definition in result.entries[:3]:
              tokens[i]['definitions'].append(definition.text())
        except Exception as e:
          logging.error(traceback.format_exc())
          continue

    return tokens

# if  __name__ == "__main__":
#   print("Finished imports")
#   nlp = spacy.load("ja_core_news_sm")
#   jam = Jamdict()
#   test = 'パチンコでとった金は大きか'

#   doc = nlp(test)
#   for token in doc:
#     print(token.text, token.pos_, token.dep_)
    
#     result = jam.lookup(token.text, strict_lookup=True)
#     for e in result.entries:
#       for s in e.senses:
#         print('\t', s)
#     print('\n')


