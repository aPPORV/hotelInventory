import { Inject, Injectable } from '@angular/core';
import { Room, RoomList } from '../rooms';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { HttpClient, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  roomList: RoomList[] = [
    // {
    //   roomNumber: 101,
    //   roomType: 'Standard Double',
    //   amenities: 'Wi-Fi, Television, Air Conditioning',
    //   price: 120,
    //   photos: 'https://example.com/photo1.jpg, https://example.com/photo2.jpg',
    //   checkinTime: new Date('2024-11-11T14:00:00Z'),
    //   checkoutTime: new Date('2024-11-12T12:00:00Z'),
    //   rating: 4.2
    // },
    // {
    //   roomNumber: 102,
    //   roomType: 'Deluxe Suite',
    //   amenities: 'Wi-Fi, Television, Air Conditioning, Mini Bar',
    //   price: 250,
    //   photos: 'https://example.com/photo3.jpg, https://example.com/photo4.jpg',
    //   checkinTime: new Date('2024-11-11T14:00:00Z'),
    //   checkoutTime: new Date('2024-11-12T12:00:00Z'),
    //   rating: 4.8
    // },
    // {
    //   roomNumber: 103,
    //   roomType: 'Family Suite',
    //   amenities: 'Wi-Fi, Television, Air Conditioning, Kitchenette',
    //   price: 350,
    //   photos: 'https://example.com/photo5.jpg, https://example.com/photo6.jpg',
    //   checkinTime: new Date('2024-11-11T14:00:00Z'),
    //   checkoutTime: new Date('2024-11-12T12:00:00Z'),
    //   rating: 4.5
    // }
  ];

  constructor(@Inject(APP_SERVICE_CONFIG) private config:AppConfig, private http:HttpClient) {

    console.log('Room Service Initialized...');
    // console.log(environment.apiEndpoint);
    console.log(this.config.apiEndpoint);
    
    
   }
  //  header =new HttpHeaders({'token':'12345'})
   getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
    shareReplay(1)
   )
   

  getRooms() {
    // return this.roomList;
    
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRooms(room:RoomList){
    return this.http.post<RoomList[]>('/api/rooms',room);
  }
  
  editRooms(room: RoomList){
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`,room);
  }

  delete(id:string){
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos(){
    const request= new HttpRequest('GET',`https://jsonplaceholder.typicode.com/photos`, {
      reportProgress:true,
    });
    return this.http.request(request);
  }

}
