// using default and named exports
import myLocation, {
  message,
  name,
  getGreeting
} from "./myModule";
import add, {
  subtract
} from './math';

console.log(myLocation)
console.log(getGreeting("Jessica"))
console.log(message, name);
console.log(add(9, 7));
console.log(subtract(6, 9));