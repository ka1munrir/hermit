#!/usr/bin/env python3

# Standard library imports
from random import choice as rc, random, randint

# Remote library imports
from faker import Faker


# Local imports
from app import app
from models import db, User, Quest, Review, UserQuest

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Clearing database...")
        User.query.delete()
        Quest.query.delete()
        Review.query.delete()
        UserQuest.query.delete()
        

        print("Starting seed...")
        db.create_all()
        # Seed code goes here!
        print("Starting seeding of user...")
        for _ in range(15):
            u = User(
                username = fake.name(),
                email = fake.email(),
                password_hash = "123abc!@#", 
                # phone_number=int(fake.phone_number()) // 1000,
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                age=randint(0, 100),
                city="denver",
            )

            db.session.add(u)
            db.session.commit()
        print("Starting seeding quests...")
        for _ in range(15):
            q = Quest(
                title = fake.company(),
                description = fake.paragraph(nb_sentences=5), 
                genre=rc(["Mage","Warrior","Bard"]),
                difficulty=randint(1,10),
                # last_name=fake.last_name(),
                age_restriction=randint(0, 100),
                city="denver",
                
            )
            db.session.add(q)
            db.session.commit()

        print("Starting seeding user's quests...")    
        for _ in range(15):
            uq = UserQuest(
                quest_id = randint(1,15),
                user_id = randint(1,15), 
                last_given=randint(0,5),
                status=rc(['Completed', 'In Progress', 'Not Started', 'Forsaken'])    
            )
            db.session.add(uq)
            db.session.commit()

        print("Starting seeding reviews...")
        for _ in range(15):
            r = Review(
                quest_id = randint(1,15),
                user_id = randint(1,15), 
                difficulty_rating=randint(1,10),
                goodness_rating=randint(1,10),
                feedback = fake.paragraph(nb_sentences=5),
            )
            db.session.add(r)
            db.session.commit()
        print("Seeding complete...")