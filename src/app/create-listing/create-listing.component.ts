import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-listing",
  templateUrl: "./create-listing.component.html",
  styleUrls: ["./create-listing.component.scss"]
})
export class CreateListingComponent implements OnInit {
  @Input() userId: String;
  @Output() emitter = new EventEmitter();
  newItem: Object = {
    title: "",
    description: "",
    price: 0,
    location: "",
    image: ""
  };
  errorMessage: String;
  successMessage: String;

  constructor(private http: HttpService, private router: Router) {}

  ngOnInit() {}
  createItem() {
    let item = {
      title: this.newItem["title"],
      description: this.newItem["description"],
      price: this.newItem["price"],
      location: this.newItem["location"],
      image: this.newItem["image"],
      userId: this.userId
    };
    this.http.createItem(item).subscribe(data => {
      console.log("response: ", data);
      if (data["message"] === "success") {
        this.newItem["title"] = "";
        this.newItem["description"] = "";
        this.newItem["price"] = "";
        this.newItem["location"] = "";
        this.newItem["image"] = "";
        this.errorMessage = "";
        this.successMessage = "Item added successfully";
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
        this.emitter.emit();
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
