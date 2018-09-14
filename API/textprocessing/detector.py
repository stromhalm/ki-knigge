import _pickle as c
import os
from sklearn import *
import sys
from collections import Counter


def load(clf_file):
    with open(clf_file,"rb") as fp:
        clf = c.load(fp)
    return clf


def make_dict():
    direc = "textprocessing/emails/"
    files = os.listdir(direc)
    emails = [direc + email for email in files]
    words = []
    c = len(emails)

    for email in emails:
        f = open(email,  encoding = "ISO-8859-1")
        try:
            blob = f.read()
            words += blob.split(" ")
            print (c)
            c -= 1
        except:
            break

    for i in range(len(words)):
        if not words[i].isalpha():
            words[i] = ""

    dictionary = Counter(words)
    del dictionary[""]
    return dictionary.most_common(4000)


clf = load("textprocessing/super-classifier.mdl")
d = make_dict()


def scanForSpam(inputText):
    features = []
    inp = inputText.split()
    for word in d:
        features.append(inp.count(word[0]))
    res = clf.predict([features])

    list = clf.predict_proba([features])
    return ({"Val1" : round(list[0][0] * 100,0),
    "Val2" : round(list[0][1] * 100,0)})


while False:
    features = []
    inp = input(">").split()
    if inp[0] == "exit":
        break
    for word in d:
        features.append(inp.count(word[0]))
    res = clf.predict([features])
    print (clf.predict_proba([features]))
    print (["Not Spam", "Spam!"][res[0]])
