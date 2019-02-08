import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginRegisterComponent } from "./login-register/login-register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MyListingsComponent } from "./my-listings/my-listings.component";

const routes: Routes = [
  {
    path: "",
    component: LoginRegisterComponent
  },
  {
    path: "dash",
    component: DashboardComponent
  },
  {
    path: "listings",
    component: MyListingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
