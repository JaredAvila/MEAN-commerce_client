import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpService, private router: Router) {}
  userId: String;
  userName: String;
  ngOnInit() {
    this.http.getLoggedUser().subscribe(data => {
      if (
        data["userStatus"] === "loggedOut" ||
        data["userStatus"] === null ||
        data["error"]
      ) {
        this.router.navigate(["/"]);
      } else {
        this.userName = data["userName"];
        this.userId = data["userId"];
      }
    });
  }
  onLogOut() {
    this.http.onLogOut({ userId: this.userId }).subscribe(data => {
      console.log("user has been logged out: ", data);
      this.router.navigate(["/"]);
    });
  }
}
