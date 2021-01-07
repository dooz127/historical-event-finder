import React from 'react';
import Event from './Event.jsx';

const SearchResults = ({results}) => (
  <div>
    {results.map((result, idx) => (
      <Event key={idx} date={result.date} description={result.description} />
    ))}
  </div>
);

export default SearchResults;
