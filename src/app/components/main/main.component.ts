import { Component, OnInit, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { Todo } from '../../interfaces'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements
  OnInit,
  OnChanges,
  DoCheck 
{

  arrayId = []
  todos: Todo[] = []
  catName = this.todoService.catName
  
  quantity: number

  constructor(
    private todoService: TodoServiceService
  ) {console.log('Constructor') }

  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnChanges', changes)
  }

  ngOnInit(): void {
    
    this.todoService.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.todoService.catName)
    console.log('ngOnInit')
  }

  ngDoCheck(){

  }

  inpSelect(event){
    this.todoService.catName = event.target.value
    this.todoService.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.todoService.catName)
  }

  fetchTodosByCategory(catName: string) {
    
    this.todoService.getAllByCategory(catName)
      .subscribe(result => {
        this.quantity = result.length
        this.todos = result
      })
  }

  fetchAllTodos(){
    this.todoService.getAll()
      .subscribe(result => {
        this.quantity = result.length
        this.todos = result
      })
  }

  removeTodo(id: string): void{
    this.todoService.delete(id)
      .subscribe(() => {
        this.todoService.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.todoService.catName)
      }) 
    
  }


}