import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-listing",
  templateUrl: "./listing.component.html",
  styleUrls: ["./listing.component.scss"]
})
export class ListingComponent implements OnInit {
  @Input() item: Object;
  @Input() front: Boolean;
  @Input() userId: String;
  @Output() emitter = new EventEmitter();
  userName: String;
  userEmail: String;
  contactCheck: Boolean = true;

  constructor(private http: HttpService) {}

  ngOnInit() {}
  onContactClick() {
    this.http.getUser(this.item["owner"]).subscribe(data => {
      this.userName = data["user"]["firstName"];
      this.userEmail = data["user"]["email"];
      this.contactCheck = false;
      console.log(this.userEmail);
    });
  }
  onCloseModal() {
    this.contactCheck = true;
  }
  onDeleteClick() {
    this.http
      .deleteItem(this.item["_id"], this.item["owner"])
      .subscribe(data => {
        console.log(data);
        this.emitter.emit();
      });
  }
}
