import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil, Observable, BehaviorSubject, of } from 'rxjs';
import { ClaimsService } from '../services/claims.service';
import { Claim } from './../models/claim';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RecaptchaComponent } from 'ng-recaptcha';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { PaginationInstance } from 'ngx-pagination';
import { MatPaginator } from '@angular/material/paginator';
import { NgConfirmService } from 'ng-confirm-box';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ClaimFormComponent } from '../claim-form/claim-form.component';


@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit , OnDestroy {
  claims!: Claim[];
  userId: number =3;
  newClaim: Claim = new Claim();
  claims$: Observable<Claim[]> = new Subject();
  claimsSubject: Subject<Claim[]> = new Subject();
  private unsubscribe$: Subject<void> = new Subject();
  isEditMode: boolean =false;
  editclaim : Claim = new Claim();
  isFormVisible = false;
  token: string|undefined;
   faSearch=faSearch;
 searchText: string = '';
  claimForm!:FormGroup;
  isFormReset: boolean = false;
  orderKey: string = 'title';
  reverse: boolean = false;
  p: number = 1;
  paginationConfig: PaginationInstance = {
    id: 'claims-pagination',
    itemsPerPage: 10,
    currentPage: 1
  };
  totalClaims: number = 0;
  titlepage!: string;
  modalRef: NgbModalRef | undefined;
  claim: Claim = new Claim();
  newclaim: Claim = new Claim();
 @ViewChild('claimForm') FormBuilder! :NgForm;
 @ViewChild('recaptcha') recaptcha!: RecaptchaComponent;
 @ViewChild('recaptchaResponse') recaptchaResponse!: ElementRef;
 @ViewChild('MatPaginator') paginator!: MatPaginator;
 @ViewChild(ToastContainerDirective, { static: true }) toastContainer!: ToastContainerDirective;

  constructor(private route: ActivatedRoute,private claimsService: ClaimsService,private formBuilder: FormBuilder,
    private toastr: ToastrService,private confirmService: NgConfirmService,private modalService:NgbModal ) {
    this.token = undefined;

  }

  ngOnInit(): void {
    this.toastr.overlayContainer = this.toastContainer;
    this.claimForm =this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required)
    });
    this.userId = 2;
    this.titlepage='Add a new Claim';
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
       // this.userId = +params.get('userId') ?? 2;
        this.retrieveClaimsByUser();
     });

    this.claimsService.claims$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(claims => this.claims = claims);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

 /* showForm() {
    this.isFormVisible = true;
  }*/
 /* retrieveClaimsByUser(): void {
    this.claimsService.retrieveClaimsByUser(this.userId)
      .subscribe();
  }*/
  retrieveClaimsByUser(): void {
    this.claimsService.retrieveClaimsByUser(this.userId)
      .subscribe(claims => {
        this.claims = claims;
        this.totalClaims = claims.length;
      });
  }

  onResolved(): void {
    //this.token = this.recaptcha.response;
    //const response = this.recaptcha.;
    // Get the user response token
    //const response = this.recaptcha.getResponse();
    // Set the value of the hidden input field to the user response token
    //this.recaptchaResponse.nativeElement.value = response;
  }
  order(key: string) {
    this.orderKey = key;
    this.reverse = !this.reverse;
  }



  deleteClaim(idClaim: number): void {
    this.confirmService.showConfirm("Are you sure you want to delete this claim?",
     () => {
     // if(confirm("Are you sure you want to delete this claim?")) {
    this.claimsService.deleteClaimById(idClaim)
      .subscribe(() => {
        this.retrieveClaimsByUser();
        this.isEditMode = false;
        //this.toastr.error('Deleted!', 'Your claim was ');
        Swal.fire('Deleted!', 'Your claim was deleted.', 'success');
      });
    }, () => {
      // User clicked "No"
      console.log('Cancelled delete.');
    });
  }



  openClaimForm(claim?: Claim): void {
    this.editclaim = claim ? { ...claim } : new Claim();
    this.modalRef = this.modalService.open(ClaimFormComponent);
    this.modalRef.componentInstance.editclaim = this.editclaim;
    this.modalRef.result
      .then((result) => {
        this.editclaim = result;
        if (this.claim.idClaim) {
          this.claimsService.modifyclaim(this.editclaim.idClaim, this.claim).subscribe(
            (response) => {
              console.log(response);
              this.retrieveClaimsByUser();
            },
            (error) => console.log(error)
            //(response) => console.log(response),
           // (error) => console.log(error)
          );
        } else {
         /* this.claimsService
            .addClaimToUser(this.claim, this.userId)
            .subscribe((result) => {
              console.log(result);
              this.retrieveClaimsByUser();
              //this.newClaim = new Claim();
              this.modalRef?.close();
             /* (response) => console.log(response),
              (error) => console.log(error)*/
      /*  });
        }
      })*/
      this.claimsService
      .addClaimToUser(this.newclaim, this.userId)
      .subscribe(
        (response) => {
          console.log(response);
          //console.log(claim?.creation);
          this.retrieveClaimsByUser();
        },
        (error) => console.log(error)
      );
  }
})
      .catch((error) => console.log(error));
  }

  modifyClaim(idClaim: number, claim: Claim): void {
    this.claim = { ...claim };
    this.modalRef = this.modalService.open(ClaimFormComponent);
    this.modalRef.componentInstance.claim = this.claim;
    this.modalRef.result
      .then((result) => {
        this.claim = result;
        this.claimsService.modifyclaim(idClaim, this.claim).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
      })
      .catch((error) => console.log(error));
  }
  receivedData: string = '';

  receiveDataFromChild(data: string): void {
    this.receivedData = data;
  }
  /*resetForm() {
    this.claimForm.reset();
    this.isEditMode = false;
    this.newClaim = new Claim();
    this.newClaim.category = '';
    this.newClaim.title='';
    this.newClaim.content='';
    this.recaptcha.reset();
    this.titlepage='Add a new Claim';
    this.isFormReset=true;
  }
  edit(claim: Claim): void {
    this.newClaim=Object.assign({},claim);
    this.editclaim=Object.assign({},claim);
    this.claimForm.patchValue({
      title: claim.title,
      category: claim.category,
      content: claim.content});
     console.log(this.newClaim);
    this.isEditMode = true;
    this.titlepage='Update claim '
    console.log(this.isEditMode);
  }*/
}
