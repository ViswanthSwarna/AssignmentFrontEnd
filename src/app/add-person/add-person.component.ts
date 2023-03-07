import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/app.environment';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
})
export class AddPersonComponent implements OnInit {
  myForm!: FormGroup;
  updateId: number = 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.updateId = this.route.snapshot.params['id'];
    this.myForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      city: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phoneNumber: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      homeAddress: this.fb.control('', Validators.required),
    });
    if (this.updateId != 0) {
      this.http
        .get(environment.urlToGetPersonById + this.updateId)
        .subscribe({
          next: (x) => this.onGetSuccess(x),
          error: (x) => this.onError(x),
        });
    }
  }
  
  get firstName() {
    return this.myForm.get('firstName');
  }
  get lastName() {
    return this.myForm.get('lastName');
  }
  get city() {
    return this.myForm.get('city');
  }
  get email() {
    return this.myForm.get('email');
  }
  get phoneNumber() {
    return this.myForm.get('phoneNumber');
  }
  get homeAddress() {
    return this.myForm.get('homeAddress');
  }

  onSubmit(form: FormGroup) {
    var personApiBody: any = {};
    personApiBody.firstName = form.value.firstName;
    personApiBody.lastName = form.value.lastName;
    personApiBody.city = form.value.city;
    personApiBody.homeAddress = form.value.homeAddress;
    personApiBody.phoneNumber = form.value.phoneNumber;
    personApiBody.email = form.value.email;
    if (this.updateId == 0) {
      this.http
        .post(environment.apiUrl, personApiBody)
        .subscribe({
          next: (x) => this.onSuccess(x),
          error: (x) => this.onError(x),
        });
    } else {
      personApiBody.id = this.updateId;
      this.http
        .put(environment.apiUrl, personApiBody)
        .subscribe({
          next: (x) => this.onSuccess(x),
          error: (x) => this.onError(x),
        });
    }
  }

  onGetSuccess(person: any) {
    this.myForm.setValue({
      firstName: person.firstName,
      lastName: person.lastName,
      city: person.city,
      email: person.email,
      phoneNumber: person.phoneNumber,
      homeAddress: person.homeAddress,
    });
  }


  onSuccess(res: Object) {
    this.router.navigate(['']);
  }
  onError(res: Object) {
    this.router.navigate(['/error']);
  }
}
