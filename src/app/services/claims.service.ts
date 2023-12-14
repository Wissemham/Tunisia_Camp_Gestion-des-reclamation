import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subject, switchMap, tap } from 'rxjs';
import { Claim } from '../models/claim';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  private apiUrl = 'http://localhost:1111/rest/api/claims';

  constructor(private http: HttpClient) { }
  private claimsSubject: BehaviorSubject<Claim[]> = new BehaviorSubject<Claim[]>([]);
  public claims$: Observable<Claim[]> = this.claimsSubject.asObservable();
  private claimModifiedSubject: Subject<void> = new Subject<void>();

  retrieveClaimsByUser(userId: number): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.apiUrl}/users/${userId}/claims`).pipe(
      tap(claims => this.claimsSubject.next(claims))
    );
  }
  addClaimToUser(claim: Claim, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/addclaimtouser?idUser=${userId}`, claim).pipe(
      tap(() => {
        const claims = this.claimsSubject.getValue();
        claims.push(claim);
        this.claimsSubject.next(claims);
      })
    );
  }
  deleteClaimById(idClaim: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteclaimbyId?idClaim=${idClaim}`);
  }

  modifyclaim(idClaim: number, claim: Claim): Observable<void> {
    const url = `${this.apiUrl}/updateclaim?idClaim=${idClaim}`;
    return this.http.put<void>(url, claim).pipe(
      tap(() => {
        const claims = this.claimsSubject.getValue();
        const claimIndex = claims.findIndex(c => c.idClaim === idClaim);
        claims[claimIndex] = claim;
        this.claimsSubject.next(claims);
        this.claimModifiedSubject.next();
      })
    );
  }
  getAllClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.apiUrl}/retriveallclaims`).pipe(
      tap(claims => this.claimsSubject.next(claims)),
      switchMap(() => this.claims$)
    );
  }
  getClaimsSortedBySentiment(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.apiUrl}/sentiment`).pipe(
      tap(claims => this.claimsSubject.next(claims))
    );
  }
  modifyEtatClaimsByAdmin(idUser: number, idClaim: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modifyetat?idUser=${idUser}&idClaim=${idClaim}`, null).pipe(
      tap(() => this.claimModifiedSubject.next())
      );
  }
  getAllByState(state: boolean): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.apiUrl}/findbystate?state=${state}`);
  }
  getClaimsByCategory(): Observable<any> {
    //const url = `${this.baseUrl}/statisticNumbercategory`;
    return this.http.get<any>(`${this.apiUrl}/statisticNumbercategory`);
  }

  getCountsByCategory(startDate: Date, endDate: Date): Observable<any> {
    const startDateStr = moment(startDate).format('YYYY-MM-DD');
const endDateStr = moment(endDate).format('YYYY-MM-DD');
    const params = new HttpParams()
    .set('startDate', startDateStr)
    .set('endDate', endDateStr);
   // return this.http.get<any>('http://localhost:1111/rest/api/claims/NumberBetweenDate', { params });
   return this.http.get<any>(`${this.apiUrl}/NumberBetweenDate`, { params });
  }
 /* addClaimToUser(claim: Claim, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addclaimtouser?idUser=${userId}`, claim);
  }
 /* retrieveClaimsByUser(userId: number): Observable<Claim[]> {
    const url = `${this.apiUrl}/users/${userId}/claims`;
    return this.http.get<Claim[]>(url);
  }*/
}
  /*modifyclaim(idClaim: number, c1: Claim): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateclaim?idClaim=${idClaim}`, c1);
  }*/
 /*addClaimToUser(claim: Claim, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addclaimtouser?idUser=${userId}`, claim);
  }*/
  /*modifyClaim(idClaim: number, claim: Claim): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateclaim?idClaim=${idClaim}`, claim);
  }
  retrieveClaimsByUser(userId: number): Observable<Claim[]> {
    const url = `${this.apiUrl}/users/${userId}/claims`;
    return this.http.get<Claim[]>(url);
  }
   getClaimsStream(): Observable<Claim[]> {
    return interval(50).pipe(switchMap(() => {
      return this.http.get<Claim[]>(this.apiUrl);
    }));
  }*/

//}
