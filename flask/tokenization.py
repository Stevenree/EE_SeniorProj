from sudachipy import tokenizer
from sudachipy import dictionary

tokenizer_obj = dictionary.Dictionary().create()

text = 'これに不快感を示す住民はいましたが,現在,表立って反対や抗議の声を挙げている住民はいないようです。'

modeA = tokenizer.Tokenizer.SplitMode.A
modeB = tokenizer.Tokenizer.SplitMode.B
modeC = tokenizer.Tokenizer.SplitMode.C

out = [m.dictionary_form() for m in tokenizer_obj.tokenize(text, modeC)]
