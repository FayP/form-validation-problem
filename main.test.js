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

    describe("is invlaid", function() {
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

    describe("is invlaid", function() {
      it("doesn't accept  strings of less than 8 characters", function() {
        document.getElementById("password").value = "pass";
        var res = formClass.checkPasswordFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("doesn't accept numbers", function() {
        document.getElementById("password").value = 12345;
        var res = formClass.checkPasswordFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("doesn't accept null", function() {
        document.getElementById("password").value = null;
        var res = formClass.checkPasswordFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("doesn't accept undefined", function() {
        document.getElementById("password").value = undefined;
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

    describe("is invlaid", function() {
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
});
