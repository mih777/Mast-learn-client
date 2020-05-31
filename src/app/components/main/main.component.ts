import { Component, OnInit, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { Todo } from '../../interfaces'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements
  OnInit 
{

  arrayId = []
  todos: Todo[] = []
  catName = this.todoService.catName
  loading: boolean = false
  quantity: number

  
  oSub: Subscription
  oSub2: Subscription
  oSub3: Subscription

  pagination = 3
  page: number = 1
  limit_array = false

  pages = []

  constructor(
    private todoService: TodoServiceService
  ) { }

  

  ngOnInit(): void {

    this.oSub2 = this.todoService.get_all_noparams()
      .subscribe(res => {

        // Создаем массив колличества страниц
        for(let i = 1; i <= Math.ceil(res.length / this.pagination); i++){
          this.pages[i] = i
        }

        this.todoService.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.todoService.catName)
      }) 
  
    
  }

  item_qwantity_on_page(qw){
    this.pagination = qw.target.value
    this.todoService.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.todoService.catName)
  }

  click_number_page(page){
    this.page = page 
    console.log(this.page)
    this.todoService.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.todoService.catName)
  }

  to_begin(){
    this.page = 1 
    console.log(this.page)
    this.todoService.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.todoService.catName)  
  }

  // to_end(){
  //   this.oSub3 = this.todoService.get_all_noparams()
  //     .subscribe(res => {
  //       this.page = Math.ceil(res.length/this.pagination)
  //       this.todoService.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.todoService.catName)
  //     })
  // }

  decrise(){
    
    if(this.page === 1){
      return
    } else{
      this.limit_array = false
      this.page -=1
      this.todoService.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.todoService.catName)
    }
    
    
  }

  incrise(){
    
    if(this.page === 0 || this.limit_array){
      return
    }else{
      this.page +=1
      this.todoService.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.todoService.catName)
    }
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
    this.loading = true
    this.oSub = this.todoService.get_all(this.pagination, this.page)
      .subscribe(res => {
        
        if(res.length === 0){
          this.limit_array = true
          return
        } else{
          this.quantity = res.length
          this.todos = res
          this.loading = false
        }
        
      })
  }

  removeTodo(id: string): void{
    this.todoService.delete(id)
      .subscribe(() => {
        this.todoService.catName == 'all' ? this.fetchAllTodos() : this.fetchTodosByCategory(this.todoService.catName)
      }) 
    
  }


}