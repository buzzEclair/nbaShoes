import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Search = ({style}) => {

  const history = useHistory();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.currentTarget.value);
    if(event.currentTarget.value === ""){

      history.replace("/");
    }else{
      history.replace("/Search/" + event.currentTarget.value);

    }
  }


  return ( <>
     <input id="navbar-search-input" onChange={handleChange} value={inputValue} type="text" style={style} />
  </> );
}
 
export default Search;