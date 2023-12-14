import { Component, Input, OnInit } from '@angular/core';
import { DeliverysService } from '../services/deliverys.service';
import { Delivery } from '../models/delivery';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delivery-shop',
  templateUrl: './delivery-shop.component.html',
  styleUrls: ['./delivery-shop.component.css']
})
export class DeliveryShopComponent implements OnInit {
  @Input() idDelivery!: number;
  userId!: number;
  //idDelivery!: number;
  weight!: number;
  done!: boolean;
//  delivery!: Delivery[];
  delivery: Delivery = new Delivery();

  constructor(private deliveryservice:DeliverysService,private modalService:NgbActiveModal ) { }
  ngOnInit(): void {
    this.userId = 6;
    //this.idDelivery =3;

  }
  addDeliveryWeight():void {


    this.deliveryservice.addDeliveryWeight(this.userId, this.idDelivery, this.delivery).subscribe(
      () => {

        this.deliveryservice.getDeliveries();
        this.close();
        console.log('Weight added successfully');
        // You can handle the response as per your requirements
      },
      error => {
        console.log('Error occurred while adding weight: ', error);
        // You can handle the error as per your requirements
      }
    );
  }
  close(){
    this.modalService.close();
  }

}
