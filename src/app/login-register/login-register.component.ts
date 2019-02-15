import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.scss"]
})
export class LoginRegisterComponent implements OnInit {
  constructor(private http: HttpService, private router: Router) {}

  front: Boolean = true;
  item: Object;
  regForm: Boolean = true;
  errors: Array<Object> = [];
  // errorMessage: any;
  // User
  userRegister: Object = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: ""
  };
  userRegValidation: Object = {
    passwordError: false,
    passwordErrorMsg: "",
    emailError: false,
    emailErrorMsg: "",
    firstNameError: false,
    firstNameErrorMsg: "",
    lastNameError: false,
    lastNameErrorMsg: ""
  };

  userLogin: Object = {
    email: "",
    password: ""
  };
  userLoginValidation: Object = {
    error: false,
    errorMsg: ""
  };

  ngOnInit() {
    this.getRandomItem();
  }
  getRandomItem() {
    this.http.getRandomItem().subscribe(data => {
      if (data["message"] === "error") {
        this.getRandomItem();
      } else {
        console.log(data);
        this.item = data["item"];
      }
    });
  }

  onRegister() {
    this.userRegValidation["passwordErrorMsg"] = "";
    this.userRegValidation["emailErrorMsg"] = "";
    this.userRegValidation["firstNameErrorMsg"] = "";
    this.userRegValidation["lastNameErrorMsg"] = "";
    this.userRegValidation["passwordError"] = false;
    this.userRegValidation["emailError"] = false;
    this.userRegValidation["firstNameError"] = false;
    this.userRegValidation["lastNameError"] = false;
    let newUser = {
      firstName: this.userRegister["firstName"],
      lastName: this.userRegister["lastName"],
      email: this.userRegister["email"],
      password: this.userRegister["password"],
      password2: this.userRegister["password2"]
    };
    this.http.createUser(newUser).subscribe(data => {
      if (data["errors"]) {
        let errorMessage = Object.keys(data["errors"])[0];
        switch (errorMessage.length > 0) {
          case errorMessage === "password":
            console.log("password violation");
            this.userRegValidation["passwordError"] = true;
            this.userRegValidation["passwordErrorMsg"] =
              data["errors"]["password"];
            return;
          case errorMessage === "firstName":
            this.userRegValidation["firstNameError"] = true;
            this.userRegValidation["firstNameErrorMsg"] =
              data["errors"]["firstName"]["message"];
            return;
          case errorMessage === "lastName":
            this.userRegValidation["lastNameError"] = true;
            this.userRegValidation["lastNameErrorMsg"] =
              data["errors"]["lastName"]["message"];
            return;
          case errorMessage === "email":
            this.userRegValidation["emailError"] = true;
            this.userRegValidation["emailErrorMsg"] =
              data["errors"]["email"]["message"];
            return;
        }
        this.userRegister["firstName"] = "";
        this.userRegister["lastName"] = "";
        this.userRegister["email"] = "";
        this.userRegister["password"] = "";
        this.userRegister["password2"] = "";
        this.regForm = true;
      } else {
        this.router.navigate(["/dash/home"]);
      }
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
    this.userLoginValidation["error"] = false;
    this.userLoginValidation["errorMsg"] = "";
    let user = {
      email: this.userLogin["email"],
      password: this.userLogin["password"]
    };
    this.http.loginUser(user).subscribe(user => {
      console.log("Response from onLogin", user);
      if (user["errors"]) {
        this.userLoginValidation["error"] = true;
        this.userLoginValidation["errorMsg"] = user["errors"][0]["login"];
      } else {
        this.userLogin["email"] = "";
        this.userLogin["password"] = "";
        // Redirect to dashboard
        this.router.navigate(["/dash/home"]);
      }
    });
  }
}
