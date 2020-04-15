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

  constructor(private http: HttpClient) { }

  create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('https://mast-learn-server.herokuapp.com/api/todos/create', todo)
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://mast-learn-server.herokuapp.com/api/todos')
  }

  // get all by category
  getAllByCategory(cat: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`https://mast-learn-server.herokuapp.com/api/todos/cat/${cat}`)
  }

  getById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`https://mast-learn-server.herokuapp.com/api/todos/${id}`)
      .pipe(map((todo: Todo) => {
          return {
            ...todo, id
          }
      }))
  }
//
  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`https://mast-learn-server.herokuapp.com/api/todos/update/${todo.id}`, todo)
  }

  completeTodo(id: string): Observable<Todo> {
    return this.http.put<Todo>(`https://mast-learn-server.herokuapp.com/api/todos/update/complete/${id}`, {
      completed: true
    })
  }

  expireTodo(id: string): Observable<Todo> {
    return this.http.put<Todo>(`https://mast-learn-server.herokuapp.com/api/todos/update/expire/${id}`, {
      expired: true
    })
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`https://mast-learn-server.herokuapp.com/api/todos/delete/${id}`)
  }
}