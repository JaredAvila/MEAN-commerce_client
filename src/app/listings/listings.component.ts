import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-listings",
  templateUrl: "./listings.component.html",
  styleUrls: ["./listings.component.scss"]
})
export class ListingsComponent implements OnInit {
  searchData: String;
  items: Array<Object>;
  front: Boolean = false;
  userId: String;
  itemCheck: Boolean = true;

  constructor(private http: HttpService) {}
  ngOnInit() {
    this.http.getLoggedUser().subscribe(data => {
      this.userId = data["userId"];
    });
    this.fetchItems();
  }
  fetchItems() {
    this.http.getAllItems().subscribe(data => {
      if (data["items"] == []) {
        this.itemCheck = false;
      } else {
        this.itemCheck = true;
        this.items = data["items"];
      }
    });
  }
  onSearch() {
    this.http.searchItems(this.searchData).subscribe(data => {
      if (data["items"].length === 0) {
        this.itemCheck = false;
      } else {
        this.itemCheck = true;
        this.items = data["items"];
      }
    });
  }
}
