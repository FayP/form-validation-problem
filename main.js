var formClass = {
  fields: {
    emailId: "email",
    passwordId: "password",
    colourId: "colour",
    animalsId: "animals",
    tigerId: "tiger",
    tigerTypeId: "tiger_type"
  },

  setFieldAsInvalid: function(field) {
    field.parentElement.classList.add("error");
    // field.setCustomValidity(field.title);
    return false;
  },

  removeFieldInvalidity: function(field) {
    field.parentElement.classList.remove("error");
    return true;
  },
  checkFieldValidity: function(field, callback) {
    if (
      !field.checkValidity() ||
      !field.value ||
      (!!callback && callback(field))
    ) {
      return this.setFieldAsInvalid(field);
    }

    return this.removeFieldInvalidity(field);
  },
  checkEmailFieldIsValid() {
    var emailField = document.getElementById(this.fields.emailId);
    return this.checkFieldValidity(emailField);
  },
  checkPasswordFieldIsValid() {
    var passwordField = document.getElementById(this.fields.passwordId);
    return this.checkFieldValidity(passwordField);
  },
  checkColourFieldIsValid() {
    var colourField = document.getElementById(this.fields.colourId);
    return this.checkFieldValidity(colourField);
  },
  checkAnimalsFieldIsValid() {
    var totalChecked = 0;
    var animalsFields = document.getElementById(this.fields.animalsId);
    animalsFields.forEach(function(animalField) {
      checkFieldValidity(animalField, function(field) {
        if (field.checked) {
          totalChecked++;
        }
        return totalChecked < 2;
      });
    });
  },
  checkTigerTypeFieldIsValid() {
    var tigerField = document.getElementById(this.fields.tigerId);
    var tigerTypeField = document.getElementById(this.fields.tigerTypeId);
    checkFieldValidity(tigerTypeField, function(field) {
      return tigerField.checked && !field.value;
    });
  },
  validateForm: function(event) {
    event.preventDefault();

    // Must be a valid email address
    this.checkEmailFieldIsValid();

    //Password must be at least 8 characters
    this.checkPasswordFieldIsValid();

    //Colour must be selected.
    this.checkColourFieldIsValid();
    //At least two Animals must be chosen.
    this.checkAnimalsFieldIsValid();
    //If Tiger is one of the chosen Animals then Type of tiger is required to be a non - empty string.
    this.checkTigerTypeFieldIsValid();

    return false;
  }
};

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = formClass;
} else {
  document
    .getElementById("awesomeForm")
    .addEventListener("submit", formClass.validateForm);
}
