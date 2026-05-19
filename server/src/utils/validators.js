/**
 * Utility functions
 */

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate required fields
 */
export const validateRequiredFields = (obj, fields) => {
  for (const field of fields) {
    if (!obj[field]) {
      return {
        valid: false,
        message: `${field} is required`,
      };
    }
  }
  return { valid: true };
};
