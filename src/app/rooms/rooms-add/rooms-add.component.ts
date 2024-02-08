import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent implements OnInit {

  room :RoomList ={
    roomType:'',
    amenities:'',
    checkinTime: new Date(),
    checkoutTime:new Date(),
    photos:'',
    price:0,
    rating:0


  }
  sucessMessage: string='';

  constructor(private roomService:RoomsService) { }

  ngOnInit(): void {
  }
  AddRoom(roomsForm: NgForm) {
    this.roomService.addRooms(this.room).subscribe((data) => {
      this.sucessMessage = 'Room added successfully';
      roomsForm.resetForm({});
    });
  }

}
