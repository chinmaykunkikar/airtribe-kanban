export function getCurrentDate() {
  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("default", options).format(currentDate);
}

import tailwindColors from "tailwindcss/colors";
const grays = [
  "lightBlue",
  "zinc",
  "neutral",
  "trueGray",
  "slate",
  "blueGray",
  "gray",
  "coolGray",
  "stone",
  "warmGray",
];

const filteredColors = Object.keys(tailwindColors)
  .filter((category) => !grays.includes(category))
  .reduce((acc, category) => {
    acc[category] = tailwindColors[category];
    return acc;
  }, {});

export const twColors = Object.keys(filteredColors).reduce((acc, category) => {
  const shades = filteredColors[category];
  if (shades["200"]) {
    acc.push(shades["200"]);
  }
  return acc;
}, []);
