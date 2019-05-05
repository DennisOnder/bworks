const validator = require("validator");

module.exports = {
  registration: data => {
    let error = {};
    if (validator.isEmpty(data.firstName)) {
      error.firstNameEmpty = "Your first name is required.";
    }
    if (validator.isEmpty(data.lastName)) {
      error.lastNameEmpty = "Your last name is required.";
    }
    if (validator.isEmpty(data.email)) {
      error.emailEmpty = "An email address is required.";
    }
    if (validator.isEmpty(data.password)) {
      error.passwordEmpty = "A password is required.";
    }
    if (data.password !== data.confirmPassword) {
      error.passwordsNotMatching = "Passwords are not matching.";
    }
    if (!validator.isLength(data.firstName, { min: 3 })) {
      error.firstNameLength =
        "Your first name should be more than 3 characters long.";
    }
    if (!validator.isLength(data.lastName, { min: 3 })) {
      error.lastNameLength =
        "Your last name should be more than 3 characters long.";
    }
    if (!validator.isLength(data.password, { min: 8, max: 32 })) {
      error.passwordLength =
        "Your password should be between 3 and 32 characters long.";
    }
    if (!validator.isEmail(data.email)) {
      error.emailInvalid = "Please provide a valid email address.";
    }
    if (Object.keys(error).length > 0) {
      return error;
    } else {
      return false;
    }
  }
};
