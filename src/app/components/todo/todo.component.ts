import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  
  post: any = {}

  currentId: string

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.todoService.getById(params.id)
        .subscribe((post) => {
          this.post = post
          this.todoService.currentId = params.id
          this.currentId = this.todoService.currentId
        })
    })
  }

}
