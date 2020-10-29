const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateContactInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.message = !isEmpty(data.message) ? data.message : "";

  //Name validation
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required!";
  }

  //Email validation
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required!";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid!";
  }

  //Message validation
  if (Validator.isEmpty(data.message)) {
    errors.message = "Message field is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
