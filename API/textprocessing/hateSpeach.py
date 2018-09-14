import os
from collections import Counter
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split as tts
from sklearn.metrics import accuracy_score
import _pickle as c
import json
import codecs


def save(clf, name):
    with open(name, 'wb') as fp:
        c.dump(clf, fp)
    print ("saved")


def make_dict():
    words = []
    data = json.load(codecs.open('data.json', 'r', 'utf-8-sig'))
    positive = str(data)
    blob = str(positive)
    words += blob.split(" ")


    for i in range(len(words)):
        if not words[i].isalpha():
            words[i] = ""

    dictionary = Counter(words)

    del dictionary[""]
    mostCommonList = dictionary.most_common(2000)
    wordlist = [item for item in words if item not in mostCommonList]
    print(wordlist)
    return list(set(wordlist))








def make_dataset(dataset):
    data = json.load(codecs.open('data.json', 'r', 'utf-8-sig'))
    postive = data["positive"]
    negative = data["negative"]
    feature_set = []
    labels = []




    for value in postive.values():
        print(value)
        data = []

        try:
        	words = value.split(' ')
        except:
            print("Exception geworfen")

        for entry in dataset:
            data.append(words.count(entry))
        feature_set.append(data)
        labels.append(0)

    for value in negative.values():
        data = []

        try:
        	words = value.split(' ')
        except:
            print("Exception")
        for entry in dataset:
            data.append(words.count(entry))
        feature_set.append(data)
        labels.append(1)


    return feature_set, labels





dataset =  make_dict()
features, labels = make_dataset(dataset)

print(features)
print(labels)

x_train, x_test, y_train, y_test = tts(features, labels, test_size=0.2)


clf = MultinomialNB()

clf.fit(x_train, y_train)

preds = clf.predict(x_test)
print (accuracy_score(y_test, preds))
save(clf, "super-classifier.mdl")
