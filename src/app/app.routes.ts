import {Routes } from "@angular/router";
import { AddPersonComponent } from "./add-person/add-person.component";
import { ErrorComponent } from "./error/error.component";
import { PeopleListComponent } from "./people-list/people-list.component";

export const routes:Routes = [
    { path: 'addoredit/:id', component: AddPersonComponent },
    { path: '', component: PeopleListComponent },
    { path: 'error', component: ErrorComponent },
  ];