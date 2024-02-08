import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, merge, mergeMap, switchMap } from 'rxjs';
import { CustomValidators } from './validators/custom-validators';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  checkinPicker: any;
  checkoutPicker: any;
  bookingPicker: any;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(private configService: ConfigService, private fb: FormBuilder, private bookingService:BookingService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {

    const roomId = this.route.snapshot.paramMap.get('roomid');
    this.bookingForm = this.fb.group(
      {
        roomId: new FormControl(
          { value: roomId, disabled: true },
          { updateOn: 'blur', validators: [Validators.required] }
        ),
        guestEmail: new FormControl('', {
          validators: [Validators.required, Validators.email, CustomValidators.ValidateName, CustomValidators.ValidateSpecialChar('*')],
        }),
        checkinDate: new FormControl(''),
        checkoutDate: new FormControl(''),
        bookingStatus: new FormControl(''),
        bookingAmount: new FormControl(''),
        bookingDate: new FormControl(''),
        mobileNumber: new FormControl('', { updateOn: 'blur' }),
        guestName: new FormControl('', {
          validators: [Validators.required, Validators.minLength(5)],
        }),
        address: this.fb.group({
          addressLine: new FormControl('', {
            validators: [Validators.required],
          }),
          addressLine2: new FormControl(''),
          city: new FormControl('', { validators: [Validators.required] }),
          state: new FormControl('', { validators: [Validators.required] }),
          country: new FormControl(''),
          zipCode: new FormControl(''),
        }),
        guests: this.fb.array([this.addGuestControl()]),
        tnc: new FormControl(false, { validators: Validators.requiredTrue }),
      },
      { updateOn: 'blur' , validators: [CustomValidators.Validatedate] }
    );
    this.getBookingData();
    //we are subscribing the bookRoom method within subsc 
    // this.bookingForm.valueChanges.subscribe((data) => {
    //   //console.log(data);
    //   this.bookingService.bookRoom(data).subscribe((data)=>{})
    // });

    // this.bookingForm.valueChanges.pipe(
    //   mergeMap((data)=> this.bookingService.bookRoom(data))
    // ).subscribe((data) => {console.log(data);
    // })
    // this.bookingForm.valueChanges.pipe(
    //   switchMap((data)=> this.bookingService.bookRoom(data))
    // ).subscribe((data) => {console.log(data);
    // })
    this.bookingForm.valueChanges.pipe(
      exhaustMap((data)=> this.bookingService.bookRoom(data))
    ).subscribe((data) => {console.log(data);
    })
  }
  addBooking() {


    console.log(this.bookingForm.getRawValue());
    //this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data)=>{console.log(data);
    
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }
  // addGuest(){
  //   this.guests.push(
  //     this.fb.group({guestName:[''], age: new FormControl('')})
  //   );
  // }
  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  getBookingData() {
    this.bookingForm.patchValue({
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('10-feb-2020'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  addGuestControl() {
    return this.fb.group({
      guestName: ['', { validators: [Validators.required] }],
      age: [''],
    });
  }
  addpassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }
  deletepassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}
