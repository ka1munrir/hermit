


import { React, useEffect, useState } from 'react';
import GuildQuestCard from '../../components/GuildQuestCard/GuildQuestCard'
import './Guilds.css'; // Make sure to adjust the path to your CSS file

function Guilds() {

    const [guildQuests, setGuildQuests] = useState([])
    const [guildFilter, setGuildFilter] = useState("No Cards What So Ever")


    useEffect(() => {
        fetch(`/api/quests`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setGuildQuests(data)
            });
    }, []);
    const questsToDisp = guildQuests.filter(quest => quest.genre.toLowerCase().includes(guildFilter.toLowerCase()))
    const guildsData = [
        {
            name: "Mage",
            description: "The Mage Guild specializes in the arcane arts, casting powerful spells and harnessing the forces of magic.",
            imageUrl: "https://img.freepik.com/premium-photo/halloween-wizard-white-background_308643-602.jpg",
            link: "mage-guild-link",
        },
        {
            name: "Warrior",
            description: "The Warrior Guild is known for its brave and skilled fighters who excel in combat and martial skills.",
            imageUrl: "https://pngimg.com/uploads/viking/viking_PNG43.png",
            link: "warrior-guild-link",
        },
        {
            name: "Bard",
            description: "The Bard Guild is a gathering place for storytellers, musicians, and entertainers who captivate with their talents.",
            imageUrl: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/600001c3-7f2c-4f7e-88ba-50856e624266/ddoza8l-f91034f7-0ad9-4760-93e7-99b66cbaef41.jpg/v1/fit/w_375,h_570,q_70,strp/bard_by_artdeepmind_ddoza8l-375w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTk0NCIsInBhdGgiOiJcL2ZcLzYwMDAwMWMzLTdmMmMtNGY3ZS04OGJhLTUwODU2ZTYyNDI2NlwvZGRvemE4bC1mOTEwMzRmNy0wYWQ5LTQ3NjAtOTNlNy05OWI2NmNiYWVmNDEuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.32NO-znxzFsLrFsYrYjkSoNJ517cCs0JaQ58ac5OpEs",
            link: "bard-guild-link",
        },
    ];
    console.log(guildQuests)
    console.log(questsToDisp)
    return (
        <div className='guilds-display'>
            <h1 className="guilds-title">GUILDS</h1>
            <div className='quest-row' >
                {
                    questsToDisp.map(guildQuest => <GuildQuestCard key={guildQuests['id']} quest={guildQuest} />)
                }
            </div>
            <div className="guilds">
                {guildsData.map((guild) => (
                    <div className="guild" onClick={() => {
                        guildFilter === guild.name ? setGuildFilter(`No Cards What So Ever`) : setGuildFilter(guild.name)

                    }}>
                        <img className={`${guild.name.toLowerCase()}-image`} src={guild.imageUrl} alt={`${guild.name} Guild`} />
                        <h2>{guild.name} Guild</h2>
                        <p>{guild.description}</p>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default Guilds;






