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

class Users_Route(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200
    def post(self):
        try:
            new_user = User(
                username=request.get_json().get('username'),
                password_hash=request.get_json().get('password_hash'),
                email=request.get_json().get('email'),
                phone_number=request.get_json().get('phone_number'),
                first_name=request.get_json().get('first_name'),
                last_name=request.get_json().get('last_name'),
                age=request.get_json().get('age'),
                city=request.get_json().get('city')
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
            

        db.session.add(new_user)
        db.session.commit()

        return new_user.to_dict(), 200
api.add_resource(Users_Route, '/users')
class UserById_Route(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return user.to_dict(), 200
        return {"error": "User not found"}, 404
    def patch(self, id):
        user = User.query.filter_by(id=id).first()

        if user:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(user, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(user)
                db.session.commit()
                return user.to_dict(), 202
        
        return {"error": "User not found"}, 404
    
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            try:
                db.session.delete(user)
                db.session.commit()
                return '', 204
            except Exception:
                return '', 400
        else:
            return {"error": "User not found"}, 404
api.add_resource(UserById_Route, '/users/<int:id>')


if __name__ == '__main__':
    app.run(port=5000, debug=True)

