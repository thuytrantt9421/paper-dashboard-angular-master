import { Routes } from "@angular/router";

import { DashboardComponent } from "../dashboard/dashboard.component";
import { TableComponent } from "../user-management/table/table.component";
import { TypographyComponent } from "../typography/typography.component";
import { IconsComponent } from "../icons/icons.component";
import { MapsComponent } from "../maps/maps.component";
import { NotificationsComponent } from "../notifications/notifications.component";
import { UpgradeComponent } from "../upgrade/upgrade.component";
import { UserCreateComponent } from "../user-management/user-create/user-create.component";
import { UserEditComponent } from "../user-management/user-edit/user-edit.component";

export const AdminLayoutRoutes: Routes = [
  // {
  //   path: "user",
  //   component: UserManagementComponent,
  //   children: [
  //     {
  //       path: "",
  //       loadChildren: () =>
  //         import("../user-management/user-management.routing").then(
  //           (x) => x.UserRoutingModule
  //         ),
  //     },
  //   ],
  // },
  // { path: "user/create", component: UserCreateComponent },
  // { path: "user/edit", component: UserEditComponent },
  // { path: "dashboard", component: DashboardComponent },
  // { path: "typography", component: TypographyComponent },
  // { path: "icons", component: IconsComponent },
  // { path: 'maps',           component: MapsComponent },
  // { path: "notifications", component: NotificationsComponent },
  // { path: "upgrade", component: UpgradeComponent },
];
