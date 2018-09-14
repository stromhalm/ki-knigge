import sqlite3
from flask_restful import Resource,reqparse
from models.kiapi import KIAPI
from textprocessing.profanityFilter import Filter
from textprocessing.detector import scanForSpam




class ApiCall(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('input', type=str, required=True, help="This field can not be left blank")


    def post(self):
        data = ApiCall.parser.parse_args()
        input = KIAPI(**data)

        # Komplexer Aufruf der die Daten verarbeitet.
        f = Filter(input.input, clean_word='unicorn')
        goodText = f.clean()

        return {"input" : input.input,
        "cleanText" : goodText,
        "score" : scanForSpam(input.input) }


        # Alles groß, Satzzeichen
