// Define the type for our custom filter method
interface Array<T> {
  myFilter(
    predicate: (value: T, index: number, array: Array<T>) => boolean,
    thisArg?: any,
  ): Array<T>;
}

/**
 * Custom implementation of Array.filter() method
 * @param predicate - Function to test each element of the array
 * @param thisArg - Optional object to use as 'this' when executing predicate
 * @returns A new array with elements that pass the predicate test
 */
Array.prototype.myFilter = function <T>(
  predicate: (value: T, index: number, array: T[]) => boolean,
  thisArg?: any,
): T[] {
  // Initialize array to store filtered elements
  const filteredArray: T[] = [];

  // Get the length once to optimize loop
  const length = this.length;

  // Iterate through each element in the array
  for (let index = 0; index < length; index++) {
    const currentValue = this[index];

    // Check if:
    // 1. The index actually exists on the array (handles sparse arrays)
    // 2. The predicate returns true for this element
    const shouldInclude =
      Object.hasOwn(this, index) &&
      predicate.call(thisArg, currentValue, index, this);

    if (shouldInclude) {
      filteredArray.push(currentValue);
    }
  }

  return filteredArray;
};
