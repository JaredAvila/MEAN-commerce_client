import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  // USER ROUTES
  createUser(user) {
    return this._http.post("/api/user", user);
  }
  getUsers() {
    return this._http.get("/api/users");
  }
  getUser(id) {
    return this._http.get(`/api/user/${id}`);
  }
  loginUser(user) {
    return this._http.post("/api/login", user);
  }
  removeAll() {
    return this._http.get("/api/removeAllUsers");
  }
  onLogOut(user) {
    return this._http.post("/api/logout", user);
  }

  // ITEM ROUTES
  createItem(item) {
    return this._http.post("/api/item", item);
  }

  getAllItems() {
    return this._http.get("/api/items");
  }
  getItem(data) {
    let itemId = {
      itemId: data
    };
    return this._http.post("/api/item/find", itemId);
  }
  searchItems(title) {
    let data = {
      title: title
    };
    return this._http.post("/api/searchItems", data);
  }
  getRandomItem() {
    return this._http.get("/api/item/random");
  }
  editItem(data) {
    let id = data["id"];
    return this._http.put(`/api/item/${id}`, data);
  }
  deleteItem(itemId, userId) {
    return this._http.delete(`/api/item/${itemId}/${userId}`);
  }
}
