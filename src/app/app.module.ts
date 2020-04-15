import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { UpdateTodoComponent } from './components/update-todo/update-todo.component';
import { MainComponent } from './components/main/main.component';
import { TodoComponent } from './components/todo/todo.component';
import { LoaderComponent } from './shared/component/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTodoComponent,
    UpdateTodoComponent,
    MainComponent,
    TodoComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
