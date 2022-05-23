import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { RequestMangagementModule } from "./request-management.module";
import { RequestManagementComponent } from "./request-management.component";

export const UserRoutes: Routes = [
  {
    path: "",
    component: RequestManagementComponent,
  },
];
@NgModule({
  imports: [RequestMangagementModule, RouterModule.forChild(UserRoutes)],
  exports: [RouterModule],
})
export class RequestRoutingModule {}
