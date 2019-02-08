import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-listings",
  templateUrl: "./listings.component.html",
  styleUrls: ["./listings.component.scss"]
})
export class ListingsComponent implements OnInit {
  search: String = "";
  constructor() {}

  ngOnInit() {}

  onSearch() {
    console.log("search works!");
  }
}
