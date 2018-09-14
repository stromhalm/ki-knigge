from flask import Flask
from flask_restful import Api
from flask_jwt import JWT
from security import authenticate,identity
from resources.api import ApiCall



app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///data.db'

app.secret_key = 'PCwpjVOTYr'
api = Api(app)
jwt =JWT(app,authenticate, identity)


#Register Endpoints of REST API
api.add_resource(ApiCall,'/api/')



if __name__ == '__main__':
    app.run(port=5000,debug=True)
