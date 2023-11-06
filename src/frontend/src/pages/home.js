import { useEffect, useState } from "react";

function Home(){
    const [games, setGames] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            const res = await fetch('/api/game_info/'); 
            
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
            <p>Welcome to the barebones beta of the app, 
                it has functionality for backend to talk to frontend so we can all 
                individually work on our project peices.</p>
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