import * as math from 'mathjs';

// 乘法
export function multiply(num1, num2) {
  return math.multiply(math.bignumber(num1),math.bignumber(num2));
}
// 除
export function divide(num1,num2){
  return math.format(math.divide(math.bignumber(num1),math.bignumber(num2)));
}
// 加
export function add(num1,num2){
  return math.format(math.add(math.bignumber(num1),math.bignumber(num2)));
}
// 减
export function subtract(num1,num2){
  return math.format(math.subtract(math.bignumber(num1),math.bignumber(num2)));
}
