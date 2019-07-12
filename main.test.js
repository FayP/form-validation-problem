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
    describe("is invlaid", function() {
      it("doesn't accept non email formatted strings", function() {
        document.getElementById("email").value = "not_an_email";
        var res = formClass.checkEmailFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("doesn't accept numbers", function() {
        document.getElementById("email").innerHTML = "12345";
        var res = formClass.checkEmailFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("doesn't accept null", function() {
        document.getElementById("email").innerHTML = null;
        var res = formClass.checkEmailFieldIsValid();

        expect(res).toBeFalsy();
      });
      it("doesn't accept undefined", function() {
        document.getElementById("email").innerHTML = undefined;
        var res = formClass.checkEmailFieldIsValid();

        expect(res).toBeFalsy();
      });
    });
  });
});
