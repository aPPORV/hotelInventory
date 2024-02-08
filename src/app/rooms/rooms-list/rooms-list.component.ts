import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChange, SimpleChanges, OnDestroy } from '@angular/core';
import { Room, RoomList } from '../rooms';


@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() rooms: RoomList[] | null=[];

  @Input() title :string='';

  @Input() price= 0;

  @Output() selectedRoom = new EventEmitter<RoomList>(); 

  constructor() { }
  ngOnChanges(changes:SimpleChanges){
    console.log(changes);
    if(changes['title']){
      this.title = changes['title'].currentValue.toUpperCase();
    }
    

  }

  ngOnInit(): void {
  }

  selectRoom(room:RoomList){
    this.selectedRoom.emit(room);
  }
  ngOnDestroy(): void {
    console.log('on destroy is called');
    
  }

  
}
