import React from 'react'

function Result({ result, openPopup }) {
    return (
        <div className="result" onClick={() => openPopup(result.id)}>
            <img src={result.background_image} alt={result.name} />
            <h3>{result.name}</h3>
        </div>
    )
}

export default Result