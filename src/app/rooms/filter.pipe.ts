import { Pipe, PipeTransform } from '@angular/core';
import { Room, RoomList } from './rooms';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(room: RoomList[], price:number): RoomList[] {
    return room.filter((room)=> room.price > price);
  }

}
