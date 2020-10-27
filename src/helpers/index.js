export const cloneArray = (arr) => {
  return arr.map((val) => [...val]);
};

export const generateRenderData = (data, maxCount) => {
  const clonedData = cloneArray(data);
  return clonedData.map((colors) => {
    while (colors.length < maxCount) colors.push({});
    return colors;
  });
};
