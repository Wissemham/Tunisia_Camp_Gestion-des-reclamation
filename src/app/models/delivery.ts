import { Transaction } from "./transaction";

export class Delivery {
  idDelivery!: number;
  location!: string;
 delivery_date!: Date;
  weight!: number;
  done!: boolean;
  shipments!: Transaction[];
  distanceFromDelivery!: number;
  pricedelivery!: number;
}