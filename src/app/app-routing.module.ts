import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllTemplateUserComponent} from "./frontOffice/all-template-user/all-template-user.component";
import {BodyUserComponent} from "./frontOffice/body-user/body-user.component";
import {AllTemplateAdminComponent} from "./backOffice/all-template-admin/all-template-admin.component";
import {BodyAdminComponent} from "./backOffice/body-admin/body-admin.component";
import {ClaimAdminComponent} from "./claim-admin/claim-admin.component";
import { ClaimListComponent } from './claim-list/claim-list.component';
import { PiechartComponent } from './piechart/piechart.component';
import { MapleafletComponent } from './mapleaflet/mapleaflet.component';
import { DeliveryShopComponent } from './delivery-shop/delivery-shop.component';
import { DeliverydriverComponent } from './deliverydriver/deliverydriver.component';
import { DeliveryNearestdriverComponent } from './delivery-nearestdriver/delivery-nearestdriver.component';
import { DeliverybyUserComponent } from './deliveryby-user/deliveryby-user.component';
import { DeliveryadminComponent } from './deliveryadmin/deliveryadmin.component';
import { DeliveryListShopperComponent } from './delivery-list-shopper/delivery-list-shopper.component';

const routes: Routes = [
  {path:'',redirectTo:"user",pathMatch:"full"},
  {
    path:'admin',component:AllTemplateAdminComponent,
    children:[
      {
        path:'admin',component: BodyAdminComponent
      },
      {
        path:'claimadmin',component: ClaimAdminComponent
      },
      {path:'statistic',component: PiechartComponent},
      {path:'deliveryadmin', component: DeliveryadminComponent},
    ]
  },
  {
    path:'user',component:AllTemplateUserComponent,
    children:[
      {
        path:'user',component:BodyUserComponent
      },
      { path: 'map', component: MapleafletComponent },
      {path:'deliverynearestdriver', component: DeliveryNearestdriverComponent},
      {path:'deliverylistshop', component: DeliveryListShopperComponent},
    ]
  },
  {
    path:'claimuser',component:ClaimListComponent
  },
  {path: 'deliveryshop', component: DeliveryShopComponent},
  {path:'deliverydriver', component: DeliverydriverComponent},

  {path:'deliveryuser', component: DeliverybyUserComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
