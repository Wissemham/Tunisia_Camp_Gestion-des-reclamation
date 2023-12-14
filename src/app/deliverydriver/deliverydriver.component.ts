import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliverysService } from '../services/deliverys.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Typed from 'typed.js';
import { Delivery } from '../models/delivery';

@Component({
  selector: 'app-deliverydriver',
  templateUrl: './deliverydriver.component.html',
  styleUrls: ['./deliverydriver.component.css']
})
export class DeliverydriverComponent implements OnInit   {
  @Input() idDelivery!: number;
  depart!: string;
  destination!: string;
  //idDelivery!: number;
  pricedelivery!: number;
  private typed!: Typed;
  title: string = '';
  deliveries: Delivery[] = [];
  constructor(private route: ActivatedRoute,private deliveryservice:DeliverysService,private modalService:NgbActiveModal){}
 ngOnInit(): void {
  this.animateTitle();

  }

  animateTitle(): void {
    const titleText = ('Add    Price');
    const titleElement = document.getElementById('title') as HTMLElement;
    let i = 0;
    const intervalId = setInterval(() => {
      titleElement.innerText += titleText[i];
      i++;
      if (i >= titleText.length) {
        clearInterval(intervalId);
      }
    }, 100);
  }
getdelivery():void{
  this.deliveryservice.getDeliveries().subscribe((data: Delivery[]) => {
    this.deliveries = data;
  });
}
  onSubmit():void{
    this.deliveryservice.calculatePrice(this.depart,this.destination,this.idDelivery).subscribe(price => {this.pricedelivery = price;
      this.getdelivery();
      this.closeModal();
    });

  }
 closeModal(){
    this.modalService.close();
  }
}
