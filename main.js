var formClass = {
  fields: {
    emailId: "email",
    passwordId: "password",
    colorId: "colour",
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
    var passwordField = document.getElementById(this.fields.emailId);
    return this.checkFieldValidity(passwordField);
  },
  checkColourFieldIsValid() {
    var colourField = document.getElementById(this.fields.emailId);
    return this.checkFieldValidity(colourField);
  },
  validateForm: function(event) {
    event.preventDefault();

    // Must be a valid email address
    this.checkEmailFieldIsValid();

    //Password must be at least 8 characters
    checkFieldValidity(passwordField);

    //Colour must be selected.
    checkFieldValidity(colourField);
    //At least two Animals must be chosen.
    var totalChecked = 0;
    animalsFields.forEach(function(animalField) {
      checkFieldValidity(animalField, function(field) {
        if (field.checked) {
          totalChecked++;
        }
        return totalChecked < 2;
      });
    });
    //If Tiger is one of the chosen Animals then Type of tiger is required to be a non - empty string.
    checkFieldValidity(tigerTypeField, function(field) {
      return tigerField.checked && !field.value;
    });

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
