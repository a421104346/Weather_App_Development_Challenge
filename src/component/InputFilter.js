import React from "react";

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
