// named export - you can have as many as needed
// default export - you can only have one

const message = "Some message from myModule.js";
const name = "Arya";
const location = "Lagos";
const getGreeting = (name) => {
  return `welcome to the course ${name}`
}

export {
  message,
  name,
  getGreeting,
  location as default
}