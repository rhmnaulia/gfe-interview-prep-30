/**
 * @param {Object} objectParam
 * @param {string|Array<string>} pathParam
 * @param {*} [defaultValue]
 * @return {*}
 */
export default function get(objectParam, pathParam, defaultValue) {
  // Handle both string and array paths
  const path = Array.isArray(pathParam) ? pathParam : pathParam.split(".");

  let result = objectParam;
  for (const key of path) {
    // Return default if current level is null/undefined
    // Prevents "Cannot read property of null" errors
    if (result == null) return defaultValue;

    // Access next level of nesting
    result = result[key];
  }

  // Return found value or default if undefined
  // Preserves null values while treating undefined as "not found"
  return result !== undefined ? result : defaultValue;
}
