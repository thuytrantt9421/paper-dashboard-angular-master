import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";

import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";

import { AdminLayoutComponent } from "./pages/admin-layout/admin-layout.component";
import { LoginModule } from "./login/login.module";
import { HotTableModule } from "@handsontable/angular";
import { AdminLayoutModule } from "./pages/admin-layout/admin-layout.module";
import { ApiService } from "./api/api";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./login/auth.guard";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    HotTableModule,
    AdminLayoutModule,
    HttpClientModule,
  ],
  providers: [ApiService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
