import { useEffect, useState } from "react";

function Dummy(){
    
    const [number, setNumber] = useState(null);

    return (
        <div>
            <div>
                <h1>{number}</h1>
            </div>
            <button onClick={() => setNumber(number + 1)}>Increment</button>
        </div>
    );
};

export default Dummy;