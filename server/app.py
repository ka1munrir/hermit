#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Quest, Progress, Review
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
        print(request.get_json())
        try:
            new_user = User(
                username=request.get_json()['username'],
                password_hash=request.get_json()['password_hash'],
                email=request.get_json()['email'],
                phone_number=request.get_json()['phone_number'],
                first_name=request.get_json()['first_name'],
                last_name=request.get_json()['last_name'],
                age=request.get_json()['age'],
                city=request.get_json()['city']
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
                return 'User no more', 204
            except Exception:
                return '', 400
        else:
            return {"error": "User not found"}, 404
api.add_resource(UserById_Route, '/users/<int:id>')

class Quests_Route(Resource):
    def get(self):
        quests = [quest.to_dict() for quest in Quest.query.all()]
        return quests, 200
    def post(self):
        try:
            new_quest = Quest(
                title=request.get_json().get('title'),
                description=request.get_json().get('description'),
                genre=request.get_json().get('genre'),
                difficulty=request.get_json().get('difficulty'),
                city=request.get_json().get('city'),
                age_restriction=request.get_json().get('age_restriction')
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
            

        db.session.add(new_quest)
        db.session.commit()

        return new_quest.to_dict(), 200
api.add_resource(Quests_Route, '/quests')
class QuestById_Route(Resource):
    def get(self, id):
        quest = Quest.query.filter_by(id=id).first()
        if quest:
            return quest.to_dict(), 200
        return {"error": "Quest not found"}, 404
    def patch(self, id):
        quest = Quest.query.filter_by(id=id).first()

        if quest:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(quest, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(quest)
                db.session.commit()
                return quest.to_dict(), 202
        
        return {"error": "Quest not found"}, 404
    
    def delete(self, id):
        quest = Quest.query.filter_by(id=id).first()
        if quest:
            try:
                db.session.delete(quest)
                db.session.commit()
                return 'This quest was deemed to gnarly', 202
            except Exception:
                return 'So gnarly it broke the back', 400
        else:
            return {"error": "Quest not found"}, 404
api.add_resource(QuestById_Route, '/quests/<int:id>')

class Progress_Route(Resource):
    def get(self):
        progresses = [progress.to_dict() for progress in Progress.query.all()]
        return progresses, 200
    def post(self):
        try:
            new_progress = Progress(
                user_id=request.get_json().get('user_id'),
                quest_id=request.get_json().get('quest_id'),
                last_given=request.get_json().get('last_given'),
                status=request.get_json().get('status')
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
            

        db.session.add(new_progress)
        db.session.commit()

        return new_progress.to_dict(), 200
api.add_resource(Progress_Route, '/progresses')
class ProgressById_Route(Resource):
    def get(self, id):
        progress = Progress.query.filter_by(id=id).first()
        if progress:
            return progress.to_dict(), 200
        return {"error": "Progress not found"}, 404
    def patch(self, id):
        progress = Progress.query.filter_by(id=id).first()

        if progress:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(progress, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(progress)
                db.session.commit()
                return progress.to_dict(), 202
        
        return {"error": "Progress not found"}, 404
    
    def delete(self, id):
        progress = Progress.query.filter_by(id=id).first()
        if progress:
            try:
                db.session.delete(progress)
                db.session.commit()
                return 'Congrats you failed Muahahahahahahaha', 202
            except Exception:
                return 'Whoops', 400
        else:
            return {"error": "Progress not found"}, 404
api.add_resource(ProgressById_Route, '/progresses/<int:id>')

class Reviews_Route(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return reviews, 200
    def post(self):
        try:
            new_review = Review(
                user_id=request.get_json().get('user_id'),
                quest_id=request.get_json().get('quest_id'),
                difficulty_rating=request.get_json().get('difficulty_rating'),
                goodness_rating=request.get_json().get('goodness_rating'),
                feedback=request.get_json().get('feedback')
            )
        except ValueError as e:
            return {"errors": str(e)}, 400
            

        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict(), 200
api.add_resource(Reviews_Route, '/reviews')
class ReviewById_Route(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            return review.to_dict(), 200
        return {"error": "Review not found"}, 404
    def patch(self, id):
        review = Review.query.filter_by(id=id).first()

        if review:
            dtp = request.get_json()
            errors = []
            for attr in dtp:
                try:
                    setattr(review, attr, dtp[attr])
                except ValueError as e:
                    errors.append(e.__repr__())
            if len(errors) != 0:
                return {"errors": errors}, 400
            else:
                db.session.add(review)
                db.session.commit()
                return review.to_dict(), 202
        
        return {"error": "Review not found"}, 404
    
    def delete(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            try:
                db.session.delete(review)
                db.session.commit()
                return 'we deem this review unworthy .... tsssss', 202
            except Exception:
                return 'oh no', 400
        else:
            return {"error": "Name not found"}, 404
api.add_resource(ReviewById_Route, '/reviews/<int:id>')

if __name__ == '__main__':
    app.run(port=5000, debug=True)

