import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { fileURLToPath } from 'url';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';
  role = 'Admin';

  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorge: Storage,
    private initServcice: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(initServcice.config);
  }

  ngOnInit(): void {
    // this.router.events.subscribe((event) =>{
    //   console.log(event);
    // })

    this.router.events.pipe(
      filter((event)=> event instanceof NavigationStart)
    ).subscribe((event)=>{
      console.log('Naviigation Started');
      
    });
    this.router.events.pipe(
      filter((event)=> event instanceof NavigationEnd)
    ).subscribe((event)=>{
      console.log('Naviigation Completed');
      
    });

    //this.name.nativeElement.innerText = 'Hilton Hotel';
    this.loggerService?.log('AppComponent.ngOnInit()');
    this.localStorge.setItem('name', 'Hilton Hotel');
  }

  // @ViewChild('user', { read: ViewContainerRef }) vcr !: ViewContainerRef;

  ngAfterViewInit(): void {
    //   const componentRef = this.vcr.createComponent(RoomsComponent);
    //   componentRef.instance.numberOfRooms= 50;
    this.name.nativeElement.innerText = 'Hilton Hotel';

  }
}
