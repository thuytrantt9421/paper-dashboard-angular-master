import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { TableComponent } from "./table/table.component";
import { UserCreateComponent } from "./user-create/user-create.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserMangagementModule } from "./user-management.module";

export const UserRoutes: Routes = [
  {
    path: "",
    component: TableComponent,
  },
  {
    path: "create",
    component: UserCreateComponent,
  },
  {
    path: "edit/:id",
    component: UserEditComponent,
  },
];
@NgModule({
  imports: [UserMangagementModule, RouterModule.forChild(UserRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
