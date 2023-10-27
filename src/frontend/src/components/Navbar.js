import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <div className='Nav'>
            <Link to="/">
                <h1>Quiz</h1>
            </Link>
        </div>
        
    );
}

