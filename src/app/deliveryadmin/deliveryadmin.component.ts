import { Component } from '@angular/core';
import { Delivery } from '../models/delivery';
import { ActivatedRoute } from '@angular/router';
import { DeliverysService } from '../services/deliverys.service';

@Component({
  selector: 'app-deliveryadmin',
  templateUrl: './deliveryadmin.component.html',
  styleUrls: ['./deliveryadmin.component.css']
})
export class DeliveryadminComponent {


constructor(private route: ActivatedRoute,private deliveryservice:DeliverysService){}

  deliveries: Delivery[] = [];

ngOnInit() {
  this.deliveryservice.getDeliveries().subscribe((data: Delivery[]) => {
    this.deliveries = data;
  });
}
}
