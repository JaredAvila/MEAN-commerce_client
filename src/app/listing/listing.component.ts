import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-listing",
  templateUrl: "./listing.component.html",
  styleUrls: ["./listing.component.scss"]
})
export class ListingComponent implements OnInit {
  constructor() {}
  item: Object = {
    title: "Deadpool",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi, qui! Sequi omnis dignissimos sit totam dolorem neque sed veritatis minima deleniti, nisi rem? Fuga magnam ex quia dolorum in architecto.",
    price: 15,
    location: "Sunnyvale, CA",
    owner: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPmCK_bCv23phpKSIBpwDIVpzS3vGl2w7IZNjtaAczrlqOOP_E",
    buyer: ""
  };
  ngOnInit() {}
}
