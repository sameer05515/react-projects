const generateTypeFromJson = (
  json: Record<string, any>,
  typeName: string = "GeneratedType"
): string => {
  let typeDef = `interface ${typeName} {\n`;

  function inferType(value: any): string {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        return `${inferType(value[0])}[]`;
      } else {
        return `any[]`; // If the array is empty, default to `any[]`
      }
    } else if (value === null) {
      return "null";
    } else if (typeof value === "object") {
      return generateTypeFromJson(value);
    } else {
      return typeof value;
    }
  }

  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const value = json[key];
      typeDef += `  ${key}: ${inferType(value)};\n`;
    }
  }

  typeDef += `}`;

  return typeDef;
};

export const tellTheType=(value:any):string=>{
  let gussedType='Type name complicated: Ask to ChatGPT!';
  if (Array.isArray(value)) {
    if (value.length > 0) {
      return `${tellTheType(value[0])}[]`;
    } else {
      return `any[]`; // If the array is empty, default to `any[]`
    }
  } else if (value === null) {
    return "null";
  } else if (typeof value === "object") {
    // return generateTypeFromJson(value);
    return 'object';
  } else {
    return typeof value;
  }
  return gussedType;
}
