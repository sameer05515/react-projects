import React from 'react';

function Results({data = [], errorMessage = '', noResults = false}) {
  return (
    <div>
      { errorMessage && <div> {errorMessage} </div> }
      { noResults && <div> No results for this search </div> }
      <div className="grid">
        { data.map(({title:name, id: uri}) =>
        <div key={uri} className="card grid-child">
          {/* <img src={'https://fa-search-backend.herokuapp.com/' + uri} className="card-img-top" alt={name} /> */}
          <p className="card-text">{`${uri} : ${name}`}</p>
        </div>
        )}
      </div>
    </div>
  );
}

export default Results;
