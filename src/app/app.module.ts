import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { RouterModule } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { ApiKeyInterceptor } from 'src/Interceptor/api-key.interceptor';
import { ErrorComponent } from './error/error.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent, AddPersonComponent, PeopleListComponent, ErrorComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {}
