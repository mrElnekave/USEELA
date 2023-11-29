

const SearchResults = ({ results }) => {    
    console.log(results)
    
    const content = <div>{results}</div>   
    // TODO: need to make this a list of links to the game page with 
    // appropriate quiz data
    
    return (
        <main>{content}</main>
    )
}

export default SearchResults