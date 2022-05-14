import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./pages/admin-layout/admin-layout.component";
import { LoginComponent } from "./login/login.component";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  // {
  //   path: "",
  //   component: AdminLayoutComponent,
  //   children: [
  //     {
  //       path: "",
  //       loadChildren: () =>
  //         import("./pages/admin-layout/admin-layout.module").then(
  //           (x) => x.AdminLayoutModule
  //         ),
  //     },
  //   ],
  // },
  {
    path: "user",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/user-management/user-management.routing").then(
            (x) => x.UserRoutingModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "login",
  },
];