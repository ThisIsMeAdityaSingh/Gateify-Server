/**
 * Capitalizes first letter of the word and return it
 * @param {string} word - word to process
 * @return {string} processed word
 * @example
 * ```js
 * capitalizeFirstLetter('lazy') = 'Lazy'
 * ```
 */
const capitalizeFirstLetter = word => {
    if (!word) return '';
  
    const firstLetter = word[0].toUpperCase();
    const rest = word.split('').slice(1).join().replaceAll(',', '');
  
    return `${firstLetter}${rest}` || '';
};
  
  /**
   * Check if object is empty or not
   * @param {object} obj - object to be tested
   * @return {boolean}
   */
const isEmptyObject = obj => {
    if (typeof obj !== 'object') return true;
    if (!Object.keys(obj).length) return true;
  
    return false;
};
  
  /**
   * Creates an object with given keys
   * @param {string[]} keys - array of keys
   * @return {object} object with given keys
   */
const createObjectWithKeys = keys => {
    if (!Array.isArray(keys)) throw new Error('func: createObjectWithKeys need argument of type []');
    if (!keys.length) return {};
  
    const obj = {};
  
    keys.forEach(item => { return { ...obj, [item]: '' }; });
  
    return obj;
};

module.exports = {capitalizeFirstLetter, isEmptyObject, createObjectWithKeys};  