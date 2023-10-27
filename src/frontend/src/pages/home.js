import { useEffect, useState } from "react";

function Home(){
    const [games, setGames] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            const res = await fetch('/api/dummy'); 
            
            if (res.ok) {
                const data = [];
                data.push(
                    await res.json()
                );   
                console.log("data: " + data); 
                console.log("name: " + data.name)
                setGames(data);
            }
            
        }
        fetchGames();
    }, []); // empty array means only run once


    return (
        <div className="home">
            <h1>Home</h1>
            <div className="Games">
                {games && games.map((game) => (
                    <div className="game" key={game._id}>
                        <h2>{game.name}</h2>
                        <p>{game.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;