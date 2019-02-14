import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-edit-listing",
  templateUrl: "./edit-listing.component.html",
  styleUrls: ["./edit-listing.component.scss"]
})
export class EditListingComponent implements OnInit {
  @Input() item: Object;
  @Input() userId: String;
  @Output() emitter = new EventEmitter();
  newItem: Object;

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.newItem = {
      id: this.item["_id"],
      title: this.item["title"],
      description: this.item["description"],
      price: this.item["price"],
      image: this.item["image"],
      location: this.item["location"],
      owner: this.userId
    };
  }
  onUpdate() {
    console.log("heres updated item: ", this.newItem);
    this.http.editItem(this.newItem).subscribe(data => {
      this.emitter.emit();
    });
  }
  onDelete() {
    this.http.deleteItem(this.item["_id"], this.userId).subscribe(data => {
      this.emitter.emit();
    });
  }
  onDeleteUsers() {
    this.http
      .removeAllUsers()
      .subscribe(data => console.log("users deleted: ", data));
  }
  onDeleteItems() {
    this.http
      .removeAllItems()
      .subscribe(data => console.log("items deleted: ", data));
  }
}
