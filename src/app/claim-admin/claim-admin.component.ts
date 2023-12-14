import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClaimsService } from '../services/claims.service';
import { Claim } from '../models/claim';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-claim-admin',
  templateUrl: './claim-admin.component.html',
  styleUrls: ['./claim-admin.component.css']
})
export class ClaimAdminComponent implements OnInit , AfterViewInit  {
  claims!: Claim[];
  selectedState: boolean = true;
  states: { name: string, value: boolean }[] = [
    { name: 'True', value: true },
    { name: 'False', value: false },
  ];
  filteredClaimsCount = 0 ;
  totalClaims!: number;
  selectedPageSize: number = 20;
  iduser:number =1;
  dataSource = new MatTableDataSource<Claim>(this.claims);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private claimService: ClaimsService) { }

  ngOnInit(): void {
    this.claimService.claims$.subscribe((claims) => {
      this.claims = claims;
      this.dataSource.data = claims;
    });
    this.getAllClaims();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllClaims(): void {
    this.claimService.getAllClaims().subscribe((claims) => {
      this.claims = claims;
     this.dataSource.data = claims;
     this.totalClaims=claims.length;
     this.filteredClaimsCount=claims.length;
    });
  }

  getClaimsSortedBySentiment(): void {
    this.claimService.getClaimsSortedBySentiment().subscribe((claims) => {
      this.claims = claims.sort((a, b) => b.sentimentScore - a.sentimentScore);
      this.dataSource.data = claims;
    });
  }
  onModifyEtatClaims(idUser: number, idClaim: number) {
    this.claimService.modifyEtatClaimsByAdmin(idUser,idClaim).subscribe(() => {
      this.getAllClaims();
      this.getClaimsSortedBySentiment();
      console.log('Claim state modified successfully!');
    }, error => {
      console.error(error);
    });
  }
  deleteClaim(idClaim: number): void {
    this.claimService.deleteClaimById(idClaim).subscribe(() => {
        this.getAllClaims();
      });
    }
    getAllByState(state: boolean): void {
      this.claimService.getAllByState(state).subscribe((claims) => {
        this.claims = claims;
        this.dataSource.data = claims;
       this.filteredClaimsCount=claims.length;
      });
    }
}
