import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserRoutes } from "./user-management.routing";
import { TableComponent } from "./table/table.component";
import { UserCreateComponent } from "./user-create/user-create.component";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { HotTableModule } from "@handsontable/angular";
import { SidebarModule } from "app/sidebar/sidebar.module";
import { NavbarModule } from "app/shared/navbar/navbar.module";
import { FooterModule } from "app/shared/footer/footer.module";
import { FixedPluginModule } from "app/shared/fixedplugin/fixedplugin.module";
import { ApiService } from "app/api/api";
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HotTableModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [UserCreateComponent, UserEditComponent, TableComponent],
  exports: [TableComponent, UserCreateComponent, UserEditComponent],
  providers: [ApiService],
})
export class UserMangagementModule {}
