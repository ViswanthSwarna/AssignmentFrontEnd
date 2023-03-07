import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from 'src/models/person.model';
import { environment } from '../app.environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient : HttpClient) { }

  public getAllPersons(){
    return this.httpClient.get(environment.apiUrl);
 }
 public createPerson(person:Person){
     return this.httpClient.post(environment.apiUrl, person);
 }
 public deletePerson(id:number){
     return this.httpClient.delete(environment.apiUrl, {params:{id}});
 }
 public getPersonById( id:any){
   return this.httpClient.get(environment.urlToGetPersonById + id);
}

public updatePerson(person:any){
 return this.httpClient.put(environment.apiUrl ,person);
}
}
