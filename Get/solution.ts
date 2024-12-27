/**
 * Gets nested object value by path with default fallback.
 * @param objectParam - Source object to query
 * @param pathParam - Path to value ('a.b.c' or ['a','b','c'])
 * @param defaultValue - Optional fallback if path not found
 * @returns Found value or defaultValue
 */

interface ObjectType {
  [key: string]: any;
}

export default function get<T = any>(
  objectParam: ObjectType,
  pathParam: string | string[],
  defaultValue?: T,
): T | undefined {
  // Handle both string and array paths
  const path = Array.isArray(pathParam) ? pathParam : pathParam.split(".");

  let result: any = objectParam;
  for (const key of path) {
    // Return default if current level is null/undefined
    // Prevents "Cannot read property of null" errors
    if (result == null) return defaultValue;

    // Access next level of nesting
    result = result[key];
  }

  // Return found value or default if undefined
  // Preserves null values while treating undefined as "not found"
  return result !== undefined ? (result as T) : defaultValue;
}
