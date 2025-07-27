import React, { useState } from 'react'
import Search from './components/Search'
import Results from './components/Results'
import axios from 'axios'
import Popup from './components/Popup'
import './index.css'

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
    suggestions: []
  });
  const apiKey = "82a2c4fed8eb4071a0a28008561eae07";
  const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}`;

  const search = (e) => {
    setState(prev => ({
      ...prev,
      suggestions: []
    }));
    if (e.key === "Enter") {

      axios(apiUrl + "&search=" + state.s).then(({ data }) => {
        let results = data.results || [];

        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }

  const handleSearch = async (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s}
    });

    if (s.length >= 1) {
      try {
        const { data } = await axios(apiUrl + "&search=" + s);
        const suggestions = data.results || [];

        setState(prev => ({
          ...prev,
          suggestions
        }));
      } catch (err) {
        console.error("Error fetching suggestions", err);
      }
    } else {
      setState(prev => ({ ...prev, suggestions: [] }));
    }
  };

  const handleSuggestionClick = (name) => {
      setState(prev => ({
      ...prev,
      s: name,
      suggestions: []
    }));

    axios(apiUrl + "&search=" + name).then(({ data }) => {
      const results = data.results || [];

      setState(prev => ({
        ...prev,
        results
      }));
    });
  }

  const openPopup = id => {
    axios(`https://api.rawg.io/api/games/${id}?key=${apiKey}`).then(({ data }) => {
      let result = data;

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Video Game Finder</h1>
        <title>Video Game Database App</title>
      </header>
      <main>
        <Search handleSearch={handleSearch} search={search} 
        suggestions={state.suggestions} onSuggestionClick={handleSuggestionClick}
        searchValue={state.s}/>

        <Results results={state.results} openPopup={openPopup}/>

        {(typeof state.selected.name != "undefined") ? <Popup 
        selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;
