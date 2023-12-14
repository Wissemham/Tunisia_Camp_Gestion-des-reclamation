import { Component, OnInit } from '@angular/core';
import { DeliverysService } from './../services/deliverys.service';
import { ActivatedRoute } from '@angular/router';
import { Delivery } from '../models/delivery';

@Component({
  selector: 'app-deliveryby-user',
  templateUrl: './deliveryby-user.component.html',
  styleUrls: ['./deliveryby-user.component.css']
})
export class DeliverybyUserComponent implements OnInit {

  deliveries!: Delivery[];
idUser!: number;
constructor(private route: ActivatedRoute,private deliveryservice:DeliverysService){}

ngOnInit(){
  this.idUser=3;
  this.loadDeliveriesByUser(this.idUser);
}

loadDeliveriesByUser(idUser: number): void {
  this.deliveryservice.findDeliveriesByUser(idUser)
    .subscribe(deliveries => this.deliveries = deliveries);
}

}
