import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-edit-listings",
  templateUrl: "./edit-listings.component.html",
  styleUrls: ["./edit-listings.component.scss"]
})
export class EditListingsComponent implements OnInit {
  constructor(private http: HttpService) {}
  userId: String;
  userItems: Array<Object>;
  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.http.getLoggedUser().subscribe(data => {
      console.log(data);
      this.userId = data["userId"];
      this.userItems = data["userItems"];
    });
  }
}
