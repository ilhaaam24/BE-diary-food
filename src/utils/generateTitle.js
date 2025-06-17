export const generateTitle = (text) => {
  return text.split(" ").slice(0, 5).join(" ") + "...";
};
