const { visit, Kind } = require("graphql");
const idKey = "id";
const hasIdField = hasField(idKey);
const hasTypeNameField = hasField("__typename");

const idField = createField(idKey);
const typeNameField = createField("__typename");

export function addRequiredFields(query) {
  return visit(query, {
    SelectionSet(node, key, parent, path) {
      if (parent.kind === Kind.OPERATION_DEFINITION) return;

      !hasIdField(node.selections) && node.selections.unshift(idField);
      !hasTypeNameField(node.selections) &&
        node.selections.unshift(typeNameField);

      return node;
    }
  });
}

function hasField(name) {
  return set => set.some(({ name: { value } }) => value === name);
}

function createField(name) {
  return {
    kind: "Field",
    alias: undefined,
    name: {
      kind: "Name",
      value: name
    },
    arguments: [],
    directives: [],
    selectionSet: undefined
  };
}
