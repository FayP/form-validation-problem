const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
const formClass = require("./main");

jest.dontMock("fs");

describe("formClass", function() {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    // restore the original func after test
    jest.resetModules();
  });

  describe("email field", function() {
    it("is valid with a correct email address", function() {
      document.getElementById("email").value = "test@mail.com";
      var res = formClass.checkEmailFieldIsValid();

      expect(res).toBeTruthy();
    });

    it("does not have the error class to the parent element when valid", function() {
      var emailField = document.getElementById("email");
      emailField.value = "test@mail.com";
      formClass.checkEmailFieldIsValid();

      expect(emailField.parentElement.classList).not.toContain("error");
    });

    describe("is invalid", function() {
      it("doesn't accept non email formatted strings", function() {
        document.getElementById("email").value = "not_an_email";
        var res = formClass.checkEmailFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("doesn't accept numbers", function() {
        document.getElementById("email").value = "12345";
        var res = formClass.checkEmailFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("doesn't accept null", function() {
        document.getElementById("email").value = null;
        var res = formClass.checkEmailFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("doesn't accept undefined", function() {
        document.getElementById("email").value = undefined;
        var res = formClass.checkEmailFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("adds the error class to the parent element when invalid", function() {
        var emailField = document.getElementById("email");
        emailField.value = undefined;
        formClass.checkEmailFieldIsValid();

        expect(emailField.parentElement.classList).toContain("error");
      });
    });
  });

  describe("password field", function() {
    it("is valid with a password of 8 characters", function() {
      document.getElementById("password").value = "password";
      var res = formClass.checkPasswordFieldIsValid();

      expect(res).toBeTruthy();
    });

    it("is valid with a password of over 8 characters", function() {
      document.getElementById("password").value = "biggerpassword";
      var res = formClass.checkPasswordFieldIsValid();

      expect(res).toBeTruthy();
    });

    it("does not have the error class to the parent element when valid", function() {
      var passwordField = document.getElementById("password");
      passwordField.value = undefined;
      formClass.checkPasswordFieldIsValid();

      expect(passwordField.parentElement.classList).not.toContain("error");
    });

    describe("is invalid", function() {
      // Skipped as vliaidity state is blank during test.
      it.skip("doesn't accept strings of less than 8 characters", function() {
        document.getElementById("password").value = "pass";
        var res = formClass.checkPasswordFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("doesn't accept null", function() {
        document.getElementById("password").value = null;
        var res = formClass.checkPasswordFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("adds the error class to the parent element when invalid", function() {
        var passwordField = document.getElementById("password");
        passwordField.value = null;
        formClass.checkPasswordFieldIsValid();

        expect(passwordField.parentElement.classList).toContain("error");
      });
    });
  });

  describe("color field", function() {
    it("is valid when element has a value ", function() {
      document.getElementById("colour").value = "blue";
      var res = formClass.checkColourFieldIsValid();

      expect(res).toBeTruthy();
    });

    it("does not have the error class to the parent element when valid", function() {
      var colourField = document.getElementById("colour");
      colourField.value = "blue";
      formClass.checkColourFieldIsValid();

      expect(colourField.parentElement.classList).not.toContain("error");
    });

    describe("is invalid", function() {
      it("doesn't accept null", function() {
        document.getElementById("colour").value = null;
        var res = formClass.checkColourFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("doesn't accept undefined", function() {
        document.getElementById("colour").value = undefined;
        var res = formClass.checkColourFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("adds the error class to the parent element when invalid", function() {
        var colourField = document.getElementById("colour");
        colourField.value = null;
        formClass.checkColourFieldIsValid();

        expect(colourField.parentElement.classList).toContain("error");
      });
    });
  });

  describe("animals field", function() {
    it("allows 2 selections", function() {
      var animalsFields = document.getElementsByName("animal");
      animalsFields[0].checked = true;
      animalsFields[1].checked = true;

      expect(formClass.checkAnimalsFieldIsValid()).toBeTruthy();
    });

    it("allows more than 2 selections", function() {
      var animalsFields = document.getElementsByName("animal");
      animalsFields[0].checked = true;
      animalsFields[1].checked = true;
      animalsFields[2].checked = true;

      expect(formClass.checkAnimalsFieldIsValid()).toBeTruthy();
    });

    it("does not have the error class to the parent element when valid", function() {
      var animalsFields = document.getElementsByName("animal");
      animalsFields[0].checked = true;
      animalsFields[1].checked = true;
      formClass.checkAnimalsFieldIsValid();

      expect(animalsFields[0].parentElement.classList).not.toContain("error");
    });

    describe("is invalid", function() {
      it("does accept less than two options selected", function() {
        expect(formClass.checkAnimalsFieldIsValid()).toBeFalsy();
      });
      it("adds the error class when the field is invalid", function() {
        var animalsFields = document.getElementsByName("animal");
        formClass.checkAnimalsFieldIsValid();

        expect(animalsFields[0].parentElement.classList).toContain("error");
      });
    });
  });

  describe("tiger type field", function() {
    it("should have a value if tiger is checked", function() {
      var tigerField = document.getElementById(formClass.fields.tigerId);
      var tigerTypeField = document.getElementById(
        formClass.fields.tigerTypeId
      );
      tigerTypeField.value = "Bengal";
      tigerField.checked = true;

      expect(formClass.checkTigerTypeFieldIsValid()).toBeTruthy();
    });
    it("can be empty of the tiger field is not checked", function() {
      expect(formClass.checkTigerTypeFieldIsValid()).toBeTruthy();
    });

    it("should not have the error class when the field is valid", function() {
      var tigerTypeField = document.getElementById(
        formClass.fields.tigerTypeId
      );
      formClass.checkTigerTypeFieldIsValid();

      expect(tigerTypeField.parentElement.classList).not.toContain("error");
    });

    describe("is invalid", function() {
      it("cannot be empty when tiger is checked", function() {
        var tigerField = document.getElementById(formClass.fields.tigerId);
        var tigerTypeField = document.getElementById(
          formClass.fields.tigerTypeId
        );
        tigerField.checked = true;
        expect(formClass.checkTigerTypeFieldIsValid()).toBeFalsy();
      });

      it("adds the error class when the field is invalid", function() {
        var tigerField = document.getElementById(formClass.fields.tigerId);
        var tigerTypeField = document.getElementById(
          formClass.fields.tigerTypeId
        );
        tigerField.checked = true;
        formClass.checkTigerTypeFieldIsValid();

        expect(tigerTypeField.parentElement.classList).toContain("error");
      });
    });
  });
});
