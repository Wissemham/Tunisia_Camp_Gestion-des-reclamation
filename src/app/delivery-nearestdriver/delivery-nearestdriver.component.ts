import { Component } from '@angular/core';
import { DeliverysService } from '../services/deliverys.service';
import { User } from '../models/user';

@Component({
  selector: 'app-delivery-nearestdriver',
  templateUrl: './delivery-nearestdriver.component.html',
  styleUrls: ['./delivery-nearestdriver.component.css']
})
export class DeliveryNearestdriverComponent {
 // nearestDriver: any;
 // idDelivery :number=3;
 // deliveries!: User[];
  //id!:number;
  deliveries :Object[]|any;
  id!:number;
  p: number = 1;
  constructor(private deliveryService: DeliverysService) { }
  ngOnInit() {
   /* this.deliveryService.getNearestAvailableDriver(this.idDelivery).subscribe(
      (data) => {
        this.nearestDriver = data;
      },
      (error) => {
        console.log(error);
      }
    );*/
    //this.getAssignedDrivers();
    this.id=3;
    this.deliveryService.getDeliveryAffectetodriverByShop(/*this.id*/).subscribe(data => {
      this.deliveries = data;
    });
  }
  }
  /*getAssignedDrivers() {
    this.deliveryService.assignDriversToDeliveries().subscribe(data => {
      this.deliveries = data;
    });
  }*/
 /* getDeliveryAffectedToDriverByShop():void{
  this.deliveryService.getDeliveryAffectedToDriverByShop(this.id).subscribe(
    data => {
      // Do something with the data
      console.log(data); // for example, log the data to the console
      this.data = data; // set the retrieved data to a variable in the component for further use
    },
    error => {
      console.error(error); // log any errors to the console
    }
  );
  }*/

