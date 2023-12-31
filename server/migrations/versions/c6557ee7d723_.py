"""empty message

Revision ID: c6557ee7d723
Revises: 
Create Date: 2023-10-16 11:57:37.144562

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c6557ee7d723'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('quests_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('genre', sa.String(), nullable=True),
    sa.Column('difficulty', sa.Integer(), nullable=True),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('age_restriction', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('phone_number', sa.Integer(), nullable=True),
    sa.Column('first_name', sa.String(), nullable=True),
    sa.Column('last_name', sa.String(), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('city', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('progress_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('quest_id', sa.Integer(), nullable=True),
    sa.Column('last_given', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['quest_id'], ['quests_table.id'], name=op.f('fk_progress_table_quest_id_quests_table')),
    sa.ForeignKeyConstraint(['user_id'], ['users_table.id'], name=op.f('fk_progress_table_user_id_users_table')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('quest_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('difficulty_rating', sa.Integer(), nullable=True),
    sa.Column('goodness_rating', sa.Integer(), nullable=True),
    sa.Column('feedback', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['quest_id'], ['quests_table.id'], name=op.f('fk_reviews_table_quest_id_quests_table')),
    sa.ForeignKeyConstraint(['user_id'], ['users_table.id'], name=op.f('fk_reviews_table_user_id_users_table')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews_table')
    op.drop_table('progress_table')
    op.drop_table('users_table')
    op.drop_table('quests_table')
    # ### end Alembic commands ###
