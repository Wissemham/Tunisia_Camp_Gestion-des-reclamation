import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery } from '../models/delivery';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DeliverysService {
  private apiUrl = 'http://localhost:1111/rest/api/claims';

  constructor(private http : HttpClient) { }

  addDeliveryWeight(userId: number, idDelivery: number, delivery: Delivery): Observable<any> {
    const url = `${this.apiUrl}/addweight?idUser=${userId}&idDelivery=${idDelivery}`;
    return this.http.put(url, delivery);
  }
  calculatePrice(depart: string, destination: string, idDelivery: number): Observable<number> {
    const params = new HttpParams()
      .set('depart', depart)
      .set('destination', destination)
      .set('idDelivery', idDelivery.toString());
    return this.http.post<number>(`${this.apiUrl}/calculatePrice`, {}, { params });
  }
  getNearestAvailableDriver(idDelivery: number): Observable<User> {
    const url = `${this.apiUrl}/findNearestdriverfromdelivery?idDelivery=${idDelivery}`;
    return this.http.get<User>(url);
  }

  getDeliveryAffectetodriverByShop(/*id: number*/){
    return this.http.get<Object[]>(`http://localhost:1111/rest/api/claims/deliveryaffectetodriverbyshop`/*?id=${id}*/);
  }
  addDeliveryAndAssignToLatestTransaction(location: string):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/adddeliveryandaffectertransaction?location=${location}`,{});
  }
  findDeliveriesByUser(idUser: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.apiUrl}/getdeliverybyUser?idUser=${idUser}`);
  }
  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${this.apiUrl}/getalldelivery`);
  }

}
 /* assignDriversToDeliveries() :Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/alldeliveryaffectetodriver`);
  }*/
 /* getDeliveryAffectedToDriverByShop(id: number): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.apiUrl}/deliveryaffectetodriverbyshop?id=${id}`);
  }*/
  /* addLocation(idUser: number, idTransaction: number, location: string): Observable<any> {
    const body = new FormData();
    body.append('idUser', String(idUser));
    body.append('idTransaction', String(idTransaction));
    body.append('location', location);
    return this.http.post<any>(`${this.apiUrl}/addlocationdelivery`, body);
  }*/