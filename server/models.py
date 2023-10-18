from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
import math

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users_table'
    # Add serialization rules
    serialize_rules = ('-password_hash', '-user_quest_rel.user_rel', '-review_rel.user_rel')
    #columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String,unique=True)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)
    # phone_number = db.Column(db.Integer)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    age = db.Column(db.Integer)
    city = db.Column(db.String)
    # Add relationships
    user_quest_rel = db.relationship('UserQuest', back_populates = 'user_rel', cascade = 'all, delete-orphan')
    review_rel = db.relationship('Review', back_populates = 'user_rel', cascade = 'all, delete-orphan')
    #password stuff
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash,
            password.encode('utf-8')
        )
    #validations
    @validates('username', 'password_hash', 'first_name', 'last_name', 'age')
    def validate_null_false(self, key, value):
        if value:
            return value
        return ValueError(f'{key} must have a value')
    @validates('city')
    def validate_city(self, key, city):
        CITIES = ['denver']
        if city:
            if city.lower() in CITIES:
                return city.lower()
            return ValueError(f'We do not support {city.lower()}. We only support {CITIES}.')
        return ValueError('city must have a value')
    # @validates('phone_number')
    # def validate_phone(self, key, phone_number):
    #     if math.floor(math.log10(phone_number)) != 9:
    #         raise ValueError("Please enter a valid phone number")
    #     return phone_number

class UserQuest(db.Model, SerializerMixin):
    __tablename__ = 'user_quests_table'
    # Add serialization rules
    serialize_rules = ('-quest_rel.user_quest_rel', '-user_rel.user_quest_rel')
    #columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    quest_id = db.Column(db.Integer, db.ForeignKey('quests_table.id'))
    last_given = db.Column(db.Integer)
    status = db.Column(db.String)
    # Add relationships
    user_rel = db.relationship('User', back_populates = 'user_quest_rel')
    quest_rel = db.relationship('Quest', back_populates = 'user_quest_rel')
    #validations
    @validates('status')
    def validate_status(self, key, status):
        STATUS = ['Completed', 'In Progress', 'Not Started', 'Forsaken']
        if status not in STATUS:
            return ValueError(f'Status must be {STATUS}')
        return status

class Quest(db.Model, SerializerMixin):
    __tablename__ = 'quests_table'
    # Add serialization rules
    serialize_rules = ('-user_quest_rel.quest_rel', '-review_rel.quest_rel')
    #columns
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    genre = db.Column(db.String)
    difficulty = db.Column(db.Integer)
    city = db.Column(db.String)
    age_restriction = db.Column(db.Integer)
    # Add relationships
    user_quest_rel = db.relationship('UserQuest', back_populates = 'quest_rel', cascade = 'all, delete-orphan')
    review_rel = db.relationship('Review', back_populates = 'quest_rel', cascade = 'all, delete-orphan')
    # add validations
    @validates('genre')
    def validate_status(self, key, genre):
        GENRE = ['Mage', 'Bard',"Warrior"]
        if genre not in GENRE:
            return ValueError(f'Status must be {GENRE}')
        return genre

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews_table'
    # Add serialization rules
    serialize_rules = ('-quest_rel.review_rel', '-user_rel.review_rel')
    #columns
    id = db.Column(db.Integer, primary_key=True)
    quest_id = db.Column(db.Integer, db.ForeignKey('quests_table.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    difficulty_rating = db.Column(db.Integer)
    goodness_rating = db.Column(db.Integer)
    feedback = db.Column(db.String)
    # Add relationships
    user_rel = db.relationship('User', back_populates = 'review_rel')
    quest_rel = db.relationship('Quest', back_populates = 'review_rel')

    #validations
    @validates('difficulty_rating', 'goodness_rating')
    def validate_null_false(self, key, value):
        if value:
            return value
        return ValueError(f'{key} must have a value')
