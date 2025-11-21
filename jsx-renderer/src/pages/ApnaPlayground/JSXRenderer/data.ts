const JSXData = [
  "<div>I love my India</div>",
  "<div style={{ color: 'red', fontWeight: 'bold' }}>Hello JSX!</div>",
];

const totalDataLength = JSXData.length;

// Calculate next and previous indices
const calculateNextPrevIndices = (index = 0) => {
  if (index < 0) return { next: -1, prev: -1 };
  //   const totalDataLength = JSXData.length;
  return {
    next: (index + 1 + totalDataLength) % totalDataLength,
    prev: (index - 1 + totalDataLength) % totalDataLength,
  };
};

const getDataForSelectedIndex = (index = 0) => {
  const selectedIndex = JSXData.findIndex((_, idx) => idx === index);
  const data = JSXData[selectedIndex] || "";
  const nextPrev = calculateNextPrevIndices(selectedIndex);
  return {
    selectedIndex,
    data,
    ...nextPrev,
  };
};

export default JSXData;
export { totalDataLength, getDataForSelectedIndex };
