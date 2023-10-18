#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Quest, Review, UserQuest

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        db.create_all()
        # Seed code goes here!
        print("Starting seeding of user...")
        for _ in range(15):
            u = User(
                username = fake.name(),
                email = fake.email(),
                password_hash = "123abc!@#", 
                phone_number=fake.phone_number(),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                age=fake.age(),
                city="denver",
            )

            db.session.add(u)
            db.session.commit()
        print("Starting seeding quests...")
        for _ in range(15):
            q = Quest(
                title = fake.title(),
                description = fake.description(), 
                genre=fake.genre(),
                difficulty=fake.first_name(),
                last_name=fake.last_name(),
                age=fake.age(),
                city="denver",
                age_restriction=0,
            )
            db.session.add(q)
            db.session.commit()
            
        print("Starting seeding user's quests...")    
        for _ in range(15):
            uq = UserQuest(
                quest_id = fake.quest_id(),
                user_id = fake.user_id(), 
                last_given=fake.last_given(),
                status=fake.status(),    
            )
            db.session.add(uq)
            db.session.commit()

        print("Starting seeding reviews...")
        for _ in range(15):
            r = Review(
                quest_id = fake.quest_id(),
                user_id = fake.user_id(), 
                difficulty_rating=fake.difficulty_rating(),
                goodness_rating=fake.goodness_rating(),
                feedback=fake.feedback(),
            )
            db.session.add(r)
            db.session.commit()