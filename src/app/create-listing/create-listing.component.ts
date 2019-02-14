import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-create-listing",
  templateUrl: "./create-listing.component.html",
  styleUrls: ["./create-listing.component.scss"]
})
export class CreateListingComponent implements OnInit {
  constructor(private http: HttpService) {}
  newItem: Object = {
    title: "",
    description: "",
    price: 0,
    location: "",
    image: "",
    userId: ""
  };
  errorMessage: String;
  errorMessages: any;
  successMessage: String;
  ngOnInit() {
    this.http.getLoggedUser().subscribe(data => {
      console.log("heres createItem: ", data["userId"]);
      this.newItem["userId"] = data["userId"];
    });
  }
  createItem() {
    let item = {
      title: this.newItem["title"],
      description: this.newItem["description"],
      price: this.newItem["price"],
      location: this.newItem["location"],
      image: this.newItem["image"],
      userId: this.newItem["userId"]
    };
    this.http.createItem(item).subscribe(data => {
      console.log("response: ", data);
      if (data["message"] === "success") {
        this.newItem["title"] = "";
        this.newItem["description"] = "";
        this.newItem["price"] = "";
        this.newItem["location"] = "";
        this.newItem["image"] = "";
        this.newItem["userId"] = "";
        this.errorMessage = "";
        this.successMessage = "Item added successfully";
      } else {
        this.successMessage = "";
        switch (data["message"] === "error") {
          case data["errors"]["description"] != undefined:
            this.errorMessage = data["errors"]["description"]["message"];
            return;
          case data["errors"]["title"] != null:
            this.errorMessage = data["errors"]["title"]["message"];
            return;
          case data["errors"]["image"] != null:
            this.errorMessage = data["errors"]["image"]["message"];
            return;
          case data["errors"]["price"] != null:
            this.errorMessage = data["errors"]["price"]["message"];
            return;
          case data["errors"]["location"] != null:
            this.errorMessage = data["errors"]["location"]["message"];
            return;
          case data["error"] != null:
            this.errorMessage = data["error"];
            return;
        }
      }
    });
  }
}
