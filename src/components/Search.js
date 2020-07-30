import React, {useState} from 'react'

export default function Search({ params, onParamChange }) {
    const [query, setQuery] = useState('');
    return (
<div>
<form
  className="form-inline"
  onSubmit={event => {
    event.preventDefault();
    onParamChange({ all: query });
  }}
>
  <input
    type="text"
    className="form-control  mr-2"
    placeholder="Search Units.."
    value={query}
    onChange={event => setQuery(event.target.value)}
  />
  <button className="btn btn-dark cursor-pointer" type="submit">Search</button>
</form>
</div>
    )
}