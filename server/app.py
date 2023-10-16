#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Hermit Server</h1>'
class Login_Route(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter_by(username=username).first()
# sourcery skip: merge-nested-ifs
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
            else:
                return {"Error": "Password is incorrect"}, 401
        return {"Error": "User doesn't exist"}, 401
api.add_resource(Login_Route, '/login')

class Logout_Route(Resource):
    def delete(self):
        session['user_id'] = None
        return {''}, 204
api.add_resource(Logout_Route, '/logout')

class CheckSession(Resource):
    def get(self):
        user = User.query.filter_by(id=session.get('user_id'))
        if user:
            return user.to_dict(), 200
        return {'message': 'Not Authorized'}, 401
api.add_resource(CheckSession, '/check_session')



if __name__ == '__main__':
    app.run(port=5000, debug=True)

