import React from 'react'

function Search ({ handleSearch, search, suggestions, onSuggestionClick, searchValue }) {
    return (
        <section className="searchbox-wrap">
          <div className="searchbox-container">
            <input 
              type='text' 
              placeholder="Search for a video game..." 
              className="searchbox" 
              onChange={handleSearch}
              onKeyDown={search}
              value={searchValue}
            />
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.slice(0, 5).map(game => (
                        <li key={game.id} onClick={() => onSuggestionClick(game.name)}>
                            {game.name}
                        </li>
                    ))}
                </ul>
            )}
          </div>
        </section>
    )
}

export default Search
