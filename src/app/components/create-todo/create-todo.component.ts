import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { TodoServiceService } from 'src/app/services/todo-service.service';
import { Todo } from 'src/app/interfaces';


@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  form: FormGroup
  todos: Todo[] = []

  constructor(
    private todoService: TodoServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
      category: new FormControl(''),
      description: new FormControl('')
    })
  }

  createTodo() {
    
    const formData = {...this.form.value}

    this.todoService.create({
      title: formData.title,
      category: formData.category,
      description: formData.description
    }).subscribe(todo => {
      this.todos.push(todo)
      this.form.reset()
      this.router.navigate(['/'])

    })
  }

}
