import sqlite3
from flask_restful import Resource,reqparse
from models.kiapi import KIAPI





class ApiCall(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('input', type=str, required=True, help="This field can not be left blank")


    def post(self):
        data = ApiCall.parser.parse_args()
        input = KIAPI(**data)

        # Komplexer Aufruf der die Daten verarbeitet.

        return {"input" : input.input,
        "score" : 100}
