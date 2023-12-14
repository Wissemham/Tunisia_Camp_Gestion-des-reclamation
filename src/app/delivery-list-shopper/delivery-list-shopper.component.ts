import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliverysService } from '../services/deliverys.service';
import { Delivery } from '../models/delivery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryShopComponent } from '../delivery-shop/delivery-shop.component';
import { User } from '../models/user';
import { DeliverydriverComponent } from '../deliverydriver/deliverydriver.component';
@Component({
  selector: 'app-delivery-list-shopper',
  templateUrl: './delivery-list-shopper.component.html',
  styleUrls: ['./delivery-list-shopper.component.css']
})
export class DeliveryListShopperComponent implements OnInit {
 @ViewChild('deliveryModal') deliveryModal!: TemplateRef<any>;
 p: number = 1;
  selectedDelivery!: Delivery;
  deliveries: Delivery[] = [];
  constructor(private route: ActivatedRoute,private deliveryservice:DeliverysService,private modalService: NgbModal){}


ngOnInit() {
this.getdelivery();
}
getdelivery():void{
  this.deliveryservice.getDeliveries().subscribe((data: Delivery[]) => {
    this.deliveries = data;
  });
}
getNearestDriver(idDelivery: number): void {
  this.deliveryservice.getNearestAvailableDriver(idDelivery).subscribe(
    (data: User) => {
      console.log(`The nearest available driver for delivery ${idDelivery} is ${data.username}`);
    },
    (error: any) => {
      console.log(`Error occurred while getting nearest driver for delivery ${idDelivery}: ${error.message}`);
    }
  );
}

openDeliveryDriverModal(idDelivery: number) {
  const modalRef = this.modalService.open(DeliverydriverComponent);
  modalRef.componentInstance.idDelivery = idDelivery;
  this.getdelivery();
}

openEditModal(delivery: Delivery) {
  const modalRef = this.modalService.open(DeliveryShopComponent);
  modalRef.componentInstance.idDelivery = delivery.idDelivery;

}
}
/*
openModal(id: number): void {
  this.modalDeliveryId = id;
  this.deliveryModal.nativeElement.classList.add('show');
}

closeModal(): void {
  this.deliveryModal.nativeElement.classList.remove('show');
}

saveDelivery(): void {
  this.deliveryShopComponent.addDeliveryWeight();
  this.closeModal();
}*/
/*openModal(delivery: Delivery) {
  this.selectedDelivery = delivery;
  const modalRef = this.modalService.open(this.deliveryModal, { centered: true });
 // modalRef.componentInstance.modalContext = { delivery };
}*/







/*openDeliveryModal(delivery: Delivery) {
  const modalRef = this.modalService.open(DeliveryShopComponent, { size: 'lg' });
  modalRef.componentInstance.idDelivery = delivery.idDelivery;
  modalRef.result.then((result) => {
    if (result === 'success') {
      this.deliveryservice.getDeliveries().subscribe((data: Delivery[]) => {
        this.deliveries = data;
      });
    }
  });
}*/
//}

