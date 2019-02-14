import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-listings",
  templateUrl: "./listings.component.html",
  styleUrls: ["./listings.component.scss"]
})
export class ListingsComponent implements OnInit {
  search: String = "";
  items: Array<Object>;

  constructor(private http: HttpService) {}
  ngOnInit() {
    this.http.getAllItems().subscribe(data => {
      this.items = data["items"];
      console.log(this.items);
    });
  }

  onSearch() {
    console.log("search works!");
  }
}
