import React from 'react';
import Event from './Event.jsx';

const SearchResults = ({results}) => (
  <dl className="row m-3">
    {results.map((event, idx) => (
      <Event key={idx} date={event.date} description={event.description} />
    ))}
  </dl>
);

export default SearchResults;
