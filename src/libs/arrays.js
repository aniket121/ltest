export const dedupeByKey = (array, key) =>
  array.filter((item, index, self) => 
  self.findIndex(t => t[key] === item[key]) === index);