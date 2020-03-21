
const ethValue = 100; 
const depositETH = 2;
const debtInDAI = 100; 
const liquidationRatio = 1.50;
const penalty = 0.13;

const depositInDAI = depositETH * ethValue; 
let liquidationPrice = liquidationRatio * debtInDAI / depositETH ; 
const collateralRatio = (depositInDAI / debtInDAI) * 100;
const depositValue = liquidationPrice * depositETH;
const DAILeft = depositValue - (debtInDAI * (1 + penalty));
const ETHLeft = DAILeft / liquidationPrice;
const ETHBought = debtInDAI / liquidationPrice;
const netInETH = ETHBought + ETHLeft;

console.log("collateralRatio ", collateralRatio, "%");
console.log("liquidation price ", liquidationPrice, "$");
console.log(ETHLeft, "ETH");
console.log(netInETH, "ETH");

