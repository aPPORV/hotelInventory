import { AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit {
  hotelName = 'Hilton Hotel'

  numberOfRooms = 10;

  hideRooms = true;
  title: string = 'Room List'
  totalBytes=0;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  };

  subscription!:Subscription;

  error$ = new Subject<string>();

  roomsCount$ =this.roomsService.getRooms$.pipe(
    map((rooms)=>rooms.length)
  )
  
  // getError$ !: this.error$.asObservable();

  rooms$ =this.roomsService.getRooms$.pipe(
    catchError((err) =>{
      console.log(err);
      this.error$.next(err);
      return of([]);
      
    })
  );

  priceFilter = new FormControl(0);

  roomList: RoomList[] = [];
  stream = new Observable<string>(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  })
  selectedRoom !: RoomList;

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildreComponent!: QueryList<HeaderComponent>

  constructor(private roomsService:RoomsService, private configService:ConfigService) { }


  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event)=>{
      switch(event.type){
        case HttpEventType.Sent:{
          console.log('Request has been made!!');
          break;
          
        }
        case HttpEventType.ResponseHeader:{
          console.log('Request success !!!!');
          break;
        }
        case HttpEventType.DownloadProgress:{
          this.totalBytes+=event.loaded;
          break;
        }
        case HttpEventType.Response:{
          console.log('event.body');
          

        }
      }
      
    })



    this.stream.subscribe({
      next:(value) => console.log(value),
      complete:() => console.log('complete'),
      error: (err) => console.log(err)
      
      
      
    });
    this.stream.subscribe((data)=> console.log(data));
    
    // console.log(this.headerComponent);
    // this.roomsService.getRooms().subscribe(rooms => {
    // this.subscription=this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomList=rooms;
    // });

    
  }
  ngDoCheck(): void {
    console.log('on changes is called');

  }

  ngAfterViewInit(): void {
    // console.log(this.headerComponent);
    this.headerComponent.title = "Rooms View";

    this.headerChildreComponent.last.title = "Last Title"
    this.headerChildreComponent.last.title = "Last Title";




  }

  ngAfterViewChecked() {
    // this.headerComponent.title="Rooms View";
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
    //console.log(room);
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: '104',
      roomType: 'Penthouse',
      amenities: 'Wi-Fi, Television, Air Conditioning, Private Pool',
      price: 800,
      photos: 'https://example.com/photo9.jpg, https://example.com/photo10.jpg',
      checkinTime: new Date('2024-11-11T14:00:00Z'),
      checkoutTime: new Date('2024-11-12T12:00:00Z'),
      rating: 4.9
    };
  
    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room];
    this.roomsService.addRooms(room).subscribe((data)=>{
      this.roomList=data;
    });
  }

  editRoom(){
    const room: RoomList = {
      roomNumber: '105',
      roomType: 'Penthouse',
      amenities: 'Wi-Fi, Television, Air Conditioning, Private Pool',
      price: 800,
      photos: 'https://example.com/photo9.jpg, https://example.com/photo10.jpg',
      checkinTime: new Date('2024-11-11T14:00:00Z'),
      checkoutTime: new Date('2024-11-12T12:00:00Z'),
      rating: 4.9
    };

    this.roomsService.editRooms(room).subscribe((data)=>{
      this.roomList=data;
    })
    
  }

  deleteRoom(){
    this.roomsService.delete('1').subscribe((data)=>{
      this.roomList=data
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
