const validator = require('validator');

// Sample data
const email = "example@gmail.com";
const url = "https://example.com";
const invalidEmail = "invalid-email.com";

// Validate email
console.log(`Is "${email}" a valid email?`, validator.isEmail(email));
console.log(`Is "${invalidEmail}" a valid email?`, validator.isEmail(invalidEmail));

// Validate URL
console.log(`Is "${url}" a valid URL?`, validator.isURL(url));

// Check if a string is empty
const emptyString = "";
console.log(`Is the string empty?`, validator.isEmpty(emptyString));

// Check if a string is an integer
const number = "123";
console.log(`Is "${number}" an integer?`, validator.isInt(number));
