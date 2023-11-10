import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <div className='Nav'>
            <Link to="/">
                <h1>Quiz</h1>
            </Link>
            <Link to="/dummy">
                <h1>Dummy</h1>
            </Link>
        </div> 
    );
}

