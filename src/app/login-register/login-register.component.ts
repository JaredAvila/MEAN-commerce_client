import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.scss"]
})
export class LoginRegisterComponent implements OnInit {
  constructor(private http: HttpService) {}

  regForm: Boolean = true;
  errors: Array<Object> = [];
  errorMessage: any;
  // User
  userRegister: Object = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: ""
  };
  regPasswordError: Boolean = false;
  regPasswordErrorMsg: String = "";
  regEmailError: Boolean = false;
  regEmailErrorMsg: String = "";
  regFirstNameError: Boolean = false;
  regFirstNameErrorMsg: String = "";
  regLastNameError: Boolean = false;
  regLastNameErrorMsg: String = "";
  userLogin: Object = {
    email: "",
    password: ""
  };
  ngOnInit() {}

  onRegister() {
    this.regPasswordErrorMsg = "";
    this.regEmailErrorMsg = "";
    this.regFirstNameErrorMsg = "";
    this.regLastNameErrorMsg = "";
    this.regPasswordError = false;
    this.regEmailError = false;
    this.regFirstNameError = false;
    this.regLastNameError = false;
    let newUser = {
      firstName: this.userRegister["firstName"],
      lastName: this.userRegister["lastName"],
      email: this.userRegister["email"],
      password: this.userRegister["password"],
      password2: this.userRegister["password2"]
    };
    this.http.createUser(newUser).subscribe(data => {
      this.errorMessage = Object.keys(data["errors"])[0];
      switch (this.errorMessage.length > 0) {
        case this.errorMessage === "password":
          this.regPasswordError = true;
          this.regPasswordErrorMsg = data["errors"]["password"];
          return;
        case this.errorMessage === "firstName":
          this.regFirstNameError = true;
          this.regFirstNameErrorMsg = data["errors"]["firstName"]["message"];
          return;
        case this.errorMessage === "lastName":
          this.regLastNameError = true;
          this.regLastNameErrorMsg = data["errors"]["lastName"]["message"];
          return;
        case this.errorMessage === "email":
          this.regEmailError = true;
          this.regEmailErrorMsg = data["errors"]["email"]["message"];
          return;
      }
      this.userRegister["firstName"] = "";
      this.userRegister["lastName"] = "";
      this.userRegister["email"] = "";
      this.userRegister["password"] = "";
      this.userRegister["password2"] = "";
      this.regForm = true;
      console.log("Response from onRegister", data);
    });
  }
  checkRegisterForm() {
    if (
      this.userRegister["firstName"] === "" ||
      this.userRegister["lastName"] === "" ||
      this.userRegister["email"] === "" ||
      this.userRegister["password"] === "" ||
      this.userRegister["password2"] === ""
    ) {
      this.regForm = true;
    } else {
      this.regForm = false;
    }
  }
  onLogin() {
    let user = {
      email: this.userLogin["email"],
      password: this.userLogin["password"]
    };
    this.http.loginUser(user).subscribe(user => {
      console.log("Response from onLogin", user);
      this.userLogin["email"] = "";
      this.userLogin["password"] = "";
    });
  }
}
