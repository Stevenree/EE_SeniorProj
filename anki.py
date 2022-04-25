import json
import urllib.request

def request(action, **params):
    return {'action': action, 'params': params, 'version': 6}

def invoke(action, **params):
    requestJson = json.dumps(request(action, **params)).encode('utf-8')
    response = json.load(urllib.request.urlopen(urllib.request.Request('http://localhost:8765', requestJson)))
    if len(response) != 2:
        raise Exception('response has an unexpected number of fields')
    if 'error' not in response:
        raise Exception('response is missing required error field')
    if 'result' not in response:
        raise Exception('response is missing required result field')
    if response['error'] is not None:
        raise Exception(response['error'])
    return response['result']


cardModelParams = {
  "modelName":"Manga-OCR-Sentence",
  "inOrderFields":"",
  "css": "Optional CSS",
  "isCloze": False,
  "cardTemplates": [
    {
      "Name": "WHAT IS THIS NAME FIELD",
      "Front": "Front html {{Field1}}",
      "Back": "Back html {{Field2}}",
    }
  ]
}

a = invoke('createModel',
  modelName="Manga-OCR-Sentence", 
  inOrderFields=["Word","Definition","Sentence"],
  isCloze=False,
  cardTemplates=[{
    "Name":"Manga", 
    "Front": "<h1> {{Word}} </h1>", 
    "Back": "<h1> {{Word}} </h1> {{Definition}} <hr> {{Sentence}}"
  }]
)

b = invoke('addNote', 
  note={
    "deckName":"test",
    "modelName":"Manga-OCR-Sentence",
    "fields":{
      "Front":"front content",
      "Back": "back content",
      "Word":"word",
      "Definition":"definition",
      "Sentence":"sentence"
    },
    "options":{
      "allowDuplicate":False,
      "duplicateScope":"deck"
    },
    "tags":["Manga-OCR"]
  },
)

# c = invoke("modelFieldsOnTemplates", modelName="Manga-OCR-Sentence")

result = b

print('got list of decks: {}'.format(result))