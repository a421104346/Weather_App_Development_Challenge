import React, { useState, useEffect } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { INPUT_TYPES } from "../constants";
import { validateCityInput, validateZipInput } from "../utils/validation";

/**
 * Input field component
 * Handles user input and provides real-time validation
 */
function InputField({ inputType, value, onChange, onSubmit, disabled }) {
  const [error, setError] = useState("");

  // Clear error when input type changes
  useEffect(() => {
    setError("");
  }, [inputType]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    
    // Real-time validation
    let validationError = "";
    if (inputValue.trim()) {
      if (inputType === INPUT_TYPES.CITY) {
        validationError = validateCityInput(inputValue);
      } else {
        validationError = validateZipInput(inputValue);
      }
    }
    
    setError(validationError);
    onChange(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !error && value.trim()) {
      onSubmit();
    }
  };

  const placeholder = inputType === INPUT_TYPES.CITY 
    ? "Please enter city name (e.g., Beijing)" 
    : "Please enter postal code";

  return (
    <div className="mb-3">
      <MDBInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={error ? "is-invalid" : ""}
        label={inputType === INPUT_TYPES.CITY ? "City Name" : "Postal Code"}
      />
      {error && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
}

export default InputField;
