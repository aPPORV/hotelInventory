import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {
  id:number=0;
  // id$ =this.router.params.pipe(map((params) => params['roomid']));
  id$ =this.router.paramMap.pipe(map((params) => params.get('roomid')) );
  constructor(private router:ActivatedRoute) { }

  ngOnInit(): void {
    // this.id=this.router.snapshot.params['rooomid'];  //or
    
    // this.router.params.subscribe((params)=>{
    //   this.id=params['roomid']
    // })
  }

}
