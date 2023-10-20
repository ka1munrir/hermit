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
        # for _ in range(15):
        #     q = Quest(
        #         title = fake.company(),
        #         description = fake.paragraph(nb_sentences=5), 
        #         genre=rc(["Mage","Warrior","Bard"]),
        #         difficulty=randint(1,10),
        #         # last_name=fake.last_name(),
        #         age_restriction=randint(0, 100),
        #         city="denver",
        #     )
        q1 = Quest(
            title = "Journey to the Tranquil Park of Whispering Leaves" ,
            description = "Venture deep into the mystical forest of Denver to find the Tranquil Park of Whispering Leaves. This serene oasis is rumored to be a place where ancient trees whisper secrets of inner peace. Your quest is to meditate and commune with the spirits of nature, unlocking the wisdom they offer, and finding solace in their ancient presence.", 
            genre="Mage",
            difficulty=2,
            age_restriction=0,
            city="denver",                
        )
        q2 = Quest(
            title = "The Artifacts of Creativity at the Denver Art Museum" ,
            description = " In the heart of the city lies the enigmatic Denver Art Museum, where the Artifacts of Creativity are hidden. Legend has it that these relics hold the power to liberate your artistic soul from the shackles of self-doubt. Your mission is to uncover these artifacts and unleash your creative potential upon the world.", 
            genre="Mage",
            difficulty=3,
            age_restriction=0,
            city="denver",                
        )
        q3 = Quest(
            title = "The Quest for the Cafe of Solitude" ,
            description = "Your journey takes you to the hidden realm of the Café of Solitude, known only to a select few. Here, you'll find an enchanted cafe where introverts gather to savor exquisite elixirs and converse through the medium of silent reading. Your challenge is to sit alone, engage with ancient tomes, and tap into the power of serenity that this mystical place offers.", 
            genre="Mage",
            difficulty=2,
            age_restriction=16,
            city="denver",                
        )
        q4 = Quest(
            title = "The Herbology Trials at the Botanic Gardens" ,
            description = "A dark enchantment has fallen upon the Denver Botanic Gardens, rendering it a place of solitude and reflection. Your task is to gather rare herbs hidden within the garden. Once combined, these herbs will create a potion capable of soothing your social anxiety and restoring the garden to its former glory.", 
            genre="Mage",
            difficulty=5,
            age_restriction=0,
            city="denver",                
        )
        q5 = Quest(
            title = "The Masks of Confidence at the Masquerade Ball" ,
            description = "The grand Masquerade Ball, known for its mystique and magic, is your next destination. Here, you will acquire an enchanted mask that conceals your deepest insecurities. Among masked guests, you'll dance and converse, unveiling newfound courage and confidence with each step.", 
            genre="Mage",
            difficulty=9,
            age_restriction=0,
            city="denver",                
        )
        q6 = Quest(
            title = "The Guild of Volunteering" ,
            description = " Join the esteemed Guild of Volunteering, where your service to the realm of Denver will unlock your potential for connection and empathy. Your task is to embark on missions of kindness and support, forging connections that will strengthen your heart and mind.", 
            genre="Bard",
            difficulty=7,
            age_restriction=14,
            city="denver",                
        )
        q7 = Quest(
            title = "Cooking Mastery" ,
            description = "The Feast of Friendship: As an apprentice in the culinary arts, you'll attend the grand Cooking Mastery challenge. Collaborate with fellow apprentices to prepare a magnificent feast, where flavors and shared experiences will foster deep connections and lasting friendships.", 
            genre="Bard",
            difficulty=5,
            age_restriction=18,
            city="denver",                
        )
        q8 = Quest(
            title = "The Artistry Guild of Denver" ,
            description = "In the hidden quarters of Denver, the Artistry Guild awaits. Here, you will hone your skills in painting and sculpting, unleashing the power of artistic expression and camaraderie with fellow artists on a similar quest for connection.", 
            genre="Bard",
            difficulty=9,
            age_restriction=18,
            city="denver",                
        )
        q9 = Quest(
            title = "Guardians of the Library Lore" ,
            description = "Join the Gathering of the Guardians of Library Lore, where you'll converse about ancient scrolls and manuscripts, unveiling the secrets of wisdom and forming bonds with fellow scholars who share your passion for knowledge.", 
            genre="Bard",
            difficulty=3,
            age_restriction=0,
            city="denver",                
        )
        q10 = Quest(
            title = "The Sanctuary of Support" ,
            description = "Embark on a journey to find the elusive Sanctuary of Support, hidden within the heart of Denver. Within its walls, a council of empathetic mentors will guide you, helping you unlock your inner strength and conquer the shadows of social anxiety through meaningful connections.", 
            genre="Bard",
            difficulty=7,
            age_restriction=0,
            city="denver",                
        )
        q11 = Quest(
            title = " The Forest of Historical Echoes" ,
            description = "Trek deep into the enchanted Forest of Historical Echoes, where spirits of the past linger. Engage with the ethereal guide, who will share captivating tales of history. Your courage will grow as you explore the ancient mysteries hidden within this mystical realm.", 
            genre="Warrior",
            difficulty=7,
            age_restriction=18,
            city="denver",                
        )
        q12 = Quest(
            title = "The Hiker's Odyssey" ,
            description = "Begin the Hiker's Odyssey by scaling the majestic peaks surrounding Denver. Conversing with the spirits of the mountains, you'll gain the strength to face the world outside your comfort zone, one step at a time.", 
            genre="Warrior",
            difficulty=5,
            age_restriction=18,
            city="denver",                
        )
        q13 = Quest(
            title = "The Online Guild of Social Alchemists" ,
            description = "Join the Online Guild of Social Alchemists, where you'll gain wisdom and strategies for transforming social anxiety into social mastery. Interact with fellow guild members through online quests and challenges.",
            genre="Warrior",
            difficulty=2,
            age_restriction=18,
            city="denver",                
        )
        q14 = Quest(
            title = "Meetup Guilds of Denver" ,
            description = " Embark on a quest to explore the realm of Meetup Guilds, specializing in unique pursuits. Choose your fellowship from the Guild of Board Gamers, the Guild of Shutterbugs, or the Guild of Bookworms, and set forth on adventures that will strengthen your social skills.",
            genre="Warrior",
            difficulty=5,
            age_restriction=0,
            city="denver",                
        )
        q15 = Quest(
            title = "The Healer's Quest for Inner Harmony" ,
            description = "Embark on the Healer's Quest to seek guidance from the wise counselors of Denver. They hold the secrets to unlocking your inner strength and banishing the shadows of social anxiety. Your journey will take you to their sanctuaries, where you'll gain the knowledge and tools to heal your spirit and find inner harmony.",
            genre="Warrior",
            difficulty=8,
            age_restriction=18,
            city="denver",                
        )

        db.session.add_all([q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15])
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