import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs';
import { Comments } from './comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comments$ = this.commentService.getComments();

  comment$ =this.activateRoute.data.pipe(
    pluck('comments')
  );
  comments :Comments[] =[]

  constructor(private commentService:CommentService,
    private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.data.subscribe((data)=>{
      console.log(data['comments']);
      this.comments=data['comments'];
    })
  }

}
