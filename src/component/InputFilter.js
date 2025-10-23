import React from "react";
import { MDBSelect } from "mdb-react-ui-kit";
import { INPUT_TYPES } from "../constants";

/**
 * Input type selector component
 * Allows users to choose search method: city name or postal code
 */
function InputFilter({ inputType, setInputType, onInputTypeChange }) {
  const options = [
    { text: 'City Name', value: INPUT_TYPES.CITY },
    { text: 'Postal Code', value: INPUT_TYPES.ZIP }
  ];

  const handleChange = (value) => {
    setInputType(value);
    if (onInputTypeChange) {
      onInputTypeChange();
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor="inputType" className="form-label">
        Choose search method:
      </label>
      <select
        id="inputType"
        className="form-select"
        value={inputType}
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputFilter;
