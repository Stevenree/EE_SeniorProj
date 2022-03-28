import spacy
from jamdict import Jamdict

# https://github.com/neocl/jamdict/blob/main/jamdict/util.py

if  __name__ == "__main__":
  print("Finished imports")
  nlp = spacy.load("ja_core_news_sm")
  jam = Jamdict()
  test = 'パチンコでとった金は大きか'

  doc = nlp(test)
  for token in doc:
    print(token.text, token.pos_, token.dep_)
    
    result = jam.lookup(token.text, strict_lookup=True)
    for e in result.entries:
      for s in e.senses:
        print('\t', s)
    print('\n')


