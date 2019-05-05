module.exports = (firstName, lastName) => {
  const randomNumber = `${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
  return `@${firstName.toLowerCase()}-${lastName.toLowerCase()}#${randomNumber}`;
};
