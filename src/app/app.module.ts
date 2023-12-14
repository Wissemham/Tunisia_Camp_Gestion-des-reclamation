import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyUserComponent } from './frontOffice/body-user/body-user.component';
import { FooterUserComponent } from './frontOffice/footer-user/footer-user.component';
import { HeaderUserComponent } from './frontOffice/header-user/header-user.component';
import { AllTemplateUserComponent } from './frontOffice/all-template-user/all-template-user.component';
import { AllTemplateAdminComponent } from './backOffice/all-template-admin/all-template-admin.component';
import { HeaderAdminComponent } from './backOffice/header-admin/header-admin.component';
import { FooterAdminComponent } from './backOffice/footer-admin/footer-admin.component';
import { BodyAdminComponent } from './backOffice/body-admin/body-admin.component';
import { SideAdminComponent } from './backOffice/side-admin/side-admin.component';
import {ClaimAdminComponent} from "./claim-admin/claim-admin.component";
import {ClaimListComponent} from "./claim-list/claim-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SearchPipe} from "./environments/search.pipe";
import {RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings} from "ng-recaptcha";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastContainerModule, ToastrModule} from "ngx-toastr";
import {NgConfirmModule} from "ng-confirm-box";
import {OrderModule} from "ngx-order-pipe";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {NgxPaginationModule} from "ngx-pagination";
import {environment} from "./environments/environment";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClaimFormComponent } from './claim-form/claim-form.component';
import { NgChartsModule } from 'ng2-charts';
import { PiechartComponent } from './piechart/piechart.component';
import { MapleafletComponent } from './mapleaflet/mapleaflet.component';
import { DeliveryShopComponent } from './delivery-shop/delivery-shop.component';
import { DeliverydriverComponent } from './deliverydriver/deliverydriver.component';
import { DeliveryNearestdriverComponent } from './delivery-nearestdriver/delivery-nearestdriver.component';
import { DeliverybyUserComponent } from './deliveryby-user/deliveryby-user.component';
import { DeliveryadminComponent } from './deliveryadmin/deliveryadmin.component';
import { DeliveryListShopperComponent } from './delivery-list-shopper/delivery-list-shopper.component';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NotifierModule } from 'angular-notifier';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    BodyUserComponent,
    FooterUserComponent,
    HeaderUserComponent,
    AllTemplateUserComponent,
    AllTemplateAdminComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
    BodyAdminComponent,
    SideAdminComponent,
    ClaimAdminComponent,
    ClaimListComponent,
    ClaimFormComponent,
    PiechartComponent,
    MapleafletComponent,
    DeliveryShopComponent,
    DeliverydriverComponent,
    DeliveryNearestdriverComponent,
    DeliverybyUserComponent,
    DeliveryadminComponent,
    DeliveryListShopperComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgChartsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FontAwesomeModule,
    NgbModule,
    LeafletModule,
    RouterModule,
    MatIconModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig({
      // Custom options in here
    }),
    ToastrModule.forRoot({positionClass : 'toast-center-center' } ) ,
    ToastContainerModule ,
      //timeOut: 10000,
     // progressBar:true,
     //positionClass: 'toast-center-center',
     // preventDuplicates: true,
   // }),
    NgxPaginationModule,
    NgConfirmModule,
    OrderModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSearch);

  }
}
