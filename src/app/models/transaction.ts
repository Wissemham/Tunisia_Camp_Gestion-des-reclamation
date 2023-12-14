import { Delivery } from "./delivery";
import { User } from "./user";

export class Transaction {
  idTransaction!: number;
  type!:string;
  rent_start_date!: Date;
  rent_end_date!: Date;
  price!: number;
  paid!: boolean;
  shipment!: boolean;
  payment_method!: string;
  //tool: Tool;
  //promotion: Promotion;
  shopper!: User;
  delivery!: Delivery;
}