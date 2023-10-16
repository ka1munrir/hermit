"""empty message

Revision ID: 8c6ea24b3214
Revises: 8da3cc258e30
Create Date: 2023-10-16 14:55:03.749331

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8c6ea24b3214'
down_revision = '8da3cc258e30'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('quests_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('description', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('quests_table', schema=None) as batch_op:
        batch_op.drop_column('description')
        batch_op.drop_column('title')

    # ### end Alembic commands ###
