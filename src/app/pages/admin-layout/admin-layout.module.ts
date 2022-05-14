import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";

import { DashboardComponent } from "../dashboard/dashboard.component";
import { TableComponent } from "../user-management/table/table.component";
import { TypographyComponent } from "../typography/typography.component";
import { IconsComponent } from "../icons/icons.component";
import { MapsComponent } from "../maps/maps.component";
import { NotificationsComponent } from "../notifications/notifications.component";
import { UpgradeComponent } from "../upgrade/upgrade.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { HotTableModule } from "@handsontable/angular";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { UserCreateComponent } from "../user-management/user-create/user-create.component";
import { UserEditComponent } from "../user-management/user-edit/user-edit.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HotTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  declarations: [
    DashboardComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
  ],
})
export class AdminLayoutModule {}
