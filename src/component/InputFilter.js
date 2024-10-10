import React from "react";
// This component is to recognize which type of input user want to do,
//since zip code is not unique id, one zip code may present two different place.
function InputFilter({ inputType, setInputType, setCityOrZip, setError }) {
  return (
    <div className="filter">
      <label htmlFor="inputType">Choose input type: </label>
      <select
        id="inputType"
        value={inputType}
        onChange={(e) => {
          setInputType(e.target.value);
          setCityOrZip("");
          setError("");
        }}
      >
        <option value="city">City Name</option>
        <option value="zip">Zip Code</option>
      </select>
    </div>
  );
}

export default InputFilter;
