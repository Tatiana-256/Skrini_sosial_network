export const updateObjectInArray = (
  items,
  itemId,
  objPropertyName,
  newObjectProps
) => {
  return items.map(u => {
    if (u[objPropertyName] === itemId) {
      return { ...u, ...newObjectProps };
    }
    return u;
  });
};
