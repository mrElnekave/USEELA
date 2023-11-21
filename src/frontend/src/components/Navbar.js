import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <div className='Nav'>
            {/*<Link to="/">
                <h1>Quiz</h1>
    </Link>*/}
            {/*<Link to="/dummy">
                <h1>Dummy</h1>
    </Link>*/}
            <Link to="/ImageUpload">
                <h1>Upload</h1>
            </Link>
            <ul className='menu'>
                <li>
                    <Link to="/"><h1>nothing</h1></Link>
                </li>
                <li>
                    <Link to="/home"><h1>Home</h1></Link>
                </li>
                <li>
                    <Link to="/map"><h1>Map</h1></Link>
                </li>
                <li>
                    <Link to="/game"><h1>Game</h1></Link>
                </li>
                <li>
                    <Link to="/dummy"><h1>Dummy</h1></Link>
                </li>
                <li>
                    <Link to="/lobby"><h1>Lobby</h1></Link>
                </li>
            </ul>
        </div>
    );
}


