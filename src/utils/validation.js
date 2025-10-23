/**
 * Validate city name input
 * @param {string} city - City name
 * @returns {string} Error message, returns empty string if validation passes
 */
export const validateCityInput = (city) => {
  if (!city.trim()) {
    return 'Please enter city name';
  }
  
  // Allow letters, spaces, hyphens and apostrophes
  if (!/^[a-zA-Z\s\-']+$/.test(city)) {
    return 'City name can only contain letters, spaces, hyphens and apostrophes';
  }
  
  return '';
};

/**
 * Validate postal code input
 * @param {string} zip - Postal code
 * @returns {string} Error message, returns empty string if validation passes
 */
export const validateZipInput = (zip) => {
  if (!zip.trim()) {
    return 'Please enter postal code';
  }
  
  // Postal codes can contain letters and numbers
  if (!/^[a-zA-Z0-9\s\-]+$/.test(zip)) {
    return 'Invalid postal code format';
  }
  
  return '';
};