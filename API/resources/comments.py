import sqlite3
from flask_restful import Resource,reqparse
from models.comment import Comment
from textprocessing.profanityFilter import Filter
from textprocessing.detector import scanForSpam




class Comment(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('comment', type=str, required=True, help="This field can not be left blank")


    def post(self):
        data = Comments.parser.parse_args()
        comment = Comment(**data)

        print(comment.comment)

        return comment.json()


        # Alles groß, Satzzeichen
