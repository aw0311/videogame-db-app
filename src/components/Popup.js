import React from 'react'

function Popup ({ selected, closePopup }) {
    return (
        <section className="popup">
            <div className="content">
                <h2>{ selected.name } <span>({ selected.released })</span></h2>
                <p className="rating">Rating: {selected.rating} 
                    <div>
                        Platforms: {selected.platforms?.map(p => p.platform.name).join(', ')}
                    </div>
                </p>
                <div className="plot">
                    <img src={selected.background_image} alt={selected.name} />
                    <p>{selected.description_raw}</p>
                </div>
                <button className="close" onClick={closePopup}>Close</button>
            </div>
        </section>
    )
}

export default Popup