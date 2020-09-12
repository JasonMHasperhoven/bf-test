/**
 * Changes the text case to camel case.
 *
 * @param {String} str
 * @returns {String}
 * @example
 * toCamelCase('hello world')
 * // returns 'helloWorld'
 */
function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/^([A-Z])|[\s-_]+(\w)/g, (_, p1, p2) =>
      p2 ? p2.toUpperCase() : p1.toLowerCase()
    );
}
/**
 * Changes the keys of an object to camel case.
 *
 * @param {Object} object
 * @returns {Object}
 * @example
 *  camelcaseKeys({"my test":"hello world"})
 * // { myTest: 'hello world' }
 */
export default function camelcaseKeys(object) {
  if (!object || object !== Object(object)) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map((value) => camelcaseKeys(value));
  }

  return Object.entries(object).reduce(
    (nextObject, [key, value]) => ({
      ...nextObject,
      [toCamelCase(key)]:
        value === Object(value) ? camelcaseKeys(value) : value,
    }),
    {}
  );
}
