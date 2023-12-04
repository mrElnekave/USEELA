

const SearchResults = ({ results }) => {    
    console.log(results)
    
    const content = <div>{results}</div>   
    
    return (
        <main>{content}</main>
    )
}

export default SearchResults