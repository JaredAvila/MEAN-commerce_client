import { Component } from "@angular/core";
import { HttpService } from "./http.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor(private http: HttpService) {}

  // Item
  newItem: Object = {
    title: "",
    description: "",
    price: "",
    location: "",
    image: "",
    userId: "5c58b735da3f111478caa8bf"
  };

  // Random
  searchData: String;
  itemId: String = "5c58b763da3f111478caa8c0";

  getAllUsers() {
    this.http
      .getUsers()
      .subscribe(users => console.log("Response from getUsers", users));
  }
  getUserById() {
    this.http
      .getUser(this.newItem["userId"])
      .subscribe(data => console.log("Response from getUserById: ", data));
  }

  removeAll() {
    this.http
      .removeAll()
      .subscribe(data => console.log("Response from removeAll", data));
  }

  // onLogOut() {
  //   let user = {
  //     userId: 123456
  //   };
  //   this.http
  //     .onLogOut(user)
  //     .subscribe(data => console.log("Response from onLogOut", data));
  // }

  getAllItems() {
    this.http
      .getAllItems()
      .subscribe(data => console.log("Response from getAllItems", data));
  }
  getItem() {
    this.http
      .getItem(this.itemId)
      .subscribe(data => console.log("Response from getItem", data));
  }
  searchItems() {
    this.http
      .searchItems(this.searchData)
      .subscribe(data => console.log("Response from searchItems", data));
  }

  getRandomItem() {
    this.http
      .getRandomItem()
      .subscribe(data => console.log("Response from getRandomItem", data));
  }
  onEditItem() {
    let item = {
      title: this.newItem["title"],
      description: this.newItem["description"],
      price: this.newItem["price"],
      location: this.newItem["location"],
      image: this.newItem["image"],
      id: this.itemId
    };
    this.http
      .editItem(item)
      .subscribe(data => console.log("Response from onEditItem", data));
  }
  onDeleteItem() {
    this.http
      .deleteItem(this.itemId, this.newItem["userId"])
      .subscribe(data => console.log("Response from onDeleteItem", data));
  }
}
