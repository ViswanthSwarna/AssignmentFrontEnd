import { Component, OnInit } from '@angular/core';
import { Person } from 'src/models/person.model';
import { Router } from '@angular/router';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html'
})
export class PeopleListComponent implements OnInit {
  peopleList: any = new Array<Person>();

  constructor(private personService: PersonService, private router: Router) {}

  ngOnInit(): void {
    this.personService.getAllPersons()
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
      this.personService.deletePerson(id)
        .subscribe({ next: (x) => this.onSuccessDelete(x) , error:(x)=>this.onError(x)});
    }
  }
}
