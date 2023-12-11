// eslint-disable-next-line @typescript-eslint/no-explicit-any
function verifyExtraFields(bodyObject: any, schema: any) {
  const schemaKeys = Object.keys(schema.shape);
  const bodyKeys = Object.keys(bodyObject);

  const extraFields = bodyKeys.filter((key) => !schemaKeys.includes(key));

  return extraFields;
}

export { verifyExtraFields };
