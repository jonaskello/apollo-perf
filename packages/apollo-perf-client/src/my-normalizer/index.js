function normalize(
  data,
  createId = defaultCreateId,
  idToCacheKey = defaultIdToCacheKey
) {
  const entities = {};
  const callbacks = { createId, idToCacheKey };
  const result = normalizeRecursive(data, entities, callbacks);
  return {
    result: result,
    entities: entities
  };
}

function denormalize(
  result,
  entities,
  idToCacheKey = defaultIdToCacheKey,
  isId = defaultIsId,
  shouldDenormalize = defaultShouldDenormalize
) {
  let output;
  const callbacks = { idToCacheKey, isId, shouldDenormalize };
  if (Array.isArray(result)) {
    output = result.map(item => denormalizeValue(item, entities, callbacks));
  } else {
    output = denormalizeValue(result, entities, callbacks);
  }
  return output;
}

// Denormalizes the value if it is an ID, otherwise just returns the value
function denormalizeValue(value, entities, callbacks) {
  const { idToCacheKey, isId, shouldDenormalize } = callbacks;
  // Check if it is an ID
  if (!isId(value, entities)) {
    return value;
  }
  const normalizedObj = entities[idToCacheKey(value)];
  if (normalizedObj) {
    const denormalizedObj = {};
    for (const key of Object.keys(normalizedObj)) {
      const keyObj = normalizedObj[key];
      if (!shouldDenormalize(keyObj, key)) {
        // Skip this!
        denormalizedObj[key] = keyObj;
      } else if (Array.isArray(keyObj)) {
        // This could either be an array of values, or an array of IDs
        denormalizedObj[key] = keyObj.map(item =>
          denormalizeValue(item, entities, callbacks)
        );
      } else {
        denormalizedObj[key] = denormalizeValue(keyObj, entities, callbacks);
      }
    }
    return denormalizedObj;
  } else {
    return value;
  }
}

function normalizeRecursive(obj, cache, callbacks) {
  const { createId, idToCacheKey } = callbacks;
  const objectId = createId(obj);
  cache[idToCacheKey(objectId)] = obj;
  for (const key of Object.keys(obj)) {
    const keyObj = obj[key];
    if (Array.isArray(keyObj)) {
      const arr = keyObj;
      let i = 0;
      while (i < arr.length) {
        const item = arr[i];
        if (isObject(item)) {
          const subObjectId = normalizeRecursive(item, cache, callbacks);
          arr[i] = subObjectId;
          i++;
        } else {
          i++;
        }
      }
    } else if (isObject(keyObj)) {
      const subObjectId = normalizeRecursive(keyObj, cache, callbacks);
      obj[key] = subObjectId;
    }
  }
  return objectId;
}

// Create an ID that can be used for normalized cahce
// Can for example create an object of a special class
// and then in idToString() check if it is an instance of that class
function defaultCreateId(obj) {
  return obj.id;
}

// Returns a string representation of the ID that can be used as a cache key
// in a plain JS object
function defaultIdToCacheKey(id) {
  return id;
}

// Deterimies if a key on an object should be denormalized or not
function defaultShouldDenormalize(obj, key) {
  // Since we use strings for ID we need to take care not to denormalize the ID field
  return key !== "id";
}

// If value is a ID then return true
function defaultIsId(value, entities) {
  if (typeof value === "string") {
    // If we find a object in the cache let's assume it is an ID
    if (entities[value]) {
      return true;
    }
  }
  return false;
}

function isObject(o) {
  return o instanceof Object && o.constructor === Object;
}

module.exports = {
  normalize,
  denormalize
};
