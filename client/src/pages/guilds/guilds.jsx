import React from 'react';


function Guild({ name, description }) {
    return (
        <div className="guild">
            <h2>{name} Guild</h2>
            <p>{description}</p>
        </div>
    );
}


function Guilds() {
    return (
        <div className="guilds">
            <Guild
                name="Mage"
                description="The Mage Guild specializes in the arcane arts, casting powerful spells and harnessing the forces of magic."
            />
            <Guild
                name="Warrior"
                description="The Warrior Guild is known for its brave and skilled fighters who excel in combat and martial skills."
            />
            <Guild
                name="Bard"
                description="The Bard Guild is a gathering place for storytellers, musicians, and entertainers who captivate with their talents."
            />
        </div>
    );
}

export default Guilds;
