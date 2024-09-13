const input1 = `
Root
 Child 1
  Grandchild 1
   Grandchild 2
 Child 2
  Grandchild 3
`;

const seperator = "\n\n--------------\n";

const getStringifiedObject = (data, beautify = false) =>
  JSON.stringify(data, null, beautify ? 2 : 0);

const getLinesAndIndentationLevel = (input) =>
  (input?.trim().split("\n") || []).map((line) => ({
    name: line.trim(),
    level: line.search(/\S/),
  }));

/**
* Extracts distinct levels from flattened tree data.
* @param {Array} data - The flattened tree data.
* @returns {Array} - An array of distinct levels.
*/
const getDistinctLevels = (data) => {
  return [...new Set(data.map((item) => item.level))];
};


module.exports = {
    input1, seperator, getStringifiedObject, getLinesAndIndentationLevel, getDistinctLevels
}

