// Private method to generate type for objects, not exposed directly
const generateTypeFromJson = (
  json: Record<string, any>,
  typeName: string = "GeneratedType"
): { typeName: string; typesList: string[] } => {
  let typeDef = `interface ${typeName} {\n`;
  let typesList: string[] = [];

  function inferType(value: any, key: string): string {
    const detectedType = tellTheType(value);

    if (detectedType.typeName === "object") {
      const nestedTypeName = `${typeName}_${key.charAt(0).toUpperCase() + key.slice(1)}`;
      const nestedTypeResult = generateTypeFromJson(value, nestedTypeName);
      typesList.push(nestedTypeResult.typeName); // Add the nested type to the list
      typesList = typesList.concat(nestedTypeResult.typesList); // Add nested types recursively
      return nestedTypeName;
    } else if (detectedType.typeName.includes("[]")) {
      const arrayType = tellTheType(value[0]).typeName === "object"
        ? `${typeName}_${key.charAt(0).toUpperCase() + key.slice(1)}`
        : tellTheType(value[0]).typeName;

      if (tellTheType(value[0]).typeName === "object") {
        const arrayTypeResult = generateTypeFromJson(value[0], arrayType);
        typesList.push(arrayTypeResult.typeName);
        typesList = typesList.concat(arrayTypeResult.typesList);
      }

      return `${arrayType}[]`;
    } else {
      return detectedType.typeName;
    }
  }

  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const value = json[key];
      typeDef += `  ${key}: ${inferType(value, key)};\n`;
    }
  }

  typeDef += `}\n`;

  // Add the current type definition to the list
  typesList.push(typeDef);

  return { typeName, typesList };
};

// Public method to infer the type based on input, exposed directly
export const tellTheType = (value: any): { typeName: string; typesList: string[] } => {
  if (Array.isArray(value)) {
    if (value.length > 0) {
      const elementType = tellTheType(value[0]);
      return {
        typeName: `${elementType.typeName}[]`,
        typesList: elementType.typesList,
      };
    } else {
      return { typeName: `any[]`, typesList: [] }; // If the array is empty, return any[]
    }
  } else if (value === null) {
    return { typeName: "null", typesList: [] };
  } else if (typeof value === "object") {
    // When the type is an object, call generateTypeFromJson to handle it
    return generateTypeFromJson(value, "RootType"); // Use "RootType" as the default type name
  } else {
    return { typeName: typeof value, typesList: [] };
  }
};

// Example of how to invoke the functions
const sampleJson = {
  id: 1,
  name: "Sample",
  tags: ["typescript", "json"],
  metadata: {
    createdBy: "Admin",
    createdAt: "2024-01-01"
  },
  isActive: true
};

const result = tellTheType(sampleJson);
console.log(JSON.stringify(result, null, 2));
