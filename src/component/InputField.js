import React, { useState } from "react";

function InputField({ inputType, value, setValue, setError, fetchWeather }) {
  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    if (inputType === "city") {
      if (/[^a-zA-Z\s]/.test(inputValue)) {
        setError("city not found");
      } else {
        setError("");
      }
    }

    setValue(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="input-field">
      <input
        type="text"
        placeholder={
          inputType === "city" ? "Enter city name" : "Enter zip code"
        }
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default InputField;
