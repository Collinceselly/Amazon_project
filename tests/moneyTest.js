import { formatCurrency } from "../scripts/utils/money.js";

console.log('Test suite: Formatcurrency');

console.log('Converts cents to dollars');

if (formatCurrency(2095) === '20.95') {
    console.log('Passed')
}
else {
    console.log('Failed')
}


console.log('Works with 0')

if (formatCurrency(0) === '0.00') {
    console.log('Passed')
}
else{
    console.log('Failed')
}


console.log('Rounds up to the nearest cents')

if (formatCurrency(200.5) === '2.01') {
    console.log('Passed')
} else {
    console.log('Failed')
}


if (formatCurrency(200.4) === '2.00') {
    console.log('Passed')
}
else{
    console.log('Failed')
}