import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(private http: HttpService) {}
  userName: String;
  userId: String;
  ngOnInit() {}
}
