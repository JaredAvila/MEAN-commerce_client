import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpService } from "./http.service";
import { LoginRegisterComponent } from "./login-register/login-register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ListingsComponent } from "./listings/listings.component";
import { CreateListingComponent } from "./create-listing/create-listing.component";
import { EditListingsComponent } from "./edit-listings/edit-listings.component";
import { ListingComponent } from "./listing/listing.component";
import { EditListingComponent } from "./edit-listing/edit-listing.component";
import { MyListingsComponent } from "./my-listings/my-listings.component";
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    DashboardComponent,
    ListingsComponent,
    CreateListingComponent,
    EditListingsComponent,
    ListingComponent,
    EditListingComponent,
    MyListingsComponent,
    NavbarComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
