import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/models/person.model';
import { environment } from 'src/app/app.environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html'
})
export class PeopleListComponent implements OnInit {
  peopleList: any = new Array<Person>();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http
      .get(environment.apiUrl)
      .subscribe({ next: (x) => this.onSuccessGetList(x) , error:(x)=>this.onError(x)});
  }

  onSuccessGetList(res: Object) {
    this.peopleList = res;
  }

  onSuccessDelete(res: Object) {
    this.ngOnInit();
  }

  onError(res:Object)
  {
    this.router.navigate(['/error']);
  }

  delete(id: number) {
    let response = confirm('Are you sure you want to delete?');
    if (response) {
      let httpParams = new HttpParams().set('id', id);
      let options = { params: httpParams };
      this.http
        .delete(environment.apiUrl, options)
        .subscribe({ next: (x) => this.onSuccessDelete(x) , error:(x)=>this.onError(x)});
    }
  }
}
