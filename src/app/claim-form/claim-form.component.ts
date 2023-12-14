import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Claim } from '../models/claim';
import { ClaimsService } from './../services/claims.service';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaComponent } from 'ng-recaptcha';
import Typed from 'typed.js';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-claim-form',
  templateUrl: './claim-form.component.html',
  styleUrls: ['./claim-form.component.css']
})
export class ClaimFormComponent implements OnInit  {
  //claim: Claim = new Claim();
  userId: number = 2 ;
  @Input() claim: Claim=new Claim();
  //private readonly notifier: NotifierService;
  @Output() submitForm = new EventEmitter<any>();
  title: string = 'New Claim';
  isAdd: boolean = true;
  token: string|undefined;
  isFormReset: boolean = false;
  private typed!: Typed;
  @ViewChild('claimForm') claimForm!: NgForm;
  @ViewChild('recaptcha') recaptcha!: RecaptchaComponent;
 @ViewChild('recaptchaResponse') recaptchaResponse!: ElementRef;
 @Output() formSubmitted = new EventEmitter<void>();
 @ViewChild('titleElement') titleElement!: ElementRef;
/* private readonly notifier: NotifierService;*/
 private notificationOptions = {
 // notificationOptions = {
    position: ['top', 'right'],
    container: '#notification-container'

 };
 @Output() dataToPassToParent = new EventEmitter<string>();
 categoryControl = new FormControl('', [Validators.required]);
  constructor(private route: ActivatedRoute, private claimsService: ClaimsService ,private router:Router, public modal:NgbActiveModal,private  notifier: NotifierService ) {
    this.token = undefined;
    //this.notifier = notifierService;
   }
  ngOnInit(): void {
   // this.userId = this.route.snapshot.params['id'];
   /*if (this.claim) {
    this.claim = new Claim();
  }*/

  if (this.claim.idClaim) {
    //this.title = 'Edit Claim';
    this.startTypedAnimation('Edit Claim');

    this.isAdd = false;
  }else {
    //this.title = 'New Claim';
    this.startTypedAnimation('New Claim');

  }

  }

  startTypedAnimation(text: string) {
    this.title = '';
    const typed = new Typed('.title-typed', {
      strings: [text],
      typeSpeed: 60,
      backSpeed: 40,
      smartBackspace: true,
      loop: false,
      showCursor: false,
    });
  }
  onSubmit() {
    if (this.claim.idClaim) {
      // modify an existing claim
      this.claimsService.modifyclaim(this.claim.idClaim, this.claim).subscribe(
        response => {console.log(response),this.submitForm.emit();
          //this.notifier.notify('success', 'You are awesome! I mean it!');
          Swal.fire({
            title: 'Custom animation with Animate.css',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        },
        error => console.log(error)
      );
    } else {
      // add a new claim
      this.claimsService.addClaimToUser(this.claim, this.userId).subscribe(response => {
        console.log('Claim added successfully');
      // this.claimsService.retrieveClaimsByUser(this.userId);
        this.formSubmitted.emit();
        this.router.navigate(['/user/claimslist']);
       Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      });

    }
//this.closeModal(this.modal);
  }
  resetClaimForm(): void {
    this.claim = new Claim();
    this.claimForm.reset();
   // this.title = 'New Claim';
   this.startTypedAnimation('New Claim');
    this.isAdd = true;
    this.categoryControl.reset();
    //this.notifier.notify('success', 'You are awesome! I mean it!');
  }
  /*closeModal() {
    this.modal.close();
  }*/
  passDataToParent(): void {
    const data = 'Data to be passed to parent';
    this.dataToPassToParent.emit(data);
  }
}


