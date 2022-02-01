module.exports = function check(str, bracketsConfig_orig) {
  // create the stack:
  let stack = [];
  // make a copy of variable for not to changing this variable:
  let bracketsConfig = JSON.parse(JSON.stringify(bracketsConfig_orig));
  // reverse config to generate pairs:
  let reverseConfig = bracketsConfig.map((item) => {
    return item.reverse();
  });
  // lets convert braketsConfig to object:
  let objConfig = {};
  reverseConfig.forEach(function (element) {
    objConfig[element[0]] = element[1];
  });
  console.log(objConfig);
  // lets get object values and keys from objConfig to compare
  let objectKeys = [];
  for (let key in objConfig) {
    objectKeys.push(key);
  }
  let openBrackets = [];
  for (var i in objConfig) {
    if (objConfig.hasOwnProperty(i)) {
      openBrackets.push(objConfig[i]);
    }
  }
  console.log(openBrackets);
  // lets check if every part of string have the pair
  for (let i = 0; i < str.length; i++) {
    let currentSymbol = str[i];

    if (stack[stack.length - 1] === currentSymbol && objectKeys.includes(stack[stack.length - 1])) {
      stack.pop();
    } else if (openBrackets.includes(currentSymbol)) {
      stack.push(currentSymbol);
    } else {
      if (stack.length === 0) {
        return false;
      }

      let topElement = stack[stack.length - 1];

      if (objConfig[currentSymbol] === topElement) {
        stack.pop();
      } else {
        return false;
      }
    }
    console.log(stack);
  }
  return stack.length === 0;
}