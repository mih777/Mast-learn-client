import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Todo } from '../interfaces'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  catName: string = 'all'
  currentId: string 
  //url = 'https://mast-learn-server.herokuapp.com'
  url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.url}/api/todos/create`, todo)
  }

  // getAll(): Observable<Todo[]> {
  //   return this.http.get<Todo[]>(`${this.url}/api/todos`)
  // }

  get_all_noparams():Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.url}/api/todos`)
  }

  get_all(pagination, page):Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.url}/api/todos?pagination=${pagination}&page=${page}`)
  }

  // get all by category
  getAllByCategory(cat: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}/api/todos/cat/${cat}`)
  }

  getById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.url}/api/todos/${id}`)
      .pipe(map((todo: Todo) => {
          return {
            ...todo, id
          }
      }))
  }
  //
  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.url}/api/todos/update/${todo.id}`, todo)
  }

  completeTodo(id: string): Observable<Todo> {
    return this.http.put<Todo>(`${this.url}/api/todos/update/complete/${id}`, {
      completed: true
    })
  }

  expireTodo(id: string): Observable<Todo> {
    return this.http.put<Todo>(`${this.url}/api/todos/update/expire/${id}`, {
      expired: true
    })
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/api/todos/delete/${id}`)
  }
}