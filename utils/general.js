export const checkForNumber = (data) => !isNaN(+data);
export const checkForString = (data) => typeof data === "string";
export const decimalPlaceSeparatorToComma = (data) => data.includes(",") ? data.replace(",",".") : data;

export const convertUnderscoreToSpace = (array) => {
  return array.map(item => {
    if(item === "_id") return item;
    if (typeof item === "string") {
      return item.replace(/_/g, ' '); // Remove the extra closing parenthesis
    }
    else return item;
  });
}