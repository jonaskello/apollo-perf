export function inc() {
  return { type: "inc" };
}

export function dec() {
  return { type: "dec" };
}

export function mergeEntities(entities) {
  return { type: "merge-entities", payload: { entities } };
}

export function mutate() {
  return { type: "mutate" };
}
